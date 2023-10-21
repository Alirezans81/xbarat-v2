import React from "react";
import { useThemeState } from "../../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";
import CustomDateTimeInput from "../../../../../common/CustomDateTimePicker";
import { CustomDropdown } from "../../../../../common/CustomDropdown";

export default function Filters({ selectionRange, setSelectionRange }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="flex flex-col">
        <span className={`text-${oppositeTheme} text-2xl font-mine-bold`}>
          {lang["date-&-time"]}
        </span>
        <div className="mt-2">
          <div>
            <CustomDateTimeInput
              selectionRange={selectionRange}
              setSelectionRange={setSelectionRange}
              type="start"
              placeHolder="Start"
              className="w-full"
            />
          </div>
          <div className="mt-2">
            <CustomDateTimeInput
              selectionRange={selectionRange}
              setSelectionRange={setSelectionRange}
              type="end"
              placeHolder="End"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`text-${oppositeTheme} text-2xl font-mine-bold`}>
          {lang["currency"]}
        </span>
        <div className="mt-2 w-full">
          <div className="w-full flex">
            <CustomDropdown className="justify-between" />
          </div>
          <div className="w-full flex mt-2">
            <CustomDropdown className="justify-between" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`text-${oppositeTheme} text-2xl font-mine-bold`}>
          {lang["amount"]}
        </span>
        <div className="mt-2 w-full">
          <div className="w-full flex">
            <input
              className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
              placeholder={lang["source"]}
            />
          </div>
          <div className="w-full flex mt-2">
            <input
              className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
              placeholder={lang["target"]}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`text-${oppositeTheme} text-2xl font-mine-bold`}>
          {lang["rate"]}
        </span>
        <div className="mt-2 w-full">
          <div className="w-full flex">
            <input
              className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
              placeholder={lang["rate"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
