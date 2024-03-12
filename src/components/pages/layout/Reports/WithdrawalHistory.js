import React, { useState, useEffect } from "react";
import TopSection from "./common/TopSection";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import CustomSlider from "../../../common/CustomSlider";
import WithdrawalCard from "./WithdrawalHistory/WithdrawalCard";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";

export default function WithdrawalHistory({ data }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

  const getQuantityOfCards = () => {
    if (window.innerWidth >= 1280) {
      return 3;
    } else if (window.innerWidth >= 1024) {
      return 3;
    } else if (window.innerWidth >= 768) {
      return 2;
    } else if (window.innerWidth >= 640) {
      return 1;
    } else {
      return 1;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <TopSection route={"withdrawal"} />
      <div className="flex-1 px-2 xl:px-8 pt-5">
        {data && data.length ? (
          <CustomSlider
            slidesToShow={getQuantityOfCards()}
            slidesToScroll={getQuantityOfCards()}
          >
            {data.map((data, index) => (
              <div className="px-3" key={index}>
                <WithdrawalCard lang={lang} data={data} />
              </div>
            ))}
          </CustomSlider>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <span
              className={`font-${font}-thin text-${oppositeTheme} text-3xl`}
            >
              {lang["no-data"]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
