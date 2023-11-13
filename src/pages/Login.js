import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftSide from "../components/pages/Login/LeftSide";
import RightSide from "../components/pages/Login/RightSide";
import { useThemeState } from "../Providers/ThemeProvider";
import ThemeSwitcher from "../components/pages/layout/Navbar/ThemeSwitcher";
import { useDirectionState } from "../Providers/DirectionProvider";
import LoadingSplashScreen from "../components/common/LoadingSplashScreen";
import { useTokenSetState, useTokenState } from "../Providers/TokenProvider";
import { useUserSetState } from "../Providers/UserProvider";
import { useWalletSetState } from "../Providers/WalletProvider";
import { useStatusesSetState } from "../Providers/StatusesProvider";

export default function Login() {
  const token = useTokenState();
  const setToken = useTokenSetState();
  const setUserInfo = useUserSetState();
  const setWallet = useWalletSetState();
  const setStatuses = useStatusesSetState();

  const theme = useThemeState();
  const { three: direction } = useDirectionState();
  const themeSwitcherDivClasses = direction === "rtl" ? "left-4" : "right-4";

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
    // if (token && new Date(token.expiration) > new Date()) navigate("/home");
    // else resetApp();

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
