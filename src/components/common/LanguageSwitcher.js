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
    const savedLanguageIndex = +window.localStorage.getItem(
      "selectedLanguageIndex"
    );

    setSelectedLanguageIndex(savedLanguageIndex);
  }, []);

  useEffect(() => {
    if (selectedLanguageIndex >= 0 && languages[selectedLanguageIndex]) {
      setFont(languages[selectedLanguageIndex].symbol);
      window.localStorage.setItem(
        "selectedLanguageIndex",
        selectedLanguageIndex + ""
      );

      getLanguageFile(
        languages[selectedLanguageIndex].file,
        null,
        null,
        setLang
      );
    }
  }, [selectedLanguageIndex]);

  if (with_background) {
    return (
      <div className="flex items-center">
        <CustomDropdown2
          label={
            <img
              className="w-6 h-6 bg-cover -mt-1"
              src={
                languages[selectedLanguageIndex]
                  ? languages[selectedLanguageIndex].icon_url
                  : ""
              }
            />
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
                  <img className="w-6 h-6 bg-cover" src={language.icon_url} />
                </CustomItem2>
              );
            } else if (index === 0) {
              return (
                <CustomItem2
                  key={index}
                  className="rounded-t-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <img className="w-6 h-6 bg-cover" src={language.icon_url} />
                </CustomItem2>
              );
            } else if (index === languages.length - 1) {
              return (
                <CustomItem2
                  key={index}
                  className="rounded-b-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <img className="w-6 h-6 bg-cover" src={language.icon_url} />
                </CustomItem2>
              );
            } else {
              return (
                <CustomItem2
                  key={index}
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <img className="w-6 h-6 bg-cover" src={language.icon_url} />
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
            <img
              className="w-6 h-6 bg-cover -mt-1"
              src={
                languages[selectedLanguageIndex]
                  ? languages[selectedLanguageIndex].icon_url
                  : ""
              }
            />
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
                  <img className="w-6 h-6 bg-cover" src={language.icon_url} />
                </CustomItem>
              );
            } else if (index === 0) {
              return (
                <CustomItem
                  key={index}
                  className="rounded-t-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <img className="w-6 h-6 bg-cover" src={language.icon_url} />
                </CustomItem>
              );
            } else if (index === languages.length - 1) {
              return (
                <CustomItem
                  key={index}
                  className="rounded-b-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <img className="w-6 h-6 bg-cover" src={language.icon_url} />
                </CustomItem>
              );
            } else {
              return (
                <CustomItem
                  key={index}
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <img className="w-6 h-6 bg-cover" src={language.icon_url} />
                </CustomItem>
              );
            }
          })}
        </CustomDropdown>
      </div>
    );
  }
}
