import React from "react";
import { useUserState } from "../../../Providers/UserProvider";
import { Link } from "react-router-dom";
import Notch from "./MobileTopBar/Notch";
import MyMenu from "../../pages/layout/MobileTopBar/MyMenu";
import { useLocation } from "react-router-dom";

export default function MobileTopBar({ isBlur, switchBlur }) {
  const user = useUserState();
  const { pathname: currentRoute } = useLocation();

  const imgClassName =
    currentRoute === "/profile"
      ? "w-10 h-10 rounded-full border-2 border-blue"
      : "w-10 h-10 rounded-full";

  return (
    <div className="flex justify-between w-full px-4 pt-5">
      <div className="relative">
        <MyMenu switchBlur={switchBlur} />
      </div>
      <div className={`flex flex-1 ${!isBlur ? "blur" : ""}`}>
        <Notch />
        <Link to="/profile" className="pb-5">
          <img
            className={imgClassName}
            src={
              user && user.avatar
                ? user.avatar
                : require("../../../Images/pages/layout/Profile/no-profile.png")
            }
            style={{ objectFit: "cover" }}
            alt="avatar"
          />
        </Link>
      </div>
    </div>
  );
}
