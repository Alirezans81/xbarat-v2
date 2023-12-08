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
import { useGetLanguages } from "../apis/common/language/hooks";
import { useLanguageListSetState } from "../Providers/LanguageListProvider";

export default function Signup() {
  const setToken = useTokenSetState();

  const theme = useThemeState();
  const { three: direction } = useDirectionState();
  const themeSwitcherDivClasses = direction === "rtl" ? "left-4" : "right-4";
  const languageSwitcherDivClasses = direction === "rtl" ? "right-4" : "left-4";

  const [isSplashScreenLoading, setIsSplashScreenLoading] = useState(false);
  const setLanguageList = useLanguageListSetState();

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
