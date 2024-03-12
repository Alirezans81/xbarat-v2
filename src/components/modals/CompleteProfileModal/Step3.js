import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useUserState } from "../../../Providers/UserProvider";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import {
  useGetNationality,
  useGetRequiredFeild,
} from "../../../apis/common/location/hooks";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import CustomUploader from "../../common/CustomUploader";
import { useFontState } from "../../../Providers/FontProvider";
import { CustomTooltip } from "../../common/CustomTooltip";

const Note = ({ lang, font }) => {
  return (
    <div
      className={`flex flex-col gap-y-5 text-gray font-${font}-regular w-72 px-2 pt-1.5 pb-0.5`}
    >
      <span>{"•	" + lang["complete-profile-modal-step3-note-1st"] + "."}</span>
      <span>{"•	" + lang["complete-profile-modal-step3-note-2nd"] + "."}</span>
    </div>
  );
};

export default function Step3({
  handleBlur,
  handleChange,
  values,
  setFieldValue,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const [nationality, setNationality] = useState();
  const { getNationality, isLoading: isLoadingNationality } =
    useGetNationality();
  useEffect(
    () => setIsLoadingSplashScreen(isLoadingNationality),
    [isLoadingNationality]
  );
  const userInfo = useUserState();
  useEffect(() => {
    userInfo &&
      userInfo.nationality &&
      getNationality(userInfo.nationality, setNationality);
  }, []);

  const [requiredFeilds, setRequiredFeilds] = useState([]);
  const [selectedRequiredFeildIndex, setSelectedRequiredFeildIndex] =
    useState(-1);
  const { getRequiredFeild, isLoading: isLoadingRequiredFeild } =
    useGetRequiredFeild();
  useEffect(
    () => setIsLoadingSplashScreen(isLoadingRequiredFeild),
    [isLoadingRequiredFeild]
  );
  useEffect(() => {
    nationality &&
      nationality.required_fields &&
      nationality.required_fields.map((requiredFieldUrl) => {
        getRequiredFeild(requiredFieldUrl, requiredFeilds, setRequiredFeilds);
      });
  }, [nationality]);
  useEffect(() => {
    if (
      selectedRequiredFeildIndex >= 0 &&
      requiredFeilds[selectedRequiredFeildIndex].url
    ) {
      setFieldValue(
        "identity_type",
        requiredFeilds[selectedRequiredFeildIndex].url
      );
    }
  }, [selectedRequiredFeildIndex]);

  if (handleBlur && handleChange && values) {
    return (
      <div className="flex flex-col">
        <div
          className={`w-full bg-${theme}-glass px-0.5 py-3 md:py-1 rounded-xl flex items-center`}
        >
          <img
            className="w-10 h-10"
            src={require(`../../../Images/exclamation.png`)}
            alt="info"
          />
          <span
            className={`text-yellow text-sm md:text-base font-${font}-regular -mb-1`}
          >
            {lang["complete-profile-step-3-not-required-message-1st"] +
              ". " +
              lang["complete-profile-step-3-not-required-message-2nd"] +
              "."}
          </span>
        </div>
        <div className="w-full flex gap-x-10 my-5 relative">
          <div className="flex-1">
            <form className="w-full h-full">
              <div className="flex-1 w-full flex flex-col gap-y-2">
                <span className={`font-${font}-regular text-${oppositeTheme}`}>
                  {lang["type-of-identity-document"]}
                </span>
                <div className="w-full flex">
                  <CustomDropdown
                    label={
                      selectedRequiredFeildIndex >= 0
                        ? requiredFeilds[selectedRequiredFeildIndex].title
                        : ""
                    }
                  >
                    {requiredFeilds.map((requiredFeild, index) => {
                      if (index === 0 && index === requiredFeilds.length - 1) {
                        return (
                          <CustomItem
                            key={index}
                            className="rounded-xl"
                            onClick={() => setSelectedRequiredFeildIndex(index)}
                          >
                            {requiredFeild && requiredFeild.title
                              ? requiredFeild.title
                              : "error"}
                          </CustomItem>
                        );
                      } else if (index === 0) {
                        return (
                          <CustomItem
                            key={index}
                            className="rounded-t-xl"
                            onClick={() => setSelectedRequiredFeildIndex(index)}
                          >
                            {requiredFeild && requiredFeild.title
                              ? requiredFeild.title
                              : "error"}
                          </CustomItem>
                        );
                      } else if (index === requiredFeilds.length - 1) {
                        return (
                          <CustomItem
                            key={index}
                            className="rounded-b-xl"
                            onClick={() => setSelectedRequiredFeildIndex(index)}
                          >
                            {requiredFeild && requiredFeild.title
                              ? requiredFeild.title
                              : "error"}
                          </CustomItem>
                        );
                      } else {
                        return (
                          <CustomItem
                            key={index}
                            onClick={() => setSelectedRequiredFeildIndex(index)}
                          >
                            {requiredFeild && requiredFeild.title
                              ? requiredFeild.title
                              : "error"}
                          </CustomItem>
                        );
                      }
                    })}
                  </CustomDropdown>
                </div>
              </div>
              <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
                <span className={`font-${font}-regular text-${oppositeTheme}`}>
                  {lang["number-of-document"]}
                </span>
                <div className="w-full flex">
                  <input
                    className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                    name="identity_code"
                    onBlur={handleBlur("identity_code")}
                    onChange={handleChange("identity_code")}
                    value={values.identity_code ? values.identity_code : ""}
                  />
                </div>
              </div>
              <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
                <span className={`font-${font}-regular text-${oppositeTheme}`}>
                  {lang["upload-document"]}
                </span>
                <div className="w-full flex">
                  <CustomUploader
                    setImage={(image) => setFieldValue("document", image)}
                  />
                </div>
              </div>
            </form>
          </div>

          <div
            className={`flex-1 hidden md:flex flex-col py-5 px-7 bg-${theme}-glass rounded-2xl`}
          >
            <div className="flex items-center gap-x-2">
              <img
                className="w-6 h-6"
                src={require(`../../../Images/common/info-${oppositeTheme}.png`)}
                alt="info"
              />
              <span
                className={`font-${font}-bold text-${oppositeTheme} pt-1.5`}
              >
                {lang["note"]}
              </span>
            </div>
            <div
              className={`mt-4 flex flex-col gap-y-3 text-gray font-${font}-regular w-64`}
            >
              <span>{lang["complete-profile-modal-step3-note-1st"] + "."}</span>
              <span>{lang["complete-profile-modal-step3-note-2nd"] + "."}</span>
            </div>
          </div>

          <div className="absolute md:hidden right-0 top-0">
            <CustomTooltip
              style={oppositeTheme}
              content={<Note lang={lang} font={font} theme={theme} />}
              placement="bottom"
            >
              <div className="flex items-center gap-x-1.5">
                <img
                  className="w-6 h-6"
                  src={require(`../../../Images/common/info-${oppositeTheme}.png`)}
                />
                <span
                  className={`font-${font}-bold text-${oppositeTheme} -mb-1.5`}
                >
                  {lang["note"]}
                </span>
              </div>
            </CustomTooltip>
          </div>
        </div>
      </div>
    );
  }
}
