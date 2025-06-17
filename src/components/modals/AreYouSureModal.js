import React from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import SubmitButton from "../common/SubmitButton";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import DirectionSetter from "../../functions/DirectionSetter";
export default function AreYouSureModal({ onClick, message }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const font = useFontState();
  const direction = DirectionSetter(font);
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  return (
    <div
      dir={direction}
      className="flex flex-col w-96 flex-justify-center -mt-3"
    >
      <span
        dir={direction}
        className={`flex justify-${
          font === "Fa" ? "end" : "start"
        } font-${font}-regular text-${oppositeTheme}`}
      >
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
