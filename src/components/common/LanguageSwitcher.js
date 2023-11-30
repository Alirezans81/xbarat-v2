import React, { useEffect, useRef, useState } from "react";
import { useLanguageSetState } from "../../Providers/LanguageProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { CustomDropdown, CustomItem } from "./CustomDropdown";
import {
  useGetLanguageFile,
  useGetLanguages,
} from "../../apis/common/language/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useLanguageListState } from "../../Providers/LanguageListProvider";

export default function LanguageSwitcher({ with_background }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setLoading = useIsLoadingSplashScreenSetState();

  const languages = useLanguageListState();
  const setLang = useLanguageSetState();

  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(-1);
  const { getLanguageFile, isLoading: getLanguageFileIsLoading } =
    useGetLanguageFile();
  useEffect(
    () => setLoading(getLanguageFileIsLoading),
    [getLanguageFileIsLoading]
  );

  useEffect(() => {
    setSelectedLanguageIndex(0);
  }, []);
  useEffect(() => {
    selectedLanguageIndex >= 0 &&
      languages[selectedLanguageIndex] &&
      getLanguageFile(
        languages[selectedLanguageIndex].file,
        null,
        null,
        (data) => setLang(data)
      );
  }, [selectedLanguageIndex]);

  if (with_background) {
    return <div>LanguageSwitcher</div>;
  } else {
    return (
      <div className="flex items-center">
        <img
          className="w-7 h-7 mx-2"
          src={require(`../../Images/common/globe-${oppositeTheme}.png`)}
        />
        <CustomDropdown
          label={
            selectedLanguageIndex >= 0 && languages[selectedLanguageIndex]
              ? languages[selectedLanguageIndex].symbol
              : ""
          }
        >
          {languages.map((language, index) => {
            if (index === 0 && index === languages.length - 1) {
              return (
                <CustomItem
                  key={index}
                  className="rounded-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  {language && language.symbol ? language.symbol : "error"}
                </CustomItem>
              );
            } else if (index === 0) {
              return (
                <CustomItem
                  key={index}
                  className="rounded-t-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  {language && language.symbol ? language.symbol : "error"}
                </CustomItem>
              );
            } else if (index === languages.length - 1) {
              return (
                <CustomItem
                  key={index}
                  className="rounded-b-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  {language && language.symbol ? language.symbol : "error"}
                </CustomItem>
              );
            } else {
              return (
                <CustomItem
                  key={index}
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  {language && language.symbol ? language.symbol : "error"}
                </CustomItem>
              );
            }
          })}
        </CustomDropdown>
      </div>
    );
  }
}
