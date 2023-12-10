import React, { useRef } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { CustomTooltip } from "./CustomTooltip";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";

export default function CopyText({ text }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

  function copy() {
    navigator.clipboard.writeText(text);
  }

  if (text) {
    return (
      <CustomTooltip
        trigger="click"
        placement="top"
        style={oppositeTheme}
        content={text + " " + lang["copied"] + "!"}
        className={`font-${font}-bold pt-2.5`}
      >
        <button onClick={copy} className="flex items-center">
          <img
            className="w-5 h-5"
            src={require("../../Images/pages/layout/Profile/copy.png")}
          />
        </button>
      </CustomTooltip>
    );
  }
}
