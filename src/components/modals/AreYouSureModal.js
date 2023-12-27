import React from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import SubmitButton from "../common/SubmitButton";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";

export default function AreYouSureModal({ onClick, message }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="flex flex-col w-80 md:w-96 -mt-3">
      <span className={`font-${font}-regular text-${oppositeTheme}`}>
        {message}
      </span>
      <div className="w-full flex justify-end mt-4 mb-1.5">
        <SubmitButton className="px-10" onClick={onClick} rounded="full">
          {lang["yes"]}
        </SubmitButton>
      </div>
    </div>
  );
}
