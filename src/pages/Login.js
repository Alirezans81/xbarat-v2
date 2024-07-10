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
import { useModalDataSetState } from "../Providers/ModalDataProvider";
import TutorialModal from "../components/modals/WalletTutorialModal/TutorialModal";

export default function Login() {
  const setToken = useTokenSetState();
  const setModalData = useModalDataSetState();
  const openTutorialModal = () => {
    setModalData({
      title: "Tutorial",
      children: <TutorialModal />,
      canClose: true,
      isOpen: true,
    });
  };

  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { three: direction } = useDirectionState();
  const themeSwitcherDivClasses = direction === "rtl" ? "left-4" : "right-4";
  const languageSwitcherDivClasses = direction === "rtl" ? "right-4" : "left-4";

  const [isSplashScreenLoading, setIsSplashScreenLoading] = useState(false);

  const navigate = useNavigate();

  const resetApp = () => {
    setToken(null);
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userInfo");
    window.localStorage.removeItem("expireTime");
    window.localStorage.removeItem("statuses");
    window.localStorage.removeItem("linksShown");
  };

  useEffect(() => {
    resetApp();
  }, []);

  return (
    <>
      <button
        className={`z-[50] absolute bottom-[30px] md:bottom-[90px] right-[19px] w-[60px] h-[60px] flex justify-center items-center text-3xl bg-${theme}-back shadow-dark shadow-sm-light rounded-full text-${oppositeTheme}`}
        onClick={openTutorialModal}
      >
        <span className="text-4xl -mt-1">?</span>
      </button>
      <CustomToast />
      <div
        dir={direction}
        className={`w-browser h-browser bg-${theme} relative transition-all duration-300`}
      >
        <div className="absolute w-browser h-browser bg-login flex justify-evenly">
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
          <div className="h-full w-full flex md:hidden flex-col justify-evenly items-center">
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
