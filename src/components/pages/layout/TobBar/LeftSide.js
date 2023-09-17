import React from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import {
  useIsPagesModalOpenState,
  useTogglePagesModal,
} from "../../../../Providers/IsPagesModalOpenProvider";
import { useUserState } from "../../../../Providers/UserProvider";

export default function LeftSide() {
  const lang = useLanguageState();
  const { one: direction } = useDirectionState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const userInfo = useUserState();

  const modalIsOpen = useIsPagesModalOpenState();
  const rotate = modalIsOpen ? "rotate-180" : "";
  const togglePagesModalOpen = useTogglePagesModal();

  return (
    <div dir="ltr" className="flex">
      <img
        className="h-16 w-h-16"
        src={require("../../../../Images/pages/layout/logo.png")}
        alt="logo"
      />
      <div className={`flex flex-col justify-center ml-2 pt-1.5`}>
        <div className="flex justify-start items-start">
          <h1
            className={`text-${oppositeTheme} font-mine-bold text-5xl text-blue -mb-3`}
          >
            {lang["logo-header"]}
          </h1>
          {userInfo.isAdmin && (
            <button
              onClick={togglePagesModalOpen}
              className={`m${direction}-1 flex`}
            >
              <img
                className="w-5 h-5"
                src={require(`../../../../Images/pages/layout/gear-${oppositeTheme}.png`)}
              />
              <img
                className={`w-5 h-5 transition-all duration-300 ${rotate}`}
                src={require(`../../../../Images/arrow2-down-${oppositeTheme}.png`)}
              />
            </button>
          )}
        </div>
        <h5 className={`text-${oppositeTheme} font-mine-thin text-base`}>
          {lang["slogan"] + "."}
        </h5>
      </div>
    </div>
  );
}
