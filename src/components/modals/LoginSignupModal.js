import React from "react";
import { useFontState } from "../../Providers/FontProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useModalDataClose } from "../../Providers/ModalDataProvider";

export default function LoginSignupModal() {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const navigate = useNavigate();
  const closeModal = useModalDataClose();

  return (
    <div className="flex flex-col gap-y-5 items-end pb-2">
      <span
        className={`min-w-[22rem] w-full text-${oppositeTheme} font-${font}-regular text-lg`}
      >
        {lang["login-signup-modal-desc"]}
      </span>
      <div className="flex gap-x-2">
        <button
          className={`bg-${theme}-glass text-blue rounded-full px-4 pt-1.5 pb-0.5 font-${font}-regular`}
          onClick={() => {
            navigate("/signup");
            closeModal();
          }}
        >
          {lang["sign-up"]}
        </button>
        <button
          className={`bg-blue text-light rounded-full px-4 pt-1.5 pb-0.5 font-${font}-regular`}
          onClick={() => {
            navigate("/login");
            closeModal();
          }}
        >
          {lang["log-in"]}
        </button>
      </div>
    </div>
  );
}
