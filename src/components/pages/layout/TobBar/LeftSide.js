import React from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import {
  useIsPagesModalOpenState,
  useTogglePagesModal,
} from "../../../../Providers/IsPagesModalOpenProvider";
import { useUserState } from "../../../../Providers/UserProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import { Link } from "react-router-dom";

export default function LeftSide() {
  const lang = useLanguageState();
  const font = useFontState();
  console.log(font);
  const { one: direction } = useDirectionState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const userInfo = useUserState();

  const modalIsOpen = useIsPagesModalOpenState();
  const rotate = modalIsOpen ? "rotate-180" : "";
  const togglePagesModalOpen = useTogglePagesModal();

  return (
    <div dir="ltr" className="flex">
      <Link to="/">
        <img
          className="h-16 w-h-16"
          src={require("../../../../Images/pages/layout/logo.png")}
          alt="logo"
        />
      </Link>
      <div className={`flex flex-col justify-center ml-2 pt-1.5`}>
        <div className="flex justify-start items-start">
          <h1
            className={`font-${font}-bold text-5xl text-yellow-gradient pt-1 -mt-1 -mb-3`}
          >
            {lang["logo-header"]}
          </h1>
          {userInfo && userInfo["is_admin"] && (
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
        <h5 className={`text-${oppositeTheme} font-${font}-thin text-base`}>
          {font !== "Fa" ? lang["slogan"] : "⠀"}
        </h5>
      </div>
    </div>
  );
}
