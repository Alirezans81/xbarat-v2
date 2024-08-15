import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import { useConvertDateTime } from "../../../../hooks/useConvertDateTime";
import { useLanguageState } from "../../../../Providers/LanguageProvider";

export default function TargetReward({
  currency,
  user_referrals_count,
  data,
  total_benefit,
}) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const convertDateTime = useConvertDateTime();

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(user_referrals_count * 10);
  }, [user_referrals_count]);

  return (
    <div className="h-full flex flex-col justify-between gap-y-4 md:gap-y-0">
      <div className="flex flex-col gap-y-1">
        <div className="w-full flex justify-between">
          <span className={`text-xl font-${font}-bold`}>{lang["receive"]}</span>
          <div className="flex items-end gap-x-2">
            <span className={`text-gray mb-[3px]`}>
              {10 + " " + lang["target-referral-people"]}
            </span>
            <span className={`text-2xl`}>{percentage + "%"}</span>
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
        <div className={`w-full bg-${theme}-back rounded-3xl px-5 pt-4 pb-1.5`}>
          <div className="w-full flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-gray">{lang["total-receives"]}</span>
              <span className={`text-3xl font-${font}-bold`}>
                {currency.symbol + total_benefit}
              </span>
            </div>

            <span className="text-gray mb-1.5">
              {convertDateTime(new Date())}
            </span>
          </div>
        </div>

        {data[0] && (
          <div
            className={`w-full bg-${theme}-back rounded-full pr-4 pl-5 py-2.5 flex items-center justify-between`}
          >
            <div className="flex gap-x-1.5 -mb-2">
              <img
                alt=""
                className="w-7 h-7 -mt-0.5"
                src={require("../../../../Images/pages/Referral/TargetReward/receive.png")}
              />
              <span className="text-2xl">
                {currency.symbol + data[0].amount}
              </span>
              <span className="text-gray mt-auto mb-1">
                {convertDateTime(data[0].datetime_create)}
              </span>
            </div>
            <button className={`p-2 bg-${theme} rounded-full`}>
              <img
                alt="arrow"
                className="w-6 h-6"
                src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
              />
            </button>
          </div>
        )}

        {data[1] && (
          <div
            className={`w-full bg-${theme}-back rounded-full pr-4 pl-5 py-2.5 flex items-center justify-between`}
          >
            <div className="flex gap-x-1.5 -mb-2">
              <img
                alt=""
                className="w-7 h-7 -mt-0.5"
                src={require("../../../../Images/pages/Referral/TargetReward/receive.png")}
              />
              <span className="text-2xl">
                {currency.symbol + data[1].amount}
              </span>
              <span className="text-gray mt-auto mb-1">
                {convertDateTime(data[1].datetime_create)}
              </span>
            </div>
            <button className={`p-2 bg-${theme} rounded-full`}>
              <img
                alt="arrow"
                className="w-6 h-6"
                src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
