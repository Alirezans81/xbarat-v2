/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGetWatchList } from "../../../../../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import CustomTable from "../../../../common/CustomTable";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import {
  roundDown,
  useAddComma,
  useCalculateReverseRate,
} from "../../../../../hooks/useNumberFunctions";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function ListWatchList({
  setSource,
  setTarget,
  rateIsReversed,
  selectedCurrecnyPair,
  platform,
}) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { oneEnd: endDirection } = useDirectionState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const addComma = useAddComma();
  const calculateReverseRate = useCalculateReverseRate();

  const head = [
    lang["currency-pair"],
    lang["rate"],
    lang["low"],
    lang["high"],
    lang["week-avg"],
    lang["week-low"],
    lang["week-high"],
  ];
  const [data, setData] = useState([]);

  const { getWatchList, isLoading: getWatchListIsLoading } = useGetWatchList();
  useEffect(() => setLoading(getWatchListIsLoading), [getWatchListIsLoading]);

  useEffect(() => {
    getWatchList(setData);
  }, []);

  const [watch_list_data, set_watch_list_data] = useState([]);
  useEffect(() => {
    if (data && data.watch_list) {
      let a = data.watch_list.map((row) => {
        let temp = {};
        temp.title = row.title;

        if (
          selectedCurrecnyPair &&
          (selectedCurrecnyPair.url === row.currency_pair_url ||
            selectedCurrecnyPair.url === row.currency_pair_reverse_url) &&
          rateIsReversed
        ) {
          temp.rate = addComma(
            calculateReverseRate(
              +row.rate,
              +selectedCurrecnyPair.rate_multiplier + row.floating_number
            )
          );
          temp.min_rate = addComma(
            calculateReverseRate(
              +row.min_rate,
              +selectedCurrecnyPair.rate_multiplier + row.floating_number
            )
          );
          temp.max_rate = addComma(
            calculateReverseRate(
              +row.max_rate,
              +selectedCurrecnyPair.rate_multiplier + row.floating_number
            )
          );

          temp.week_avg_rate = addComma(
            calculateReverseRate(
              +row.week_avg_rate,
              +selectedCurrecnyPair.rate_multiplier + row.floating_number
            )
          );
          temp.week_min_rate = addComma(
            calculateReverseRate(
              +row.week_min_rate,
              +selectedCurrecnyPair.rate_multiplier + row.floating_number
            )
          );
          temp.week_max_rate = addComma(
            calculateReverseRate(
              +row.week_max_rate,
              +selectedCurrecnyPair.rate_multiplier + row.floating_number
            )
          );
        } else {
          temp.rate = addComma(roundDown(+row.rate, +row.floating_number));
          temp.min_rate = addComma(
            roundDown(+row.min_rate, +row.floating_number)
          );
          temp.max_rate = addComma(
            roundDown(+row.max_rate, +row.floating_number)
          );

          temp.week_avg_rate = addComma(
            roundDown(+row.week_avg_rate, +row.floating_number)
          );
          temp.week_min_rate = addComma(
            roundDown(+row.week_min_rate, +row.floating_number)
          );
          temp.week_max_rate = addComma(
            roundDown(+row.week_max_rate, +row.floating_number)
          );
        }

        return temp;
      });

      if (platform === "ios") {
        set_watch_list_data(a.filter((e) => !e.title.includes("IRR")));
      } else {
        set_watch_list_data(a);
      }
    }
  }, [data, rateIsReversed]);

  useEffect(() => {
    if (data && data.watch_list && data.watch_list[0]) {
      setSource(data.watch_list[0].source);
      setTarget(data.watch_list[0].target);
    }
  }, [data]);

  return (
    <div className="px-6 py-5 h-full flex flex-col">
      <h1 className={`font-${font}-bold text-2xl text-${oppositeTheme}`}>
        {lang["watch-list-label"]}
      </h1>
      <div className={`flex-1 overflow-y-auto mt-2 p${endDirection}-4`}>
        <CustomTable
          heads={head}
          rows={watch_list_data}
          selectRow={(row, index) => {
            if (data && data.watch_list) {
              setSource(data.watch_list[index].source);
              setTarget(data.watch_list[index].target);
            }
          }}
        />
      </div>
    </div>
  );
}
