import React from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import SubmitButton from "../../common/SubmitButton";
import { useFontState } from "../../../Providers/FontProvider";

export default function Step5({ nextFunction }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

  return (
    <div className="w-done-complete-profile h-done-complete-profile complete-profile-back -mx-8 -mb-2 -mt-12 flex justify-center items-center">
      <div
        className={`w-9/12 min-h-4/6 bg-${theme}-glass rounded-2xl flex flex-col justify-center items-center px-10 p-10`}
      >
        <img
          className="w-28 h-28"
          src={require("../../../Images/common/green-check.png")}
        />
        <span
          className={`text-gray font-${font}-regular text-base md:text-lg mt-5 text-center`}
        >
          {lang["complete-profile-modal-step5-note-1st"] + "."}
        </span>
        <span
          className={`text-${oppositeTheme} font-${font}-bold text-lg md:text-2xl text-center`}
        >
          {lang["complete-profile-modal-step5-note-2nd"] + "."}
        </span>
        <SubmitButton
          onClick={nextFunction}
          className="px-10 text-xl mt-2"
          rounded="full"
        >
          {lang["done"]}
        </SubmitButton>
      </div>
    </div>
  );
}
