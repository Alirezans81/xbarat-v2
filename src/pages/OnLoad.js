import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useThemeState } from "../Providers/ThemeProvider";
import { useTokenState } from "../Providers/TokenProvider";
import { useGetLanguages } from "../apis/common/language/hooks";
import { useLanguageListSetState } from "../Providers/LanguageListProvider";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useFontState } from "../Providers/FontProvider";

export default function OnLoad({ children }) {
  const navigate = useNavigate();
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const token = useTokenState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const setLanguageList = useLanguageListSetState();

  const { getLanguages, isLoading: getLanguagesIsLoading } = useGetLanguages();
  useEffect(
    () => setIsLoadingSplashScreen(getLanguagesIsLoading),
    [getLanguagesIsLoading]
  );

  useEffect(() => {
    const saveStringToken = window.localStorage.getItem("authToken");
    const saveStringUserInfo = window.localStorage.getItem("userInfo");
    const savedExpireTime = window.localStorage.getItem("expireTime");

    const stringLanguages = window.localStorage.getItem("languageList");
    if (
      stringLanguages !== "undefined" &&
      stringLanguages !== "null" &&
      stringLanguages !== null
    ) {
      setLanguageList(JSON.parse(stringLanguages));
    } else {
      getLanguages(setLanguageList, null, (languageList) =>
        localStorage.setItem("languageList", JSON.stringify(languageList))
      );
    }

    if (
      (saveStringToken !== "undefined" &&
        saveStringToken !== null &&
        saveStringUserInfo !== "undefined" &&
        saveStringUserInfo !== null &&
        (savedExpireTime === "undefined" ||
          !savedExpireTime ||
          new Date(savedExpireTime) >= new Date())) ||
      token
    ) {
      navigate("/home");
    } else window.localStorage.removeItem("linksShown");
  }, []);

  if (children) {
    return <div>{children}</div>;
  } else {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <span className={`text-${oppositeTheme} font-${font}-thin text-3xl`}>
          {lang["loading"]}
        </span>
      </div>
    );
  }
}
