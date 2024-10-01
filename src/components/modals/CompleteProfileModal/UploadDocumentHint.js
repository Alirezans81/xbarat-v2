import React from "react";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useFontState } from "../../../Providers/FontProvider";

export default function UploadDocumentHint() {
  const lang = useLanguageState();
  const theme = useThemeState();
  const font = useFontState();

  return (
    <div className="h-full md:max-w-[14rem] md:ml-5 mb-2 md:w-max">
      <div className="hidden md:flex flex-row gap-x-4 md:gap-x-0 md:flex-col items-center">
        <div className={`p-3 md:p-5 bg-${theme}-glass rounded-2xl`}>
          <img
            alt=""
            className="w-20 h-20 md:w-48 md:h-48"
            src={require("../../../Images/common/upload-document.png")}
          />
        </div>
        <div className={`flex-1 flex-col gap-y-3`}>
          <div
            className={`flex md:mt-4 md:w-full flex-col gap-y-3 text-gray text-sm font-${font}-regular`}
          >
            <span>{"• " + lang["upload-document-profile-note-1st"] + "."}</span>
            <span>{"• " + lang["upload-document-profile-note-2nd"] + "."}</span>
            <span>{"• " + lang["upload-document-profile-note-3rd"] + "."}</span>
            <span>{"• " + lang["upload-document-profile-note-4th"] + "."}</span>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden flex flex-col gap-y-2 text-gray text-sm font-${font}-regular mt-5`}
      >
        <span>{"• " + lang["upload-document-profile-note-2nd"] + "."}</span>
        <div className="flex gap-x-4 items-center">
          <div className={`bg-${theme}-glass p-4 rounded-2xl`}>
            <img
              className="w-20 h-20"
              src={require("../../../Images/common/upload-document.png")}
            />
          </div>
          <div className="flex-1 flex flex-col gap-y-2">
            <span>{"• " + lang["upload-document-profile-note-1st"] + "."}</span>
            <span>{"• " + lang["upload-document-profile-note-3rd"] + "."}</span>
          </div>
        </div>
        <span>{"• " + lang["upload-document-profile-note-4th"] + "."}</span>
      </div>
    </div>
  );
}
