import React, { useEffect, useState } from "react";
import { useGetWatchList } from "../../../../../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import CustomTable from "../../../../common/CustomTable";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import {
  roundDown,
  useAddComma,
} from "../../../../../hooks/useNumberFunctions";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";
import { useCurrenciesState } from "../../../../../Providers/CurrenciesProvider";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function ListWatchList({
  selectedSourceIndex,
  setSelectedSourceIndex,
  availableTargets,
  setSelectedTargetIndex,
}) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { oneEnd: endDirection } = useDirectionState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const addComma = useAddComma();

  const currencies = useCurrenciesState();

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

  const [targetSlug, setTargetSlug] = useState();

  const watch_list_data =
    data && data.watch_list
      ? data.watch_list.map((row) => {
          let temp = {};
          temp.title = row.title;

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

          return temp;
        })
      : [];

  const findSource = (currency_slug) => {
    let result = -1;
    result = currencies.findIndex(
      (currency) => currency.slug === currency_slug
    );
    result >= 0 && setSelectedSourceIndex(result);
  };

  const findTarget = (currency_slug) => {
    let result = -1;
    result = availableTargets.findIndex(
      (currency) => currency.slug === currency_slug
    );
    result >= 0 && setSelectedTargetIndex(result);
  };

  useEffect(() => {
    if (availableTargets.length > 0 && targetSlug) {
      findTarget(targetSlug);
    }
  }, [availableTargets, targetSlug]);

  useEffect(() => {
    if (
      data &&
      data.watch_list &&
      data.watch_list[0] &&
      currencies.length > 0
    ) {
      findSource(data.watch_list[0].source);
    }
  }, [data, currencies]);
  useEffect(() => {
    if (data && data.watch_list && data.watch_list[0]) {
      setTargetSlug(data.watch_list[0].target);
    }
  }, [selectedSourceIndex]);

  return (
    <div className="px-6 py-5 h-full flex flex-col">
      <h1 className={`font-${font}-bold text-2xl text-${oppositeTheme}`}>
        {lang["watch-list-label"]}
      </h1>
      <div className={`flex-1 overflow-y-auto mt-2 p${endDirection}-4`}>
        <CustomTable
          maxheight={35}
          heads={head}
          rows={watch_list_data}
          selectRow={(row, index) => {
            if (data && data.watch_list) {
              findSource(data.watch_list[index].source);
              setTargetSlug(data.watch_list[index].target);
            }
          }}
        />
      </div>
    </div>
  );
}
