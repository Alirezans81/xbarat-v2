import React from "react";
import Card from "./GiftCards/Card";
import { useFontState } from "../../../../Providers/FontProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import CustomSlider from "../../../common/CustomSlider";

export default function GiftCards({ giftCards }) {
  const font = useFontState();
  const lang = useLanguageState();

  return (
    <div className="w-full h-full flex flex-col gap-y-2 pb-5">
      <div className="w-full flex justify-between">
        <span className={`text-2xl font-${font}-bold`}>Gift Cards</span>
      </div>
      <div className="mt-5 w-full px-4 h-full relative">
        {giftCards && giftCards.length > 0 ? (
          <CustomSlider slidesToShow={3} slidesToScroll={3}>
            {giftCards.map((e, index) => (
              <div className="px-3">
                <Card key={index} data={e} />
              </div>
            ))}
          </CustomSlider>
        ) : (
          <div className="flex-1 w-full flex justify-center items-center">
            <span className={`text-5xl font-${font}-thin capitalize`}>
              {lang["no-data"]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
