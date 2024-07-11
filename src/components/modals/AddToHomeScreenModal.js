import React from "react";
import SubmitButton from "../common/SubmitButton";
import { useModalDataClose } from "../../Providers/ModalDataProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";

export default function AddToHomeScreenModal() {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const closeModal = useModalDataClose();

  return (
    <div
      dir={font === "Fa" ? "rtl" : "ltr"}
      className="w-[90dvw] h-[95dvh] flex flex-col items-center py-4 text-start"
    >
      <div className="flex-1 w-full flex flex-col items-center gap-y-16">
        <div className="flex flex-col gap-y-5 items-center">
          <img
            alt=""
            src={require("../../Images/pages/layout/logo.png")}
            className="w-28 h-28"
          />
          <span
            className={`!text-center text-2xl font-${font}-bold text-${oppositeTheme} `}
          >
            {lang["add-to-home-screen-modal-title"]}
          </span>
        </div>
        <div className="w-full flex flex-col gap-y-3">
          <div className="flex gap-x-2">
            <img
              alt="share"
              src={require("../../Images/common/modals/AddToHomeScreenModal/share.png")}
              className="w-10 h-10 inline"
            />
            <span
              dir="rtl"
              className={`${
                font === "Fa" ? "!text-right" : "!text-left"
              } text-lg font-${font}-regular text-gray mt-3`}
            >
              {"1- " + lang["add-to-home-screen-modal-step-1-1st"]}
              <span className={`font-${font}-bold text-${oppositeTheme}`}>
                {lang["add-to-home-screen-modal-step-1-2nd"]}
              </span>
              {lang["add-to-home-screen-modal-step-1-3rd"]}
            </span>
          </div>
          <div className="flex gap-x-2">
            <img
              alt="share"
              src={require("../../Images/common/modals/AddToHomeScreenModal/add-to-home-screen.png")}
              className="w-10 h-10 inline"
            />
            <span
              dir="rtl"
              className={`${
                font === "Fa" ? "!text-right" : "!text-left"
              } text-lg font-${font}-regular text-gray mt-2.5`}
            >
              {"2- " + lang["add-to-home-screen-modal-step-2-1st"]}
              <span className={`font-${font}-bold text-${oppositeTheme}`}>
                {lang["add-to-home-screen-modal-step-2-2nd"]}
              </span>
              {lang["add-to-home-screen-modal-step-2-3rd"]}
            </span>
          </div>
          <div className="flex gap-x-2">
            <img
              alt="share"
              src={require("../../Images/common/modals/AddToHomeScreenModal/add.png")}
              className="w-10 h-10 inline"
            />
            <span
              dir="rtl"
              className={`${
                font === "Fa" ? "!text-right" : "!text-left"
              } text-lg font-${font}-regular text-gray mt-2.5`}
            >
              {"3- " + lang["add-to-home-screen-modal-step-3-1st"]}
              <span className={`font-${font}-bold text-${oppositeTheme}`}>
                {lang["add-to-home-screen-modal-step-3-2nd"]}
              </span>
              {lang["add-to-home-screen-modal-step-2-3rd"]}
            </span>
          </div>
        </div>
      </div>
      <SubmitButton
        className="w-full text-xl py-1.5"
        rounded="full"
        onClick={closeModal}
      >
        {lang["add-to-home-screen-modal-close-button-text"]}
      </SubmitButton>
    </div>
  );
}
