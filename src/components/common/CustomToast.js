import React, { useEffect, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import {
  useToastDataSetState,
  useToastDataState,
} from "../../Providers/ToastDataProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";

export default function CustomToast() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();

  const toastData = useToastDataState();
  const setToastData = useToastDataSetState();
  const containerClass = toastData.isOpen ? "top-4" : "-top-36";

  useEffect(() => {
    setTimeout(() => {
      setToastData({ ...toastData, isOpen: false });
    }, toastData.showTime);
  }, []);

  return (
    <div
      className={`z-150 flex items-center gap-2 bg-blue-gradient min-w-toast rounded-full pl-1 pr-3 pt-1 pb-1 font-mine-regular border-2 border-gray absolute mx-auto transition-all duration-300 left-4 ${containerClass}`}
    >
      {toastData.status === "success" && (
        <div
          className={`bg-${theme} w-10 h-10 rounded-full flex justify-center items-center`}
        >
          <img className="w-6 h-6" src={require("../../Images/check.png")} />
        </div>
      )}
      {toastData.status === "failed" && (
        <div
          className={`bg-${theme} w-10 h-10 rounded-full flex justify-center items-center`}
        >
          <img
            className="w-6 h-6"
            src={require("../../Images/multiplication.png")}
          />
        </div>
      )}
      {toastData.status === "warning" && (
        <div
          className={`bg-${theme} w-10 h-10 rounded-full flex justify-center items-center`}
        >
          <img
            className="w-9 h-9"
            src={require("../../Images/exclamation.png")}
          />
        </div>
      )}
      <span className={`text-${oppositeTheme} mt-0.5`}>
        {toastData.message}
      </span>
      {toastData.canClose && (
        <button
          onClick={() => setToastData({ ...toastData, isOpen: false })}
          className={`m${oneDirection}-auto `}
        >
          <img
            className="w-4 h-4"
            src={require("../../Images/close-light.png")}
          />
        </button>
      )}
    </div>
  );
}
