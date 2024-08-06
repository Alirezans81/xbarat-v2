import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";

export default function Referral() {
  const theme = useThemeState();
  const font = useFontState();
  const lang = useLanguageState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  return (
    <>
      <div
        className={`grid grid-cols-12 grid-row-2 md:gap-x-10 gap-y-7 w-full h-full text-${oppositeTheme} font-${font}-regular `}
      >
        <div
          className={` rounded-2xl col-start-1 col-end-4 py-5 pl-5 bg-${theme} `}
        >
          <h1>Referral Code</h1>
        </div>

        <div
          className={` rounded-2xl col-start-4 col-end-8 py-5 px-6 bg-${theme} `}
        >
          <h3>Receive</h3>
        </div>

        <div
          className={`rounded-2xl col-start-8 col-end-13 row-start-1 row-end-3 w-full py-5 px-6 bg-${theme} font-${font}-regular`}
        >
          <button>
            <h3>Events</h3>
          </button>
          <h3>Exchanges</h3>
          <h3>Registered</h3>
        </div>

        <div
          className={` rounded-2xl col-start-1 col-end-8 row-start-2 row-end-2 py-5 px-6 bg-${theme} font-${font}-regular`}
        >
          <h2>person code</h2>
        </div>
      </div>
    </>
  );
}
