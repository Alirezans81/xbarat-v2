import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeState } from "../Providers/ThemeProvider";
import EditProfile from "../components/pages/layout/Profile/EditProfile";
import LastTickets from "../components/pages/layout/Profile/LastTickets";
import { useLanguageState } from "../Providers/LanguageProvider";
import cardsDark from "../Images/pages/layout/Profile/cardsDark.png";
import cardsLight from "../Images/pages/layout/Profile/cardsLight.png";
import { useFontState } from "../Providers/FontProvider";
import { useGetUserInfo } from "../apis/pages/Profile/hooks";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useUserState } from "../Providers/UserProvider";

export default function Profile() {
  const navigate = useNavigate();
  const lang = useLanguageState();
  const userInfo = useUserState();
  const font = useFontState();
  const theme = useThemeState();
  const setLoading = useIsLoadingSplashScreenSetState();

  const oppositeTheme = theme === "dark" ? "light" : "dark";
  function handleCards() {
    navigate("cards");
  }

  const { getUserInfo, isLoading: getUserInfoIsLoading } = useGetUserInfo();
  useEffect(() => setLoading(getUserInfoIsLoading), [getUserInfoIsLoading]);

  useEffect(() => {
    userInfo && userInfo.username && !userInfo.is_verified && getUserInfo();
  }, []);

  return (
    <div className="absolute w-full h-full overflow-y-auto pl-8 pr-8 md:pl-0 md:pr-6">
      <div className="md:mt-0 grid grid-cols-12 grid-rows-2 md:gap-x-10 gap-y-7 pb-16">
        <div
          className={`col-span-12 md:col-span-5 row-span-2 bg-${theme} rounded-3xl`}
        >
          <EditProfile />
        </div>
        <div
          className={`col-span-12 md:col-span-7 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none text-white flex p-10`}
        >
          <div className="flex flex-col items-center">
            <button
              onClick={handleCards}
              className={`flex items-center justify-center bg-${theme}-back w-16 h-16 rounded-lg`}
            >
              <img
                className="w-8 h-8"
                src={theme === "light" ? cardsDark : cardsLight}
                alt=""
              />
            </button>
            <span
              className={`text-${oppositeTheme} mt-2 whitespace-nowrap font-${font}-regular`}
            >
              {lang["cards"]}
            </span>
          </div>
        </div>
        <div
          className={`h-72 hidden md:block col-span-12 md:col-span-7 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none`}
        >
          <LastTickets />
        </div>
      </div>
    </div>
  );
}
