import React, { useState, useEffect } from "react";
import LeftSide from "../components/pages/Login/LeftSide";
import RightSide from "../components/pages/Login/RightSide";
import { useThemeState } from "../Providers/ThemeProvider";
import ThemeSwitcher from "../components/pages/layout/Navbar/ThemeSwitcher";
import { useDirectionState } from "../Providers/DirectionProvider";
import LoadingSplashScreen from "../components/common/LoadingSplashScreen";
import { useTokenSetState } from "../Providers/TokenProvider";

export default function Login() {
  const setToken = useTokenSetState();

  const theme = useThemeState();
  const { three: direction } = useDirectionState();
  const themeSwitcherDivClasses = direction === "rtl" ? "left-4" : "right-4";

  const [isSplashScreenLoading, setIsSplashScreenLoading] = useState(false);

  const resetApp = () => {
    setToken(null);
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userInfo");
    window.localStorage.removeItem("statuses");
    window.localStorage.removeItem("linksShown");
  };

  useEffect(() => {
    resetApp();
  }, []);

  return (
    <div
      dir={direction}
      className={`w-screen h-screen bg-${theme} relative transition-all duration-300`}
    >
      <div className="absolute w-screen h-screen bg-login flex justify-evenly">
        <LoadingSplashScreen isLoading={isSplashScreenLoading} />
        <div className={`absolute top-3 ${themeSwitcherDivClasses}`}>
          <ThemeSwitcher />
        </div>
        <LeftSide />
        <RightSide setIsSplashScreenLoading={setIsSplashScreenLoading} />
      </div>
    </div>
  );
}
