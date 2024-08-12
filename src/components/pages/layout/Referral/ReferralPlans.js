import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";

export default function ReferralPlans({ currency }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();

  return (
    <div className="md:gap-x-10 gap-y-5 flex flex-col w-full h-full py-5 px-6">
      <div className=" flex-1 flex flex-col  min-h-0 min-w-0 gap-y-1">
        <span className={`text-xl font-${font}-bold`}>{lang["events"]}</span>
        <button
          className={`bg-${theme}-back rounded-2xl py-2 px-4 flex-1 min-h-0 min-w-0 flex `}
        >
          <img
            alt=""
            src={require("../../../../Images/pages/Referral/Event.png")}
            className="min-h-0 max-h-full min-w-0 w-full"
          />
        </button>
      </div>

      <div className="flex-1 flex md:flex-row flex-col md:gap-x-10 gap-y-4">
        <div className=" flex-1 flex flex-col gap-y-1">
          <span className={`text-xl font-${font}-bold`}>
            {lang["register"]}
          </span>

          <div
            className={`bg-${theme}-back rounded-2xl py-5 px-6 flex-1 flex flex-col justify-around items-center gap-y-3`}
          >
            <img
              alt=""
              src={require("../../../../Images/pages/Referral/Exchange.png")}
              className="min-h-0 max-h-full min-w-0 w-5/6 md:block hidden"
            />
            <div className="flex flex-col items-center">
              <span className="text-4xl">{"1" + currency.symbol}</span>
              <div className="flex flex-col items-center gap-y-1/2 md:h-[5.5rem]">
                <span className="text-xl">{lang["get-reward"]}</span>
                <span className="text-sm text-center">
                  {lang["register-reward-desc"]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex-1 flex flex-col gap-y-1">
          <span className={`text-xl font-${font}-bold`}>
            {lang["exchange"]}
          </span>

          <div
            className={`bg-${theme}-back rounded-2xl  py-5 px-6 flex-1 flex flex-col justify-around items-center gap-y-3`}
          >
            <img
              alt=""
              src={require("../../../../Images/pages/Referral/Exchange.png")}
              className="min-h-0 max-h-full min-w-0 w-5/6 md:block hidden"
            />
            <div className="flex flex-col items-center">
              <span className=" text-4xl">{"2" + currency.symbol}</span>
              <div className="flex flex-col items-center md:h-[5.5rem]">
                <span className="gap-y-1/2 text-xl">{lang["get-reward"]}</span>
                <span className="text-sm text-center">
                  {lang["exchange-reward-desc-1st"]}
                  <span className="text-blue">
                    {lang["exchange-reward-desc-2nd"]}
                  </span>
                  {lang["exchange-reward-desc-3rd"]}
                  code
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
