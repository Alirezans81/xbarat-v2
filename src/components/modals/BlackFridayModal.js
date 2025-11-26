import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";
import Confetti from "react-confetti";
const BlackFridayModal = () => {
  const lang = useLanguageState();
  const theme = useThemeState();
  const font = useFontState();

  const oppositeTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="w-full h-full flex flex-col">
      <div className="absolute -z-10 w-screen h-screen top-0 left-0">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    </div>
  );
};

export default BlackFridayModal;
