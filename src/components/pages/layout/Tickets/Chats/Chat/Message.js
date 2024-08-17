import React from "react";
import { useUserState } from "../../../../../../Providers/UserProvider";
import { useThemeState } from "../../../../../../Providers/ThemeProvider";
import { useConvertDateTime } from "../../../../../../hooks/useConvertDateTime";

export default function Message({ data }) {
  const userInfo = useUserState();
  const theme = useThemeState();
  const convertDateTime = useConvertDateTime();

  if (data) {
    return (
      <div
        className={`w-full flex ${
          data.user === userInfo.url ? "flex-row" : "flex-row-reverse"
        } justify-between items-center gap-x-6`}
      >
        <div
          className={` text-lg lg:max-w-[40%] px-4 pt-3 pb-2 rounded-2xl shadow-lg shadow-black/5 ${
            data.user === userInfo.url
              ? `rounded-tl-none ${
                  theme === "dark" ? "bg-white/10" : "bg-light"
                }`
              : `rounded-tr-none bg-blue text-light`
          }`}
        >
          {data.text}
        </div>
        <div className="text-gray -mb-1">{convertDateTime(data.datetime)}</div>
      </div>
    );
  }
}
