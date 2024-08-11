import React, { useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function TargetReward() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  const [percentage, setPercentage] = useState(15);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-y-1">
        <div className="w-full flex justify-between">
          <span className={`text-xl font-${font}-bold`}>Receive</span>
          <div className="flex items-end gap-x-2">
            <span className={`text-gray mb-[3px]`}>10 people</span>
            <span className={`text-2xl`}>15%</span>
          </div>
        </div>
        <div
          className={`w-full h-3 rounded-full ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          } relative`}
        >
          <div
            className="absolute left-0 h-full rounded-full bg-green"
            style={{ width: percentage + "%" }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className={`w-full bg-${theme}-back rounded-3xl px-5 pt-3.5 pb-2`}>
          <div className="w-full flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-gray">Total Receive</span>
              <span className={`text-3xl font-${font}-bold`}>$150,000</span>
            </div>

            <span className="text-gray mb-1.5">1970/1/1 03:30</span>
          </div>
        </div>

        <div
          className={`w-full bg-${theme}-back rounded-full pr-4 pl-5 py-2.5 flex items-center justify-between`}
        >
          <div className="flex gap-x-1.5 -mb-2">
            <img
              alt=""
              className="w-7 h-7 -mt-0.5"
              src={require("../../../../Images/pages/Referral/TargetReward/receive.png")}
            />
            <span className="text-2xl">$25</span>
            <span className="text-gray mt-auto mb-1">1970/1/1 03:30</span>
          </div>
          <div className={`p-2 bg-${theme} rounded-full`}>
            <img
              alt="arrow"
              className="w-6 h-6"
              src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
            />
          </div>
        </div>
        <div
          className={`w-full bg-${theme}-back rounded-full pr-4 pl-5 py-2.5 flex items-center justify-between`}
        >
          <div className="flex gap-x-1.5 -mb-2">
            <img
              alt=""
              className="w-7 h-7 -mt-0.5"
              src={require("../../../../Images/pages/Referral/TargetReward/receive.png")}
            />
            <span className="text-2xl">$25</span>
            <span className="text-gray mt-auto mb-1">1970/1/1 03:30</span>
          </div>
          <div className={`p-2 bg-${theme} rounded-full`}>
            <img
              alt="arrow"
              className="w-6 h-6"
              src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
