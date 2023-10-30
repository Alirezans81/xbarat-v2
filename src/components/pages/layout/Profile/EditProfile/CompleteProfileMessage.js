import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useModalDataSetState } from "../../../../../Providers/ModalDataProvider";
import CompleteProfileModal from "../../../../modals/CompleteProfileModal";

export default function CompleteProfileMessage() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  const setModalData = useModalDataSetState();
  const openCompleteProfileModal = () => {
    setModalData({
      title: "",
      children: <CompleteProfileModal />,
      canClose: false,
      isOpen: true,
    });
  };

  return (
    <div
      className={`bg-${theme}-back w-8/12 rounded-3xl flex justify-center items-center flex-col px-7 py-20`}
    >
      <span
        className={`font-mine-bold text-2xl text-center text-${oppositeTheme}`}
      >
        {lang["complete-profile-message"] + "."}
      </span>
      <button
        onClick={openCompleteProfileModal}
        className="bg-blue rounded-full font-mine-regular pt-2 pb-1 px-3 mt-1 text-light"
      >
        {lang["complete-profile"]}
      </button>
    </div>
  );
}
