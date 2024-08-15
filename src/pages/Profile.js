import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeState } from "../Providers/ThemeProvider";
import EditProfile from "../components/pages/layout/Profile/EditProfile";
import LastTickets from "../components/pages/layout/Profile/LastTickets";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useFontState } from "../Providers/FontProvider";
import { useGetUserInfo } from "../apis/pages/Profile/hooks";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useUserState } from "../Providers/UserProvider";
import { useToastDataSetState } from "../Providers/ToastDataProvider";

import ticketDark from "../Images/pages/layout/Profile/links/ticket-dark.png";
import ticketLight from "../Images/pages/layout/Profile/links/ticket-light.png";
import cardsDark from "../Images/pages/layout/Profile/links/cards-dark.png";
import cardsLight from "../Images/pages/layout/Profile/links/cards-light.png";
import referralDark from "../Images/pages/layout/Profile/links/referral-dark.png";
import referralLight from "../Images/pages/layout/Profile/links/referral-light.png";

const Link = ({
  theme,
  oppositeTheme,
  font,
  title,
  darkImage,
  lightImage,
  link,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center col-span-1">
      <button
        onClick={() => navigate(link)}
        className={`flex items-center justify-center bg-${theme}-back w-16 h-16 rounded-lg`}
      >
        <img
          className="w-8 h-8"
          src={theme === "light" ? darkImage : lightImage}
          alt=""
        />
      </button>
      <span
        className={`text-${oppositeTheme} mt-2 whitespace-nowrap font-${font}-regular`}
      >
        {title}
      </span>
    </div>
  );
};

export default function Profile() {
  const lang = useLanguageState();
  const userInfo = useUserState();
  const font = useFontState();
  const theme = useThemeState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const setToastData = useToastDataSetState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const { getUserInfo, isLoading: getUserInfoIsLoading } = useGetUserInfo();
  useEffect(
    () => setLoading(getUserInfoIsLoading),
    [setLoading, getUserInfoIsLoading]
  );

  const openRejectionToast = (reject_text) => {
    setToastData({
      status: "failed",
      message: reject_text,
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };

  useEffect(() => {
    userInfo &&
      userInfo.username &&
      !userInfo.is_verified &&
      getUserInfo(null, (data) => {
        data && data.reject_text && openRejectionToast(data.reject_text);
      });
  }, []);

  return (
    <div className="absolute w-full h-full overflow-y-auto pl-8 pr-8 md:pl-0 md:pr-6 pb-20 md:pb-0">
      <div className="md:mt-0 grid grid-cols-12 grid-rows-2 md:gap-x-10 gap-y-7 pb-16">
        <div
          className={`col-span-12 md:col-span-5 row-span-2 bg-${theme} rounded-3xl`}
        >
          <EditProfile />
        </div>
        <div
          className={`col-span-12 md:col-span-7 bg-${theme} rounded-3xl md:rounded-r-none text-white flex py-10 pl-10`}
        >
          <div className="w-full h-full flex flex-wrap justify-start md:gap-x-14 gap-7">
            <Link
              theme={theme}
              oppositeTheme={oppositeTheme}
              font={font}
              title={lang["tickets"]}
              darkImage={ticketDark}
              lightImage={ticketLight}
              link={"tickets"}
            />
            <Link
              theme={theme}
              oppositeTheme={oppositeTheme}
              font={font}
              title={lang["cards-profile"]}
              darkImage={cardsDark}
              lightImage={cardsLight}
              link={"cards"}
            />
            <Link
              theme={theme}
              oppositeTheme={oppositeTheme}
              font={font}
              title={lang["referrals"]}
              darkImage={referralDark}
              lightImage={referralLight}
              link={"referral"}
            />
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
