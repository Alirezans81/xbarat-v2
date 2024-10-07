import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import Confetti from "react-confetti";
import { useFontState } from "../../Providers/FontProvider";
import { useUserState } from "../../Providers/UserProvider";
const FreeExchangeModal = () => {
  const lang = useLanguageState();
  const user = useUserState();
  const theme = useThemeState();
  const font = useFontState();

  const name = user ? user.first_name : lang["member"];
  const reason =
    user && user.reason_free_exchange
      ? user.reason_free_exchange
      : lang["reason-free-exchange"];

  const oppositeTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="w-full h-full flex flex-col">
      <div className="absolute -z-10 w-screen h-screen top-0 left-0">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>

      <div
        className={`flex flex-col items-start justify-start text-${oppositeTheme} animate-fadeIn pb-5`}
      >
        <h1 className="text-2xl font-bold w-full flex justify-center items-center">
          {lang["congratulations"]}
        </h1>

        <div
          dir={font !== "Fa" ? "ltr" : "rtl"}
          className={`w-full flex gap-x-1  px-5 ${
            font === "En" ? "flex-row" : "flex-row-reverse justify-end"
          }`}
        >
          <span>{lang["dear"]}</span>
          <span className="text-[#e7bf3b]">{name}</span>
        </div>
        <div
          dir={font !== "Fa" ? "ltr" : "rtl"}
          className="flex flex-row gap-x-1 mt-2 px-5"
        >
          <span>{lang["congratulateFreeExchangeYouHaveBeenReason"]}</span>
          <span className="text-[#e7bf3b]">{reason}</span>
          <span>{lang["congratulateFreeExchangeYouHaveBeenFamily"]}</span>
        </div>
        <span
          dir={font !== "Fa" ? "ltr" : "rtl"}
          className={`px-5 mt-2 w-full gap-x-1`}
        >
          {lang["congratulateFreeExchangeYouHaveWonFreeToken"]}🎉
        </span>
        <span
          dir={font !== "Fa" ? "ltr" : "rtl"}
          className={`px-5 mt-2 w-full 
            `}
        >
          {lang["congratulateFreeExchangeYourExchangeWillBeFree"]}🤑
        </span>
        <span
          dir={font !== "Fa" ? "ltr" : "rtl"}
          className={`bg-[#e7bf3b] text-center text-light p-2 w-full font-bold rounded-2xl mt-2`}
        >
          {lang["congratulateFreeExchangeThankYouForChoosing"]}
        </span>
      </div>
    </div>
  );
};

export default FreeExchangeModal;
