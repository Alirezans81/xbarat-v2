import React from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useConvertDateTime } from "../../../../hooks/useConvertDateTime";
import { useLanguageState } from "../../../../Providers/LanguageProvider";

export default function ChatCard({ data, onSelect, lastTicketButtonRef }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const convertDateTime = useConvertDateTime();

  return (
    <button
      ref={lastTicketButtonRef}
      onClick={onSelect}
      className={`flex flex-col text-${oppositeTheme} bg-${theme}-back rounded-2xl px-5 pt-4 pb-3 justify-between font-${font}-regular relative h-fit gap-y-2 max-w-md overflow-x-scroll w-2/3`}
    >
      <div className="absolute right-1 top-3.5 z-10">
        <img
          alt=""
          src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
          className="w-7 h-7"
        />
      </div>
      <div className="flex flex-col gap-y-2 pr-5">
        <div className="flex flex-col justify-start">
          <span className={`text-2xl w-fit line-clamp-1`}>
            {data && data.title ? data.title : ""}
          </span>
          <div className="flex gap-x-2">
            <span className="text-blue text-sm -mt-0.5">
              {data && data.status_detail && data.status_detail.title
                ? lang && lang[data.status_detail.title]
                  ? lang[data.status_detail.title]
                  : ""
                : ""}
            </span>
          </div>
        </div>
        <div className="line-clamp-3 w-fit">
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
    </button>
  );
}
