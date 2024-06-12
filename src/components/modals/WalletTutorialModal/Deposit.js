import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useStatusesState } from "../../../Providers/StatusesProvider";

const Deposit = ({ deposit }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  var w = window.innerWidth;
  const { context, status } = deposit;
  const statusCount = Object.keys(status).length;

  return (
    <div
      className={`w-full max-w-[1280px] overflow-scroll  h-full animate-upward flex justify-center`}
    >
      <div
        className={`grid grid-cols-${
          w <= 640
            ? 1
            : w > 640 && w <= 768
            ? statusCount < 2
              ? statusCount
              : 2
            : w > 768 && w <= 1024
            ? statusCount < 3
              ? statusCount
              : 3
            : statusCount < 4
            ? statusCount
            : 4
        }  gap-x-5   gap-y-2 w-3/4 `}
      >
        {status ? (
          Object.entries(status).map(([statusName, statusDetails]) => (
            <div
              className={`bg-${theme}-back rounded-2xl p-5 col-span-1 row-span-1 grid grid-cols-1 grid-rows-6 gap-y-2 animate-upward`}
            >
              <div className="bg-blue flex justify-center items-center rounded-2xl p-2 col-span-1 row-span-1 text-light h-fit text-center">
                {statusName}
              </div>
              <div
                className={`bg-${theme} text-start text-${oppositeTheme} h-full rounded-2xl p-5 justify-center items-start col-span-1 row-span-5`}
              >
                {statusDetails.full}
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Deposit;
