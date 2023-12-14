import React from "react";
import { useUserState } from "../../../Providers/UserProvider";
import { Link } from "react-router-dom";
import Notch from "./MobileTopBar/Notch";
import MyMenu from "../../common/MyMenu";

export default function MobileTopBar() {
  const user = useUserState();

  return (
    <div className="flex justify-between w-full px-4 pt-5">
      <div className="relative">
        <MyMenu />
      </div>
      <Notch />
      <Link to="/profile" className="pb-5">
        <img
          className="w-10 h-10 rounded-full"
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
  );
}
