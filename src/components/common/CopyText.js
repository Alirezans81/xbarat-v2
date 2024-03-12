import React, { useRef } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { CustomTooltip } from "./CustomTooltip";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CopyText({ text, small }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

  if (text) {
    return (
      <CustomTooltip
        trigger="click"
        placement="top"
        style={oppositeTheme}
        content={text + " " + lang["copied"] + "!"}
        className={`font-${font}-bold pt-2.5`}
      >
        <CopyToClipboard text={text || ""}>
          <button className="flex items-center">
            <img
              className={small ? "w-4 h-4 md:w-5 md:h-5" : "w-5 h-5"}
              src={require("../../Images/pages/layout/Profile/copy.png")}
            />
          </button>
        </CopyToClipboard>
      </CustomTooltip>
    );
  }
}
