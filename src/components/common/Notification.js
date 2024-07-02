import React, { useState } from "react";
import { CustomTooltip2 } from "./CustomTooltip2";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";

export function Notif() {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  return (
    <div
      className={`flex flex-col gap-y-2 font-${font}-regular text-${oppositeTheme} border ${theme === 'dark' ? "border-gray-600" : "border-gray-300"} p-3 rounded-xl`}
    >
      <div className="w-full flex items-center gap-x-10">
        <div className="flex items-center gap-x-2.5">
          <img
            alt=""
            src={require(`../../Images/pages/layout/Navbar/wallet-${oppositeTheme}.png`)}
            className={`w-12 h-12 bg-${theme} p-3 rounded-full`}
          />
          <span className={`-mb-1 text-lg`}>Deposit Confirmation</span>
        </div>

        <button className="">
          <img
            alt=""
            className="w-5 h-5"
            src={require(`../../Images/multiplication.png`)}
          />
        </button>
      </div>
      <span className="">Your deposit has been confirmed.</span>
    </div>
  );
}

function Content() {
  return (
    <div className="max-w-[40rem] flex flex-col gap-y-3 p-1.5 max-h-[30rem] overflow-y-auto">
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
      <Notif />
    </div>
  );
}

export default function Notification() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  const [open, setOpen] = useState(false);

  return (
    <CustomTooltip2
      trigger="click"
      content={<Content theme={theme} oppositeTheme={oppositeTheme} />}
      style={theme}
      placement="bottom"
      className="rounded-xl"
    >
      <button
        id="notification"
        onClick={() => setOpen((prev) => !prev)}
        className={`relative font-${font}-bold`}
      >
        <span className="absolute right-0 bg-red text-light w-5 h-5 rounded-full flex justify-center items-center">
          <span className={`${font === "Fa" ? "-mb-0.5" : "-mb-1.5"} text-sm`}>
            1
          </span>
        </span>
        <img
          className="w-10 h-10"
          alt="Notification"
          src={require(`../../Images/pages/layout/notification-${
            open ? oppositeTheme : "gray"
          }.png`)}
        />
      </button>
    </CustomTooltip2>
  );
}
