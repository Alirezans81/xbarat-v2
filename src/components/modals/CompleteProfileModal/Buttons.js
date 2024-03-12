import React from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useModalDataClose } from "../../../Providers/ModalDataProvider";
import { useFontState } from "../../../Providers/FontProvider";

export default function Buttons({ step, previousStep, nextFunction }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const closeModal = useModalDataClose();

  return (
    <div className="w-full flex justify-end gap-x-4 mt-1 mb-3">
      {step !== 1 && (
        <button
          type="button"
          onClick={previousStep ? previousStep : () => {}}
          className={`bg-${theme}-glass rounded-full text-base px-6 pt-1.5 md:px-10 md:text-base md:pt-2.5 md:pb-1 font-${font}-bold text-${oppositeTheme}`}
        >
          {lang["back"]}
        </button>
      )}
      <button
        onClick={closeModal}
        className={`bg-${theme}-glass rounded-full text-base px-6 pt-1.5 md:px-10 md:text-base md:pt-2.5 md:pb-1 font-${font}-bold text-${oppositeTheme}`}
      >
        {lang["skip"]}
      </button>
      <button
        type="submit"
        onClick={nextFunction ? nextFunction : () => {}}
        className={`bg-blue rounded-full text-base px-6 pt-1.5 md:px-10 md:text-base md:pt-2.5 md:pb-1 font-${font}-bold text-${oppositeTheme}`}
      >
        {step === 4 ? lang["done"] : lang["next"]}
      </button>
    </div>
  );
}
