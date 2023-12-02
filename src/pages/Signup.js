import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeState } from "../Providers/ThemeProvider";
import ThemeSwitcher from "../components/common/ThemeSwitcher";
import { useDirectionState } from "../Providers/DirectionProvider";
import LoadingSplashScreen from "../components/common/LoadingSplashScreen";
import { useTokenSetState, useTokenState } from "../Providers/TokenProvider";
import Form from "../components/pages/Signup/Form";
import LeftSide from "../components/pages/Login/LeftSide";
import LanguageSwitcher from "../components/common/LanguageSwitcher";

export default function Signup() {
  const token = useTokenState();
  const setToken = useTokenSetState();

  const theme = useThemeState();
  const { three: direction } = useDirectionState();
  const themeSwitcherDivClasses = direction === "rtl" ? "left-4" : "right-4";
  const languageSwitcherDivClasses = direction === "rtl" ? "right-4" : "left-4";

  const [isSplashScreenLoading, setIsSplashScreenLoading] = useState(false);

  const resetApp = () => {
    setToken(null);
    // setUserInfo(null);
    // setWallet(null);
    // setStatuses(null);
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userInfo");
    window.localStorage.removeItem("wallet");
    window.localStorage.removeItem("statuses");
    window.localStorage.removeItem("linksShown");
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (token && new Date(token.expiration) > new Date()) navigate("/home");
    else resetApp();
  }, []);

  return (
    <>
      <div
        dir={direction}
        className={`w-screen h-screen bg-${theme} relative transition-all duration-300`}
      >
        <div className="absolute w-screen h-screen bg-login flex justify-center items-center">
          <LoadingSplashScreen isLoading={isSplashScreenLoading} />
          <div className={`absolute top-3 ${languageSwitcherDivClasses}`}>
            <LanguageSwitcher />
          </div>
          <div className={`absolute top-3 ${themeSwitcherDivClasses}`}>
            <ThemeSwitcher />
          </div>
          <div className="w-screen h-screen flex justify-evenly items-center">
            <LeftSide />
            <div
              className={`bg-${theme}-glass rounded-3xl flex w-3/12 flex-row p-8 gap-x-10`}
            >
              <Form setIsSplashScreenLoading={setIsSplashScreenLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
