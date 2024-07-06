import React from "react";
import Notch from "./MobileTopBar/Notch";
import MyMenu from "../../pages/layout/MobileTopBar/MyMenu";
import Notification from "../../common/Notification";

export default function MobileTopBar({ links, isBlur, switchBlur }) {
  return (
    <div className="flex justify-between w-full px-4 pt-5">
      <div className="relative">
        <MyMenu links={links} switchBlur={switchBlur} />
      </div>
      <div className={`flex flex-1 ${!isBlur ? "blur" : ""}`}>
        <Notch />
        <Notification />
      </div>
    </div>
  );
}
