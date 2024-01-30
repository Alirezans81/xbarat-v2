import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function WaitForAdminMessage() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

  return (
    <div
      className={`bg-${theme}-back max-w-sm mt-6 md:mt-0 rounded-3xl flex justify-center items-center flex-col gap-y-4 px-7 py-20`}
    >
      <img
        className="w-20 h-20"
        src={require("../../../../../Images/common/green-check.png")}
      />
      <span
        className={`font-${font}-bold text-xl lg:text-2xl text-center-important text-${oppositeTheme}`}
      >
        {lang["complete-profile-modal-step5-note-2nd"] + "."}
      </span>
    </div>
  );
}
