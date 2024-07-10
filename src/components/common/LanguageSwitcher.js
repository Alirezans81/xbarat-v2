import React, { useEffect, useState } from "react";
import {
  useLanguageSetState,
  useLanguageState,
} from "../../Providers/LanguageProvider";
import { CustomDropdown, CustomItem } from "./CustomDropdown";
import { CustomDropdown2, CustomItem2 } from "./CustomDropdown2";
import { useGetLanguageFile } from "../../apis/common/language/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useLanguageListState } from "../../Providers/LanguageListProvider";
import { useFontSetState } from "../../Providers/FontProvider";
import { useUpdateDefaultLocale } from "../../apis/pages/Profile/hooks";
import { useUserState } from "../../Providers/UserProvider";
import { useToastDataSetState } from "../../Providers/ToastDataProvider";

export default function LanguageSwitcher({ with_background }) {
  const setLoading = useIsLoadingSplashScreenSetState();

  const languages = useLanguageListState();
  const lang = useLanguageState();
  const setLang = useLanguageSetState();
  const setFont = useFontSetState();
  const userInfo = useUserState();
  const setToastData = useToastDataSetState();

  const { updateDefaultLocale, isLoading: updateDefaultLocaleIsLoading } =
    useUpdateDefaultLocale();
  useEffect(
    () => setLoading(updateDefaultLocaleIsLoading),
    [updateDefaultLocaleIsLoading]
  );

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

      updateDefaultLocale(
        {
          default_locale: languages[selectedLanguageIndex].url,
        },
        (data) => {
          if (!userInfo.is_active && data.is_active) {
            setToastData({
              status: "success",
              message: lang["user-activated-toast-message"],
              canClose: true,
              isOpen: true,
              showTime: 10000,
            });
          }
        }
      );
    }
  }, [selectedLanguageIndex]);

  if (with_background) {
    return (
      <div className="flex items-center">
        <CustomDropdown2
          label={
            <>
              {/* <img
                className="w-6 h-6 bg-cover -mt-1"
                src={
                  languages[selectedLanguageIndex]
                    ? languages[selectedLanguageIndex].icon_url
                    : ""
                }
              /> */}
              <span className="">
                {languages[selectedLanguageIndex]
                  ? languages[selectedLanguageIndex].title
                  : ""}
              </span>
            </>
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
                  <div className="flex items-center gap-x-3.5">
                    <img
                      alt={language.title}
                      className="w-6 h-6 bg-cover"
                      src={language.icon_url}
                    />
                    <span className="-mb-1">{language.title}</span>
                  </div>
                </CustomItem2>
              );
            } else if (index === 0) {
              return (
                <CustomItem2
                  key={index}
                  className="rounded-t-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <div className="flex items-center gap-x-3.5">
                    <img
                      alt={language.title}
                      className="w-6 h-6 bg-cover"
                      src={language.icon_url}
                    />
                    <span className="-mb-1">{language.title}</span>
                  </div>
                </CustomItem2>
              );
            } else if (index === languages.length - 1) {
              return (
                <CustomItem2
                  key={index}
                  className="rounded-b-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <div className="flex items-center gap-x-3.5">
                    <img
                      alt={language.title}
                      className="w-6 h-6 bg-cover"
                      src={language.icon_url}
                    />
                    <span className="-mb-1">{language.title}</span>
                  </div>
                </CustomItem2>
              );
            } else {
              return (
                <CustomItem2
                  key={index}
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <div className="flex items-center gap-x-3.5">
                    <img
                      alt={language.title}
                      className="w-6 h-6 bg-cover"
                      src={language.icon_url}
                    />
                    <span className="">{language.title}</span>
                  </div>
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
            <>
              {/* <img
                className="w-6 h-6 bg-cover -mt-1"
                src={
                  languages[selectedLanguageIndex]
                    ? languages[selectedLanguageIndex].icon_url
                    : ""
                }
              /> */}
              <span className="">
                {languages[selectedLanguageIndex]
                  ? languages[selectedLanguageIndex].title
                  : ""}
              </span>
            </>
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
                  <div className="flex items-center gap-x-3.5">
                    <img
                      alt={language.title}
                      className="w-6 h-6 bg-cover"
                      src={language.icon_url}
                    />
                    <span className="-mb-1">{language.title}</span>
                  </div>
                </CustomItem>
              );
            } else if (index === 0) {
              return (
                <CustomItem
                  key={index}
                  className="rounded-t-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <div className="flex items-center gap-x-3.5">
                    <img
                      alt={language.title}
                      className="w-6 h-6 bg-cover"
                      src={language.icon_url}
                    />
                    <span className="-mb-1">{language.title}</span>
                  </div>
                </CustomItem>
              );
            } else if (index === languages.length - 1) {
              return (
                <CustomItem
                  key={index}
                  className="rounded-b-xl"
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <div className="flex items-center gap-x-3.5">
                    <img
                      alt={language.title}
                      className="w-6 h-6 bg-cover"
                      src={language.icon_url}
                    />
                    <span className="-mb-1">{language.title}</span>
                  </div>
                </CustomItem>
              );
            } else {
              return (
                <CustomItem
                  key={index}
                  onClick={() => setSelectedLanguageIndex(index)}
                >
                  <div className="flex items-center gap-x-3.5">
                    <img
                      alt={language.title}
                      className="w-6 h-6 bg-cover"
                      src={language.icon_url}
                    />
                    <span className="-mb-1">{language.title}</span>
                  </div>
                </CustomItem>
              );
            }
          })}
        </CustomDropdown>
      </div>
    );
  }
}
