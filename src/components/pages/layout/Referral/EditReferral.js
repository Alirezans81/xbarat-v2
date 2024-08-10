import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";

export default function EditReferral() {
  const theme = useThemeState();
  return (
    <div className="md:gap-x-10 gap-y-5 flex flex-col w-full h-full py-5 px-6">
      <div className=" flex-1 flex flex-col  min-h-0 min-w-0">
        <span>Events</span>
        <button
          className={`bg-${theme}-back rounded-2xl py-5 px-6 flex-1 min-h-0 min-w-0 flex `}
        >
          <img
            src={require("../../../../Images/pages/Referral/Event.png")}
            className="min-h-0 max-h-full  min-w-0 w-full"
          />
        </button>
      </div>

      <div className="flex-1 flex md:gap-x-10 gap-y-7 ">
        <div className=" flex-1 flex flex-col">
          <span>Exchanges</span>

          <button
            className={`bg-${theme}-back  rounded-2xl  py-5 px-6 flex-1 flex flex-col justify-around items-center`}
          >
            <img
              src={require("../../../../Images/pages/Referral/Exchange.png")}
              className="min-h-0 max-h-full  min-w-0 w-5/6 "
            />
            <div>
              <span className="text-4xl">150$</span>
              <div className="flex flex-col gap-y-1/2 ">
                <span>get reward</span>
                <span className="text-xs">
                  every 10 people that register with your Referral code
                </span>
              </div>
            </div>
          </button>
        </div>

        <div className=" flex-1 flex flex-col ">
          <span>Registered</span>

          <button
            className={`bg-${theme}-back rounded-2xl  py-5 px-6 flex-1 flex flex-col justify-around items-center`}
          >
            <img
              src={require("../../../../Images/pages/Referral/Exchange.png")}
              className="min-h-0 max-h-full min-w-0 w-5/6"
            />
            <div>
              <span className=" text-4xl">150$</span>
              <div className="flex flex-col">
                <span className="gap-y-1/2">get reward</span>
                <span className="text-xs">
                  every 10 people that register with your Referral code
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
