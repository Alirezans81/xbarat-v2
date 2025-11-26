import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";
import { isMobile } from "react-device-detect";
import Confetti from "react-confetti";
const BlackFridayModal = ({ closeModal }) => {
  const lang = useLanguageState();
  const theme = useThemeState();
  const font = useFontState();
  const photo = isMobile
    ? require("../../Images/blackFridayXS.png")
    : require("../../Images/blackFridayMD.png");
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  return (
    <div className="w-full h-full flex flex-col">
      <div className="absolute -z-10 w-screen h-screen top-0 left-0">
        <Confetti
          colors={["#E42F08", "#FCB819"]}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
      <div className="w-full h-full flex justify-center items-center ">
        <img
          className={`rounded-3xl ${isMobile ? "w-[300px]" : "w-[1100px]"}  `}
          src={photo}
          alt="Black Friday Poster"
        />
      </div>
      <div
        dir="rtl"
        className={`mt-5 ${
          isMobile ? "w-[300px]" : "w-[1100px]"
        } font-Fa-regular`}
      >
        <span
          dir="rtl"
          className="w-full h-fit flex text-xl text-white  text-start"
        >
          برای بلک فرایدی تصمیم گرفتیم یک کار بزرگ وخاص انجام بدیم: ۵ نفر در
          ایکس برات، یک سال کامل هیچ کارمزدی پرداخت نمی‌کنن!!! کارمزد صفر میشه؛
          یعنی همون یک درصد هم حذف میشه.
        </span>
      </div>
      <div
        dir="rtl"
        className="w-full flex font-Fa-bold  justify-center h-fit mt-2"
      >
        <button
          dir="rtl"
          className="bg-blue rounded-xl p-2  text-white flex text-start"
          onClick={() => closeModal()}
        >
          متوجه شدم.
        </button>
      </div>
    </div>
  );
};

export default BlackFridayModal;
