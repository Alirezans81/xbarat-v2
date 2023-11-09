import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import CustomPreviewer from "../../../../common/CustomPreviewer";

export default function DocumentInfo({ userInfo }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  return (
    <div
      className={`bg-${theme}-back grid grid-cols-2 rounded-3xl w-full flex-1 px-5 py-4`}
    >
      {userInfo && userInfo.document && (
        <>
          <div className="flex flex-col col-span-1">
            <span className={`font-mine-regular text-gray`}>
              {lang["number-of-document"]}
            </span>
            <span className={`font-mine-regular text-${oppositeTheme}`}>
              {userInfo && userInfo.identity_code ? userInfo.identity_code : ""}
            </span>
          </div>
          <div className="flex flex-col col-span-1">
            <span className={`font-mine-regular text-gray`}>
              {lang["document"]}
            </span>
            <CustomPreviewer imageUrl={userInfo.document} />
          </div>
        </>
      )}
    </div>
  );
}
