import React, { useState, useEffect } from "react";
import LeftSide from "../components/pages/Login/LeftSide";
import RightSide from "../components/pages/Login/RightSide";
import { useThemeState } from "../Providers/ThemeProvider";
import ThemeSwitcher from "../components/common/ThemeSwitcher";
import { useDirectionState } from "../Providers/DirectionProvider";
import LoadingSplashScreen from "../components/common/LoadingSplashScreen";
import { useTokenSetState } from "../Providers/TokenProvider";
import LanguageSwitcher from "../components/common/LanguageSwitcher";
import { useGetLanguages } from "../apis/common/language/hooks";
import { useLanguageListSetState } from "../Providers/LanguageListProvider";
import Slogan from "../components/common/Slogan";
import { useNavigate } from "react-router-dom";
import CustomToast from "../components/common/CustomToast";

export default function Login() {
  const setToken = useTokenSetState();

  const theme = useThemeState();
  const { three: direction } = useDirectionState();
  const themeSwitcherDivClasses = direction === "rtl" ? "left-4" : "right-4";
  const languageSwitcherDivClasses = direction === "rtl" ? "right-4" : "left-4";

  const [isSplashScreenLoading, setIsSplashScreenLoading] = useState(false);
  const setLanguageList = useLanguageListSetState();

  const navigate = useNavigate();

  const { getLanguages, isLoading: getLanguagesIsLoading } = useGetLanguages();
  useEffect(
    () => setIsSplashScreenLoading(getLanguagesIsLoading),
    [getLanguagesIsLoading]
  );

  const resetApp = () => {
    setToken(null);
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userInfo");
    window.localStorage.removeItem("statuses");
    window.localStorage.removeItem("linksShown");
  };

  useEffect(() => {
    resetApp();

    getLanguages(setLanguageList, null, (languageList) =>
      localStorage.setItem("languageList", JSON.stringify(languageList))
    );
  }, []);

  return (
    <>
      <CustomToast />
      <div
        dir={direction}
        className={`w-screen h-screen bg-${theme} relative transition-all duration-300`}
      >
        <div className="absolute w-screen h-screen bg-login flex justify-evenly">
          <LoadingSplashScreen isLoading={isSplashScreenLoading} />
          <div className={`absolute top-3 ${themeSwitcherDivClasses}`}>
            <ThemeSwitcher />
          </div>
          <div className={`absolute top-3 ${languageSwitcherDivClasses}`}>
            <LanguageSwitcher />
          </div>
          <div className="hidden lg:block my-auto">
            <LeftSide />
          </div>
          <div className="hidden md:flex h-full">
            <RightSide setIsSplashScreenLoading={setIsSplashScreenLoading} />
          </div>
          <div className="h-full w-full flex md:hidden flex-col justify-evenly items-center pb-16">
            <button onClick={() => navigate("/")}>
              <img
                className="w-24 h-24"
                src={require("../Images/pages/layout/logo.png")}
              />
            </button>
            <RightSide setIsSplashScreenLoading={setIsSplashScreenLoading} />
            <Slogan />
          </div>
        </div>
      </div>
    </>
  );
}
