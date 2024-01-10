import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import CustomSlider from "../../../common/CustomSlider";
import OtherExchangeCard from "./OtherExchanges/OtherExchangeCard";
import { useGetOtherExchangesRate } from "../../../../apis/pages/Home/hooks";
import { useFontState } from "../../../../Providers/FontProvider";

export default function OtherExchanges({ selectedCurrecnyPair }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setLoading = useIsLoadingSplashScreenSetState();

  const [exchanges, setExchanges] = useState(null);

  const { getOtherExchangesRate, isLoading } = useGetOtherExchangesRate();
  useEffect(() => setLoading(isLoading), [isLoading]);

  useEffect(() => {
    selectedCurrecnyPair
      ? getOtherExchangesRate(
          {
            currency_pair:
              selectedCurrecnyPair && selectedCurrecnyPair.slug
                ? selectedCurrecnyPair.slug
                : "",
          },
          null,
          (data) => {
            data && data.length !== 0
              ? setExchanges(data)
              : getOtherExchangesRate(
                  {
                    currency_pair:
                      selectedCurrecnyPair &&
                      selectedCurrecnyPair.currency_pair_reverse_slug
                        ? selectedCurrecnyPair.currency_pair_reverse_slug
                        : "",
                  },
                  setExchanges
                );
          }
        )
      : setExchanges(null);
  }, [selectedCurrecnyPair]);

  return (
    <div className="pl-5 py-3 h-full flex flex-col w-full">
      <span
        className={`text-2xl font-${font}-bold text-${oppositeTheme} mx-0.5 text-left`}
      >
        {lang["other-exchanges"]}
      </span>
      {exchanges && exchanges.length ? (
        <div className="w-11/12 px-5 flex flex-col justify-center">
          <CustomSlider slidesToShow={1} slidesToScroll={1} infinite>
            {exchanges.map((exchange, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full px-4 mt-2.5"
              >
                <OtherExchangeCard
                  selectedCurrecnyPair={selectedCurrecnyPair}
                  data={exchange}
                />
              </div>
            ))}
          </CustomSlider>
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <span
            className={`font-${font}-thin -ml-4 md:-ml-0 text-2xl md:text-3xl text-${oppositeTheme}`}
          >
            {lang["no-data"]}
          </span>
        </div>
      )}
    </div>
  );
}
