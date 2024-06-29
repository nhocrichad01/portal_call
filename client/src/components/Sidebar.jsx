import React from "react";
import CallReport from "./CallReport";

const sharedClasses = {
  flex: "flex",
  itemsCenter: "items-center",
  textZinc: "text-zinc-800 dark:text-zinc-200",
  hoverTextBlue: "hover:text-blue-500",
  bgWhite: "bg-white dark:bg-zinc-800",
  bgZinc: "bg-zinc-100 dark:bg-zinc-900",
  p4: "p-4",
  spaceY4: "space-y-4",
  wFull: "w-full",
  border: "border border-zinc-300",
  rounded: "rounded",
  darkBgZinc700: "dark:bg-zinc-700",
  darkBorderZinc600: "dark:border-zinc-600",
  gridCols3: "grid grid-cols-3",
  justifyBetween: "justify-between",
  shadow: "shadow",
  grid: "grid",
  gap4: "gap-4",
  textLeft: "text-left",
  bgZinc200: "bg-zinc-200 dark:bg-zinc-700",
  p2: "p-2",
  borderB: "border-b border-zinc-300 dark:border-zinc-600",
  bgGreen500: "bg-green-500",
  bgBlue500: "bg-blue-500",
  textWhite: "text-white",
  px4: "px-4",
  py2: "py-2",
  rounded: "rounded",
};

const Sidebar = () => {
  return (
    <div className={`${sharedClasses.flex} h-screen`}>
      <SidebarContent />
      <MainContent />
    </div>
  );
};

const SidebarContent = () => {
  return (
    <div className={`w-1/6 ${sharedClasses.bgWhite} ${sharedClasses.p4}`}>
      <div
        className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} mb-6`}
      >
        <img
          src="https://placehold.co/40x40"
          alt="Logo"
          className="rounded-full mr-2"
        />
        <span className={`${sharedClasses.textZinc} text-lg font-semibold`}>
          Logo
        </span>
      </div>
      <nav className={sharedClasses.spaceY4}>
        <SidebarLink iconUrl="https://placehold.co/20x20" text="Quản Lý" />
        <SidebarLink iconUrl="https://placehold.co/20x20" text="Cấu Hình" />
        <SidebarLink iconUrl="https://placehold.co/20x20" text="Báo Cáo" />
        {/* <SidebarLink
          iconUrl="https://placehold.co/20x20"
          text="Báo Cáo Chi Tiết"
        />
        <SidebarLink
          iconUrl="https://placehold.co/20x20"
          text="Thống Kê Theo Extension"
        />
        <SidebarLink
          iconUrl="https://placehold.co/20x20"
          text="Thống Kê Theo Extension (Đồ Thị)"
        />
        <SidebarLink iconUrl="https://placehold.co/20x20" text="Ghi Âm" />
        <SidebarLink
          iconUrl="https://placehold.co/20x20"
          text="Báo Cáo Cước Phí"
        /> */}
      </nav>
    </div>
  );
};

const SidebarLink = ({ iconUrl, text }) => {
  return (
    <a
      href="#"
      className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.textZinc} ${sharedClasses.hoverTextBlue}`}
    >
      <img src={iconUrl} alt="Icon" className="mr-2" />
      <span>{text}</span>
    </a>
  );
};

const MainContent = () => {
  return (
    <div className={`w-5/6 ${sharedClasses.bgZinc} ${sharedClasses.p6}`}>
      <CallReport />
    </div>
  );
};

export default Sidebar;
