import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenSetState } from "../Providers/TokenProvider";
import { useUserSetState } from "../Providers/UserProvider";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useThemeState } from "../Providers/ThemeProvider";
import { useWalletSetState } from "../Providers/WalletProvider";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useStatusesSetState } from "../Providers/StatusesProvider";
import { useGetStatuses } from "../apis/common/status/hooks";

export default function OnLoad() {
  const navigate = useNavigate();
  const setToken = useTokenSetState();
  const setUser = useUserSetState();
  const setWallet = useWalletSetState();
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const setStatuses = useStatusesSetState();

  const { getStatuses, isLoading: getStatusesIsLoading } = useGetStatuses();
  useEffect(
    () => setIsLoadingSplashScreen(getStatusesIsLoading),
    [getStatusesIsLoading]
  );

  useEffect(() => {
    const stringStatues = window.localStorage.getItem("statues");
    if (stringStatues !== "undefined" && stringStatues !== null) {
      setStatuses(JSON.parse(stringStatues));
    } else {
      getStatuses(setStatuses, null, (statuses) =>
        localStorage.setItem("statuses", JSON.stringify(statuses))
      );
    }

    const saveStringToken = window.localStorage.getItem("authToken");
    const saveStringUserInfo = window.localStorage.getItem("userInfo");
    const saveStringWallet = window.localStorage.getItem("wallet");
    if (
      saveStringToken !== "undefined" &&
      saveStringToken !== "null" &&
      saveStringUserInfo !== "undefined" &&
      saveStringUserInfo !== "null" &&
      saveStringWallet !== "undefined" &&
      saveStringWallet !== "null"
    ) {
      const savedToken = JSON.parse(saveStringToken);
      const savedUserInfo = JSON.parse(saveStringUserInfo);
      const savedWallet = JSON.parse(saveStringWallet);

      setToken(savedToken);
      setUser(savedUserInfo);
      setWallet(savedWallet);
      navigate("/home");
    } else {
      window.localStorage.removeItem("linksShown");
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <span className={`text-${oppositeTheme} font-mine-thin text-3xl`}>
        {lang["loading"]}
      </span>
    </div>
  );
}
