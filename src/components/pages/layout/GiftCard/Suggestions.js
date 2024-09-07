import React from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import CustomSlider from "../../../common/CustomSlider";
import SuggestionCard from "./Suggestions/SuggestionCard";
import { useThemeState } from "../../../../Providers/ThemeProvider";

export default function Suggestions({ selectedSiteIndex, suggestions }) {
  const theme = useThemeState();
  const font = useFontState();
  const lang = useLanguageState();

  if (selectedSiteIndex !== -1) {
    return (
      <div className="w-full h-full flex flex-col gap-y-2 pb-4">
        <div className="w-full flex justify-between">
          <span className={`text-2xl font-${font}-bold`}>Suggestions</span>
        </div>
        <div className="mt-3.5 w-full px-4 h-full relative">
          <CustomSlider slidesToShow={4} slidesToScroll={4}>
            <div className={`h-52 w-full pr-4 pl-3`}>
              <div
                className={`w-full h-full flex flex-col justify-center items-center gap-y-1 bg-${theme}-back rounded-2xl`}
              >
                <span className={`text-4xl`}>Custom</span>
                <button className="bg-blue hover:bg-transparent border-2 border-blue transition-all duration-150 text-light rounded-full text-2xl w-10 h-10 flex justify-center items-center">
                  <span className="-mb-1">+</span>
                </button>
              </div>
            </div>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full w-full"
              >
                <SuggestionCard data={suggestion} />
              </div>
            ))}
          </CustomSlider>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className={`text-5xl font-${font}-thin capitalize`}>
          select a site!
        </span>
      </div>
    );
  }
}
