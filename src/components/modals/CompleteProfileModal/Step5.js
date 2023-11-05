import React from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import SubmitButton from "../../common/SubmitButton";
import { useModalDataClose } from "../../../Providers/ModalDataProvider";

export default function Step5() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  const closeModal = useModalDataClose();

  return (
    <div className="w-done-complete-profile h-done-complete-profile complete-profile-back -mx-8 -mb-2 -mt-12 flex justify-center items-center">
      <div
        className={`w-9/12 h-4/6 bg-${theme}-glass rounded-2xl flex flex-col justify-center items-center p-10`}
      >
        <img
          className="w-28 h-28"
          src={require("../../../Images/common/green-check.png")}
        />
        <span className="text-gray font-mine-regular text-lg mt-5">
          {lang["complete-profile-modal-step5-note-1st"] + "."}
        </span>
        <span className={`text-${oppositeTheme} font-mine-bold text-2xl`}>
          {lang["complete-profile-modal-step5-note-1st"] + "."}
        </span>
        <SubmitButton
          onClick={closeModal}
          className="px-10 text-xl mt-2"
          rounded="full"
        >
          {lang["done"]}
        </SubmitButton>
      </div>
    </div>
  );
}
