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

  function copy(text) {
    const input = document.createElement("input");
    input.value = text;

    console.log(input);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      // handle iOS devices
      input.contenteditable = true;
      input.readonly = false;

      var range = document.createRange();
      range.selectNodeContents(input);

      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      input.setSelectionRange(0, 999999);
    } else {
      // other devices are easy
      navigator && navigator.clipboard && navigator.clipboard.writeText(text);
    }
    document.execCommand("copy");
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
