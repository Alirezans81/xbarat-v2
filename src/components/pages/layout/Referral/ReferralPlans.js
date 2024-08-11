import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function ReferralPlans({ currency }) {
  const font = useFontState();
  const theme = useThemeState();

  return (
    <div className="md:gap-x-10 gap-y-5 flex flex-col w-full h-full py-5 px-6">
      <div className=" flex-1 flex flex-col  min-h-0 min-w-0">
        <span className={`text-xl font-${font}-bold`}>Events</span>
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

      <div className="flex-1 flex md:gap-x-10 gap-y-7 ">
        <div className=" flex-1 flex flex-col">
          <span className={`text-xl font-${font}-bold`}>Register</span>

          <button
            className={`bg-${theme}-back  rounded-2xl py-5 px-6 flex-1 flex flex-col justify-around items-center gap-y-3`}
          >
            <img
              alt=""
              src={require("../../../../Images/pages/Referral/Exchange.png")}
              className="min-h-0 max-h-full  min-w-0 w-5/6 "
            />
            <div>
              <span className="text-4xl">1$</span>
              <div className="flex flex-col gap-y-1/2 h-[5.5rem]">
                <span className="text-xl">get reward</span>
                <span className="text-sm">
                  every person that registers with your referral code
                </span>
              </div>
            </div>
          </button>
        </div>

        <div className=" flex-1 flex flex-col ">
          <span className={`text-xl font-${font}-bold`}>Exchange</span>

          <button
            className={`bg-${theme}-back rounded-2xl  py-5 px-6 flex-1 flex flex-col justify-around items-center gap-y-3`}
          >
            <img
              alt=""
              src={require("../../../../Images/pages/Referral/Exchange.png")}
              className="min-h-0 max-h-full min-w-0 w-5/6"
            />
            <div>
              <span className=" text-4xl">2$</span>
              <div className="flex flex-col h-[5.5rem]">
                <span className="gap-y-1/2 text-xl">get reward</span>
                <span className="text-sm">
                  every person that registers &{" "}
                  <span className="text-blue">exchange</span> with your referral
                  code
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
