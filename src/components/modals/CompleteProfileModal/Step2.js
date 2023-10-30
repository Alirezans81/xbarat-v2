import React, { useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";

export default function Step2({ handleBlur, handleChange, values }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  const [nationalities, setNationalities] = useState([]);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  if (handleBlur && handleChange && values) {
    return (
      <div className="w-full flex gap-x-10 my-5">
        <div className="flex-1">
          <form className="w-full h-full">
            <div className="flex-1 w-full flex flex-col gap-y-2">
              <span className={`font-mine-regular text-${oppositeTheme}`}>
                {lang["nationality"]}
              </span>
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-mine-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="first_name"
                  onBlur={handleBlur("first_name")}
                  onChange={handleChange("first_name")}
                  value={values.first_name ? values.first_name : ""}
                />
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
              <span className={`font-mine-regular text-${oppositeTheme}`}>
                {lang["country"]}
              </span>
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-mine-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="last_name"
                  onBlur={handleBlur("last_name")}
                  onChange={handleChange("last_name")}
                  value={values.last_name ? values.last_name : ""}
                />
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
              <span className={`font-mine-regular text-${oppositeTheme}`}>
                {lang["city"]}
              </span>
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-mine-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="phone"
                  onBlur={handleBlur("phone")}
                  onChange={handleChange("phone")}
                  value={values.phone ? values.phone : ""}
                />
              </div>
            </div>
          </form>
        </div>
        <div
          className={`flex-1 flex flex-col py-5 px-7 bg-${theme}-glass rounded-2xl`}
        >
          <div className="flex items-center gap-x-2">
            <img
              className="w-6 h-6"
              src={require(`../../../Images/common/info-${oppositeTheme}.png`)}
              alt="info"
            />
            <span className={`font-mine-bold text-${oppositeTheme} pt-1.5`}>
              {lang["note"]}
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-y-3 text-gray font-mine-regular w-64">
            <span>{lang["complete-profile-modal-step2-note-1st"] + "."}</span>
            <span>{lang["complete-profile-modal-step2-note-2nd"] + "."}</span>
          </div>
        </div>
      </div>
    );
  }
}
