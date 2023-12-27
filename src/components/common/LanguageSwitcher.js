import React, { useEffect, useState } from "react";
import { useLanguageSetState } from "../../Providers/LanguageProvider";
import { CustomDropdown, CustomItem } from "./CustomDropdown";
import { CustomDropdown2, CustomItem2 } from "./CustomDropdown2";
import { useGetLanguageFile } from "../../apis/common/language/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useLanguageListState } from "../../Providers/LanguageListProvider";
import { useFontSetState } from "../../Providers/FontProvider";

export default function LanguageSwitcher({ with_background }) {
  const setLoading = useIsLoadingSplashScreenSetState();

  const languages = useLanguageListState();
  const setLang = useLanguageSetState();
  const setFont = useFontSetState();

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
    if (selectedLanguageIndex >= 0 && languages[selectedLanguageIndex]) {
      setFont(languages[selectedLanguageIndex].symbol);

      getLanguageFile(
        languages[selectedLanguageIndex].file,
        null,
        null,
        (data) => setLang(data)
      );
    }
  }, [selectedLanguageIndex]);

  if (with_background) {
    return (
      <div className="flex items-center">
        <CustomDropdown2
          label={
            selectedLanguageIndex >= 0 && languages[selectedLanguageIndex]
              ? languages[selectedLanguageIndex].symbol
              : ""
          }
        >
          {languages.map((language, index) => {
            if (index === 0 && index === languages.length - 1) {
              return (
                <CustomItem2
                  key={index}
                  className="rounded-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  {language && language.symbol ? language.symbol : "error"}
                </CustomItem2>
              );
            } else if (index === 0) {
              return (
                <CustomItem2
                  key={index}
                  className="rounded-t-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  {language && language.symbol ? language.symbol : "error"}
                </CustomItem2>
              );
            } else if (index === languages.length - 1) {
              return (
                <CustomItem2
                  key={index}
                  className="rounded-b-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  {language && language.symbol ? language.symbol : "error"}
                </CustomItem2>
              );
            } else {
              return (
                <CustomItem2
                  key={index}
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  {language && language.symbol ? language.symbol : "error"}
                </CustomItem2>
              );
            }
          })}
        </CustomDropdown2>
      </div>
    );
  } else {
    return (
      <div className="flex items-center">
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
