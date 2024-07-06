import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useThemeState } from "../Providers/ThemeProvider";
import { useTokenState } from "../Providers/TokenProvider";
import { useGetLanguages } from "../apis/common/language/hooks";
import { useLanguageListSetState } from "../Providers/LanguageListProvider";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useFontState } from "../Providers/FontProvider";
import { useGetNews } from "../apis/pages/Layout/hooks";
export default function OnLoad({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const token = useTokenState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const setLanguageList = useLanguageListSetState();
  const [news, setNews] = useState("");
  const { getLanguages, isLoading: getLanguagesIsLoading } = useGetLanguages();
  useEffect(
    () => setIsLoadingSplashScreen(getLanguagesIsLoading),
    [getLanguagesIsLoading]
  );
  const { getNews, isLoading: getNewsIsLoading } = useGetNews();
  useEffect(
    () => setIsLoadingSplashScreen(getNewsIsLoading),
    [getNewsIsLoading]
  );
  useEffect(() => {
    const saveStringToken = window.localStorage.getItem("authToken");
    const saveStringUserInfo = window.localStorage.getItem("userInfo");
    const savedExpireTime = window.localStorage.getItem("expireTime");
    const numOfVisitedNews = window.localStorage.getItem("numVisitedNews");

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

    // 13 khordad 1403
    if (pathname === "/") {
      const prev = +window.localStorage.getItem("visit_count");

      if (prev) {
        window.localStorage.setItem("visit_count", prev + 1 + "");

        process.env.REACT_APP_MODE === "DEVELOPMENT" &&
          console.log(
            "visit_count: ",
            window.localStorage.getItem("visit_count")
          );
      } else {
        window.localStorage.setItem("visit_count", "1");

        process.env.REACT_APP_MODE === "DEVELOPMENT" &&
          console.log("visit_count: 1");
      }
    }
    // 12 Tir 1403 Sina
    if (numOfVisitedNews !== null && numOfVisitedNews !== "undefined") {
      getNews(setNews, numOfVisitedNews, null);
    } else window.localStorage.setItem("numVisitedNews", 0);
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
