import React, { useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import EditReferral from "../../components/pages/layout/Referral/EditReferral";

export default function Referral() {
  const theme = useThemeState();
  const font = useFontState();
  const lang = useLanguageState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [percentage, setPercentage] = useState("40");
  const [people, setPeople] = useState(1);

  return (
    <>
      <div
        className={`grid grid-cols-12 grid-row-2 md:gap-x-10 gap-y-7  text-${oppositeTheme} font-${font}-regular overflow-y-auto min-h-0 max-h-full w-full`}
      >
        <div
          className={` rounded-2xl col-start-1 col-end-4 py-5 px-6 bg-${theme} `}
        >
          <span>Referral Code</span>
        </div>

        <div
          className={` rounded-2xl col-start-4 col-end-8 py-5 px-6 bg-${theme} `}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Receive</span>
              <div className="flex gap-x-2 items-center">
                <span className="text-xs">
                  {parseInt(percentage * 0.2)} people
                </span>
                <span>{percentage}%</span>
              </div>
            </div>
            <div className="bg-red-500 w-full rounded-full">
              <div
                className={`bg-green-500 rounded-full h-2`}
                style={{ width: percentage + "%" }}
              ></div>
            </div>
            <div>d</div>
          </div>
        </div>

        <div
          className={` col-start-8 col-end-13 row-start-1 row-end-3 bg-${theme} font-${font}-regular   `}
        >
          <EditReferral />
        </div>

        <div
          className={` rounded-2xl col-start-1 col-end-8 row-start-2 row-end-2 py-5 px-6 bg-${theme} font-${font}-regular`}
        >
          <span>person code</span>
        </div>
      </div>
    </>
  );
}
