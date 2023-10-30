import React from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useModalDataClose } from "../../../Providers/ModalDataProvider";

export default function Buttons({ nextFunction }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const closeModal = useModalDataClose();

  return (
    <div className="w-full flex justify-end gap-x-4 mt-1 mb-3">
      <button
        onClick={closeModal}
        className={`bg-${theme}-glass rounded-full px-10 pt-2.5 pb-1 font-mine-bold text-${oppositeTheme}`}
      >
        {lang["skip"]}
      </button>
      <button
        type="submit"
        onClick={nextFunction ? nextFunction : () => {}}
        className={`bg-blue rounded-full px-10 pt-2.5 pb-1 font-mine-bold text-${oppositeTheme}`}
      >
        {lang["next"]}
      </button>
    </div>
  );
}
