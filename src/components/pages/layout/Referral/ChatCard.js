import React from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useConvertDateTime } from "../../../../hooks/useConvertDateTime";

export default function ChatCard({ data, onSelect, lastTicketButtonRef }) {
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const convertDateTime = useConvertDateTime();

  return (
    <div
      className={`flex flex-col text-${oppositeTheme} bg-${theme}-back h-48 rounded-2xl px-5 pt-4 pb-3 justify-between font-${font}-regular relative`}
    >
      <button
        ref={lastTicketButtonRef}
        onClick={onSelect}
        className="absolute right-3.5 top-3.5 z-10"
      >
        <img
          alt=""
          src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
          className="w-7 h-7"
        />
      </button>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col">
          <span className={`text-2xl w-56 line-clamp-1`}>
            {data && data.title ? data.title : ""}
          </span>
          <div className="flex gap-x-2">
            <span className="text-blue text-sm -mt-0.5">New Message</span>
          </div>
        </div>
        <div className="line-clamp-3 w-64">
          <span className="text-gray">
            {data && data.last_message ? data.last_message : ""}
          </span>
        </div>
      </div>
      <div>
        <span className="text-gray">
          {data && data.last_update_date
            ? convertDateTime(data.last_update_date)
            : ""}
        </span>
      </div>
    </div>
  );
}
