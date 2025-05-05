import React, { useState, useEffect } from "react";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useFontState } from "../../../Providers/FontProvider";
import { CustomTooltip } from "../../common/CustomTooltip";
import countryCodes from "./CountryCodesStep1";
import DirectionSetter from "../../../functions/DirectionSetter";
const Note = ({ lang, font }) => {
  return (
    <div
      className={`flex flex-col gap-y-5 text-gray font-${font}-regular w-72 px-2 pt-1.5 pb-0.5`}
    >
      <span dir={DirectionSetter(font)} className="text-start">
        {"•	" + lang["complete-profile-modal-step1-note-1st"] + "."}
      </span>
      <span dir={DirectionSetter(font)} className="text-start">
        {"•	" + lang["complete-profile-modal-step1-note-2nd"] + "."}
      </span>
      <span dir={DirectionSetter(font)} className="text-start">
        {"•	" + lang["complete-profile-modal-step1-note-3rd"] + "."}
      </span>
    </div>
  );
};

export default function Step1({
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const direction = DirectionSetter(font);
  const [selectedCode, setSelectedCode] = useState();
  const [phoneWithoutCode, setPhoneWithoutCode] = useState();
  const handlePhoneChange = () => {
    handleChange("phone")({
      target: { value: selectedCode + phoneWithoutCode },
    });
  };

  useEffect(() => {
    handlePhoneChange();
  }, [selectedCode]);
  if (handleBlur && handleChange && values) {
    return (
      <div className="w-full flex gap-x-10 my-5 relative">
        <div className="flex-1">
          <form className="w-full h-full">
            <div className="flex-1 w-full flex flex-col gap-y-2">
              <span className={`font-${font}-regular text-${oppositeTheme}`}>
                {lang["first-name"]}
              </span>
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="first_name"
                  onBlur={handleBlur("first_name")}
                  onChange={handleChange("first_name")}
                  value={values.first_name ? values.first_name : ""}
                />
              </div>
              {touched.first_name && errors.first_name && (
                <span
                  dir={direction}
                  className="text-red-500 font-thin text-sm ml-1"
                >
                  {errors.first_name}
                </span>
              )}
            </div>
            <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
              <span className={`font-${font}-regular text-${oppositeTheme}`}>
                {lang["last-name"]}
              </span>
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="last_name"
                  onBlur={handleBlur("last_name")}
                  onChange={handleChange("last_name")}
                  value={values.last_name ? values.last_name : ""}
                />
              </div>
              {touched.last_name && errors.last_name && (
                <span
                  dir={direction}
                  className="text-red-500 font-thin text-sm ml-1"
                >
                  {errors.last_name}
                </span>
              )}
            </div>
            <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
              <span className={`font-${font}-regular text-${oppositeTheme}`}>
                {lang["phone"]}
              </span>
              <div className="w-full flex flex-row gap-x-2">
                <div className="w-fit">
                  <CustomDropdown label={selectedCode}>
                    {countryCodes.map((data) => (
                      <CustomItem
                        onClick={() => setSelectedCode(data.code)}
                        value={selectedCode}
                        className={"flex flex-row gap-x-1 w-full"}
                      >
                        <span className="">{data.code}</span>
                        <div className="">{data.label}</div>
                      </CustomItem>
                    ))}
                  </CustomDropdown>
                </div>
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="phone"
                  onChange={(e) => setPhoneWithoutCode(e.target.value)}
                  onBlur={handlePhoneChange}
                  maxLength={15}
                  value={phoneWithoutCode ? phoneWithoutCode : ""}
                />
              </div>
              {touched.phone && errors.phone && (
                <span
                  dir={direction}
                  className="text-red-500 font-thin text-sm ml-1"
                >
                  {errors.phone}
                </span>
              )}
            </div>
            <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
              <span className={`font-${font}-regular text-${oppositeTheme}`}>
                {lang["address"]}
              </span>
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="address"
                  onBlur={handleBlur("address")}
                  onChange={handleChange("address")}
                  value={values.address ? values.address : ""}
                />
              </div>
              {touched.address && errors.address && (
                <span
                  dir={direction}
                  className="text-red-500 font-thin text-sm ml-1"
                >
                  {errors.address}
                </span>
              )}
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
            <span className={`font-${font}-bold text-${oppositeTheme} pt-1.5`}>
              {lang["note"]}
            </span>
          </div>
          <div
            className={`mt-4 flex flex-col gap-y-3 text-gray font-${font}-regular w-64`}
          >
            <span dir={DirectionSetter(font)} className="text-start">
              {lang["complete-profile-modal-step1-note-1st"] + "."}
            </span>
            <span dir={DirectionSetter(font)} className="text-start">
              {lang["complete-profile-modal-step1-note-2nd"] + "."}
            </span>
            <span dir={DirectionSetter(font)} className="text-start">
              {lang["complete-profile-modal-step1-note-3rd"] + "."}
            </span>
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
    );
  }
}
