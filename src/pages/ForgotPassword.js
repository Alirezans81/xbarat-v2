import React, { useState } from "react";
import LoadingSplashScreen from "../components/common/LoadingSplashScreen";
import ThemeSwitcher from "../components/common/ThemeSwitcher";
import LanguageSwitcher from "../components/common/LanguageSwitcher";
import LeftSide from "../components/pages/Login/LeftSide";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import Form from "../components/pages/ForgotPassword/Form";
import Slogan from "../components/common/Slogan";
import { useNavigate } from "react-router-dom";
import CustomToast from "../components/common/CustomToast";

export default function ForgotPassword() {
  const theme = useThemeState();
  const { three: direction } = useDirectionState();
  const themeSwitcherDivClasses = direction === "rtl" ? "left-4" : "right-4";
  const languageSwitcherDivClasses = direction === "rtl" ? "right-4" : "left-4";

  const [isSplashScreenLoading, setIsSplashScreenLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <CustomToast />
      <div
        dir={direction}
        className={`w-browser h-browser bg-${theme} relative transition-all duration-300`}
      >
        <div className="absolute w-browser h-browser bg-login flex justify-evenly items-center">
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
            <div className="flex justify-center items-center px-10">
              <div className={`bg-${theme}-glass rounded-3xl login-width p-8`}>
                <Form setIsSplashScreenLoading={setIsSplashScreenLoading} />
              </div>
            </div>
          </div>
          <div className="h-full w-full flex md:hidden flex-col justify-evenly items-center">
            <button onClick={() => navigate("/")}>
              <img
                className="w-24 h-24"
                src={require("../Images/pages/layout/logo.png")}
              />
            </button>
            <div className="flex justify-center items-center px-10">
              <div className={`bg-${theme}-glass rounded-3xl login-width p-8`}>
                <Form setIsSplashScreenLoading={setIsSplashScreenLoading} />
              </div>
            </div>
            <Slogan />
          </div>
        </div>
      </div>
    </>
  );
}
