import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeState } from "../Providers/ThemeProvider";
import ThemeSwitcher from "../components/common/ThemeSwitcher";
import { useDirectionState } from "../Providers/DirectionProvider";
import LoadingSplashScreen from "../components/common/LoadingSplashScreen";
import { useTokenSetState } from "../Providers/TokenProvider";
import Form from "../components/pages/Signup/Form";
import LeftSide from "../components/pages/Login/LeftSide";
import LanguageSwitcher from "../components/common/LanguageSwitcher";
import Slogan from "../components/common/Slogan";
import CustomToast from "../components/common/CustomToast";
import { useModalDataSetState } from "../Providers/ModalDataProvider";
import TutorialModal from "../components/modals/Tutorials/WalletTutorialModal/TutorialModal";
import { useUserSetState } from "../Providers/UserProvider";

export default function Signup({ platform }) {
  const setToken = useTokenSetState();
  const setUser = useUserSetState();
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
    setUser(null);
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userInfo");
    window.localStorage.removeItem("expireTime");
    window.localStorage.removeItem("statuses");
    window.localStorage.removeItem("linksShown");
  };

  useEffect(() => {
    resetApp();
  }, []);

  const queryParameters = new URLSearchParams(window.location.search);
  const initReferral = queryParameters.get("referral");

  return (
    <>
      <button
        className={`z-[50] absolute ${
          platform === "ios"
            ? "bottom-[110px] md:bottom-[20px]"
            : "bottom-[170px] md:bottom-[90px]"
        } right-[19px] w-[60px] h-[60px] flex justify-center items-center text-3xl bg-${theme}-back shadow-dark shadow-sm-light rounded-full text-${oppositeTheme}`}
        onClick={openTutorialModal}
      >
        <span className="text-4xl -mt-1">?</span>
      </button>
      <CustomToast />
      <div
        dir={direction}
        className={`w-browser h-browser bg-${theme} relative transition-all duration-300`}
      >
        <div className="absolute w-browser h-browser bg-login flex justify-center items-center">
          <LoadingSplashScreen isLoading={isSplashScreenLoading} />
          <div className={`absolute top-3 ${languageSwitcherDivClasses}`}>
            <LanguageSwitcher />
          </div>
          <div className={`absolute top-3 ${themeSwitcherDivClasses}`}>
            <ThemeSwitcher />
          </div>
          <div className="w-browser h-browser flex justify-evenly items-center">
            <div className="hidden lg:block my-auto">
              <LeftSide />
            </div>
            <div className="hidden md:flex h-full">
              <div className="flex justify-center items-center px-10">
                <div
                  className={`bg-${theme}-glass rounded-3xl login-width p-8`}
                >
                  <Form
                    setIsSplashScreenLoading={setIsSplashScreenLoading}
                    initReferral={initReferral}
                  />
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
                <div
                  className={`bg-${theme}-glass rounded-3xl login-width p-8`}
                >
                  <Form
                    setIsSplashScreenLoading={setIsSplashScreenLoading}
                    initReferral={initReferral}
                  />
                </div>
              </div>
              <Slogan />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
