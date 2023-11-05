import React from "react";
import { useUserState } from "../../../../Providers/UserProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { Link, useLocation } from "react-router-dom";
import { useModalDataSetState } from "../../../../Providers/ModalDataProvider";
import CompleteProfileModal from "../../../modals/CompleteProfileModal";

export default function RightSide() {
  const user = useUserState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: direction, endComplete: endDirection } = useDirectionState();
  const lang = useLanguageState();
  const setModalData = useModalDataSetState();
  const openCompleteProfileModal = () => {
    setModalData({
      title: "",
      children: <CompleteProfileModal />,
      canClose: false,
      isOpen: true,
    });
  };
  const { pathname: currentRoute } = useLocation();
  const backgroundClass =
    currentRoute === "/profile" ? "bg-blue" : `bg-${theme}-back`;
  const nameClass =
    currentRoute === "/profile" ? "text-light" : `text-${oppositeTheme}`;
  const roleClass = currentRoute === "/profile" ? "text-dark" : "text-gray";
  const completePrfoileClass =
    currentRoute === "/profile" ? "p-0" : "px-3 pt-1.5 pb-0";
  const completePrfoileTextClass =
    currentRoute === "/profile" ? "text-dark" : `text-${theme}`;

  return (
    <div
      className={`flex items-center transition-all duration-200 rounded-${direction}-full p${direction}-3 py-3 ${backgroundClass}`}
    >
      <img
        className="w-12 h-12 rounded-full"
        src={
          user && user.avatar
            ? user.avatar
            : require("../../../../Images/pages/layout/Profile/no-profile.png")
        }
        style={{ objectFit: "cover" }}
        alt="avatar"
      />
      <div className={`flex flex-col m${direction}-3`}>
        <span className={`${nameClass} font-mine-regular -mb-2 text-lg`}>
          {(user && user["first_name"] ? user["first_name"] : "") +
            " " +
            (user && user["last_name"] ? user["last_name"] : "")}
        </span>
        {user && user["is_active"] ? (
          <span className={`${roleClass} font-mine-regular text-sm`}>
            {user.role}
          </span>
        ) : (
          <Link to="/profile" onClick={openCompleteProfileModal}>
            <div
              className={`bg-blue rounded-full ${completePrfoileClass} mt-1 flex flex-col justify-center transition-all duration-300 hover:bg-${theme} border-2 border-blue`}
            >
              <span
                className={`text-xs font-mine-bold ${completePrfoileTextClass}`}
              >
                {lang["complete-profile"]}
              </span>
            </div>
          </Link>
        )}
      </div>
      <Link to="/profile">
        <img
          className="w-5 h-5 mx-4"
          src={require(`../../../../Images/arrow-${endDirection}-${oppositeTheme}.png`)}
          alt="arrow-right"
        />
      </Link>
    </div>
  );
}
