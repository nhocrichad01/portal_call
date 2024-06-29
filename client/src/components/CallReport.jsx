import React, { useState } from "react";
import TableData from "./TableData";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

const inputClasses2 = "w-full mt-1 p-2 border rounded-md";
const labelClasses = "block text-zinc-700 dark:text-zinc-300";

const CallReport = () => {
  const now = new Date();
  const defaultFilterValues = {
    fromDate: format(now, "yyyy-MM-dd'T'HH:mm"),
    toDate: format(now, "yyyy-MM-dd'T'HH:mm"),
    caller: "",
    receiver: "",
    callDirection: "Tất cả",
    status: "Tất cả",
    ringTimeFrom: "",
    ringTimeTo: "",
    talkTimeFrom: "",
    talkTimeTo: "",
    groupName: "Chọn nhóm",
    extension: "Chọn extension",
    callCode: "",
  };
  const [filter, setFilter] = useState({});
  const {
    reset,
    handleSubmit,
    register,
    formState: {}, // Corrected from fromState to formState
  } = useForm({
    defaultValues: defaultFilterValues,
  });
  const handleSearchSubmit = (data) => {
    // e.preventDefault();
    // console.log(data);
    setFilter(data);
  };
  const handleReset = () => {
    reset(defaultFilterValues);
    setFilter({});
  };
  return (
    <div className="p-4 flex flex-col h-screen">
      <h2 className="text-xl font-bold mb-4">Báo Cáo Cuộc Gọi</h2>
      <form
        onSubmit={handleSubmit(handleSearchSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
      >
        <div>
          <label className={labelClasses}>Từ ngày</label>
          <input
            type="datetime-local"
            className={inputClasses2}
            // defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
            {...register("fromDate")}
          />
        </div>
        <div>
          <label className={labelClasses}>Đến ngày</label>
          <input
            type="datetime-local"
            className={inputClasses2}
            // defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
            {...register("toDate")}
          />
        </div>
        <div>
          <label className={labelClasses}>Người gọi</label>
          <input
            type="text"
            className={inputClasses2}
            placeholder="Nhập người gọi"
            {...register("caller")}
          />
        </div>
        <div>
          <label className={labelClasses}>Người nhận</label>
          <input
            type="text"
            className={inputClasses2}
            placeholder="Nhập người nhận"
            {...register("receiver")}
          />
        </div>
        <div>
          <label className={labelClasses}>Trạng thái</label>
          <select className={inputClasses2} {...register("status")}>
            <option>Tất cả</option>
            <option value={true}>Trả lời</option>
            <option value={false}>Không trả lời</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Chiều gọi</label>
          <select className={inputClasses2} {...register("callDirection")}>
            <option>Tất cả</option>
            <option value={false}>Gọi ra</option>
            <option value={true}>Gọi vào</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Thời gian đổ chuông</label>
          <div className="flex space-x-2">
            <input
              type="text"
              className={inputClasses2}
              placeholder="Từ"
              {...register("ringTimeFrom")}
            />
            <input
              type="text"
              className={inputClasses2}
              placeholder="Đến"
              {...register("ringTimeTo")}
            />
          </div>
        </div>
        <div>
          <label className={labelClasses}>Thời gian đàm thoại</label>
          <div className="flex space-x-2">
            <input
              type="text"
              className={inputClasses2}
              placeholder="Từ"
              {...register("talkTimeFrom")}
            />
            <input
              type="text"
              className={inputClasses2}
              placeholder="Đến"
              {...register("talkTimeTo")}
            />
          </div>
        </div>
        <div>
          <label className={labelClasses}>Tên nhóm</label>
          <select className={inputClasses2} {...register("groupName")}>
            <option>Chọn nhóm</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Extension</label>
          <select className={inputClasses2} {...register("extension")}>
            <option>Chọn extension</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Mã cuộc gọi</label>
          <input
            type="text"
            className={inputClasses2}
            placeholder="Nhập mã cuộc gọi"
            {...register("callCode")}
          />
        </div>
        <div className="flex items-end gap-5">
          <button
            type="button"
            className="flex items-center bg-teal-500 text-white px-4 py-3 rounded-md"
            onClick={handleReset}
          >
            LÀM MỚI
          </button>
          <button
            type="submit"
            className="flex items-center bg-blue-500 text-white px-4 py-3 rounded-md"
          >
            TÌM KIẾM
          </button>
        </div>
      </form>
      <div className="overflow-x-auto flex-1">
        <TableData filter={filter} />
      </div>
    </div>
  );
};

export default CallReport;
