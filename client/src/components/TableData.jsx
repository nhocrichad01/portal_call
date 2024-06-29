import React, { useEffect, useState } from "react";
import axios from "axios";
import { max } from "date-fns";

const TableCell = ({ children, style }) => (
  <td
    className={`px-2 py-2 text-center items-center border border-gray-300 ${style}`}
  >
    {children}
  </td>
);

const TableRow = ({ data }) => {
  const calculateTotalTime = (data) => {
    try {
      let total = {
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };

      if (data.talking_dur) {
        if (data.talking_dur.minutes && data.ringing_dur.minutes) {
          total.minutes = data.talking_dur.minutes + data.ringing_dur.minutes;
        } else {
          if (!data.talking_dur.minutes && data.ringing_dur.minutes) {
            total.minutes = data.ringing_dur.minutes;
          } else {
            if (data.talking_dur.minutes && !data.ringing_dur.minutes) {
              total.minutes = data.talking_dur.minutes;
            }
          }
        }
        if (data.talking_dur.seconds && data.ringing_dur.seconds) {
          total.seconds = data.talking_dur.seconds + data.ringing_dur.seconds;
          // total.milliseconds = data.talking_dur.milliseconds + data.ringing_dur.milliseconds
        } else {
          if (!data.talking_dur.seconds && data.ringing_dur.seconds) {
            total.seconds = data.ringing_dur.seconds;
          } else {
            if (data.talking_dur.seconds && !data.ringing_dur.seconds) {
              total.seconds = data.talking_dur.seconds;
            }
          }
        }
        total.milliseconds =
          data.talking_dur.milliseconds + data.ringing_dur.milliseconds;
        if (total.milliseconds > 1000) {
          total.seconds += Math.floor(total.milliseconds / 1000);
          total.milliseconds = total.milliseconds % 1000;
        }
      } else {
        if (data.ringing_dur.seconds) {
          total.seconds = data.ringing_dur.seconds;
          total.milliseconds = data.ringing_dur.milliseconds;
        } else {
          total.milliseconds = data.ringing_dur.milliseconds;
        }
        if (data.ringing_dur.minutes) {
          total.minutes = data.ringing_dur.minutes;
        }
      }

      let stringTime = "";
      if (total.minutes > 0) {
        if (total.minutes > 9) {
          stringTime += total.minutes + ":";
        } else {
          stringTime += "0" + total.minutes + ":";
        }
      } else {
        stringTime += "00:";
      }
      if (total.seconds > 0) {
        if (total.seconds > 9) {
          stringTime += total.seconds + ":";
        } else {
          stringTime += "0" + total.seconds + ":";
        }
      } else {
        stringTime += "00:";
      }
      if (total.milliseconds) {
        if (Math.floor(total.milliseconds || 0) / 10 > 9) {
          stringTime += Math.floor(total.milliseconds / 10 || 0);
        } else {
          stringTime += "0" + Math.floor(total.milliseconds / 10 || 0);
        }
      }

      return stringTime;
    } catch (error) {}
  };

  function formatISODateTime(isoTime) {
    // Chuyển đổi chuỗi thời gian sang đối tượng Date
    try {
      const date = new Date(isoTime);

      // Lấy các thành phần ngày và giờ
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");

      // Định dạng lại ngày và giờ theo định dạng mong muốn
      return (
        <span className="">
          {`${year}-${month}-${day}`}
          <br />
          {`${hours}:${minutes}:${seconds}`}
        </span>
      );
    } catch (error) {}
  }

  function time_String(data) {
    try {
      if (data === null || data === undefined) {
        return <span></span>;
      }
      let seconds = "";
      if (data.seconds) {
        if (data.seconds > 9) {
          seconds = data.seconds;
        } else {
          seconds = "0" + data.seconds;
        }
      } else {
        seconds = "00";
      }
      let milliseconds = "";
      if (data.milliseconds) {
        if (Math.floor(data.milliseconds || 0) / 10 > 9) {
          milliseconds = Math.floor(data.milliseconds / 10 || 0);
        } else {
          milliseconds = "0" + Math.floor(data.milliseconds / 10 || 0);
        }
      } else {
        milliseconds = "00";
      }

      if (data.minutes) {
        let minutes;
        if (data.minutes > 9) {
          minutes = data.minutes;
        } else {
          minutes = "0" + data.minutes;
        }
        return (
          <span>
            {minutes}:{seconds}:{milliseconds}
          </span>
        );
      }
      return (
        <span>
          00:{seconds}:{milliseconds}
        </span>
      );
    } catch (error) {}
  }

  const handleEndCall = (data) => {
    if (data.max_action_id && data.is_answered) {
      if (data.max_action_id !== 5 && data.max_action_id !== 6) {
        return "Failed";
      } else {
        if (data.max_action_id === 5) {
          return "Terminated by " + data.src_display_name;
        } else {
          if (data.max_action_id === 6) {
            return "Terminated by " + data.did_name;
          }
        }
      }
    }
    return "Failed";
  };

  return (
    <tr className="border-t">
      <TableCell>
        <input type="checkbox" className="form-checkbox" />
      </TableCell>
      <TableCell>{data.call_id}</TableCell>
      <TableCell style={`min-w-28`}>
        {formatISODateTime(data.start_time)}
      </TableCell>
      {!data.is_inbound ? (
        <TableCell>Gọi ra</TableCell>
      ) : (
        <TableCell>Gọi vào</TableCell>
      )}

      <TableCell>{data.src_display_name}</TableCell>
      <TableCell>{data.src_caller_number.replace("Ext.", "").trim()}</TableCell>
      <TableCell>{data.did_name}</TableCell>
      {!data.is_answered ? (
        <TableCell>Không trả lời</TableCell>
      ) : (
        <TableCell>Trả lời</TableCell>
      )}

      <TableCell>{time_String(data.ringing_dur)}</TableCell>
      <TableCell>{time_String(data.talking_dur)}</TableCell>

      <TableCell>
        <span>{calculateTotalTime(data)}</span>
      </TableCell>

      <TableCell>{handleEndCall(data)}</TableCell>
    </tr>
  );
};

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto h-full">
      <table className="min-w-full bg-white dark:bg-zinc-800">
        <thead className="bg-gray-200 dark:bg-zinc-700 sticky -top-1">
          <tr className="">
            <TableCell className="sticky top-0 z-10">
              <input type="checkbox" className="form-checkbox" />
            </TableCell>
            <TableCell>Mã cuộc gọi</TableCell>
            <TableCell>Thời gian</TableCell>
            <TableCell>Chiều gọi</TableCell>
            <TableCell>Người gọi</TableCell>
            <TableCell>Số gọi ra</TableCell>
            <TableCell>Người nhận</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Đổ chuông</TableCell>
            <TableCell>Đàm thoại</TableCell>
            <TableCell>Tổng thời gian</TableCell>
            <TableCell>Ngắt máy</TableCell>
          </tr>
        </thead>
        <tbody>
          {data?.map((data) => (
            <TableRow key={data.id} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableData = ({ filter }) => {
  const [originalData, setOriginalData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log(filter);
    handleFilter();
  }, [filter]);

  const handleFilter = () => {
    console.log(filter);
    try {
      if (Object.keys(filter).length !== 0) {
        const filteredData = originalData?.filter((call) => {
          const fromDate = new Date(filter.fromDate);
          const toDate = new Date(filter.toDate);
          const startDate = new Date(call.start_time);
          // console.log(fromDate + "/// /n" + toDate + "//// /n" + startDate);
          // Check date range
          if (filter.callCode && call.call_id !== Number(filter.callCode)) {
            return false;
          }

          if (startDate < fromDate || startDate > toDate) {
            return false;
          }

          // Check other filters
          if (filter.caller && !call.display_name?.includes(filter.caller)) {
            return false;
          }

          if (filter.receiver && !call?.did_number?.includes(filter.receiver)) {
            return false;
          }

          if (
            filter.callDirection !== "Tất cả" &&
            filter.callDirection !== String(call.is_inbound)
          ) {
            return false;
          }

          if (
            filter.status !== "Tất cả" &&
            filter.status !== String(call.is_answered)
          ) {
            return false;
          }

          // You can add more conditions based on other filter fields

          return true;
        });

        setDataTable(filteredData);
      } else {
        setDataTable(originalData);
      }
    } catch (error) {}
  };
  useEffect(() => {
    axios
      .get("/callList")
      .then(async (res) => {
        await setDataTable(res.data);
        await setOriginalData(res.data);
      })
      .catch(() => {
        alert("lay du lieu that bai");
      });
  }, []);

  useEffect(() => {
    if (dataTable.length > 0) {
      setLoading(true);
    }
  }, [dataTable]);
  //   console.log(dataTable);

  return <>{loading && <Table data={dataTable} />}</>;
};

export default TableData;
