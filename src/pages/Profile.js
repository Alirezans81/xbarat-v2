import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import EditProfile from "../components/pages/layout/Profile/EditProfile";
import LastTickets from "../components/pages/layout/Profile/LastTickets";
import { useLanguageState } from "../Providers/LanguageProvider";
import cardsDark from "../Images/pages/layout/Profile/cardsDark.png";
import cardsLight from "../Images/pages/layout/Profile/cardsLight.png";

export default function Profile() {
  const navigate = useNavigate();
  const lang = useLanguageState();
  const theme = useThemeState();

  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();
  function handleCards() {
    navigate("cards");
  }

  return (
    <div className="grid grid-cols-12 grid-rows-2 gap-x-10 gap-y-7 h-full w-full">
      <div className={`col-span-5 row-span-2 bg-${theme} rounded-3xl`}>
        <EditProfile />
      </div>
      <div
        className={`col-span-7 row-span-1 bg-${theme} rounded-${oneDirection}-3xl text-white flex justify-center items-center`}
      >
        <div className="grid grid-cols-4 grid-rows-4 gap-4 w-5/6 h-2/3">
          <button
            onClick={handleCards}
            className={`flex items-center justify-center bg-${theme}-back w-16 h-16 rounded-lg`}
            style={{ gridRow: 1, gridColumn: 1 }}
          >
            <img
              className="w-1/2 h-1/2"
              src={theme === "light" ? cardsDark : cardsLight}
              alt=""
            />
          </button>
          <span
            className={`flex justify-start ml-3 mt-4 text-${oppositeTheme}`}
            style={{ gridRow: 2, gridColumn: 1 }}
          >
            {lang["cards-profile"]}
          </span>
        </div>
      </div>
      <div
        className={`col-span-7 row-span-1 bg-${theme} rounded-${oneDirection}-3xl`}
      >
        <LastTickets />
      </div>
    </div>
  );
}
