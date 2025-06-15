/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGetWatchList } from "../../../../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import CustomTable from "../../../common/CustomTable";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import {
  roundDown,
  useAddComma,
  useCalculateReverseRate,
} from "../../../../hooks/useNumberFunctions";
import { useModalDataSetState } from "../../../../Providers/ModalDataProvider";
import TutorialModal from "../../../modals/Tutorials/WatchlistTutorialModal/Tutorial";
import { useFontState } from "../../../../Providers/FontProvider";

export default function WatchList({
  setSource,
  setTarget,
  rateIsReversed,
  selectedCurrecnyPair,
  platform,
}) {
  const lang = useLanguageState();
  const setModalData = useModalDataSetState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setLoading = useIsLoadingSplashScreenSetState();
  const addComma = useAddComma();
  const calculateReverseRate = useCalculateReverseRate();

  const head = [
    lang["currency-pair"],
    lang["latest-transation"],
    lang["low"],
    lang["high"],
  ];
  const [data, setData] = useState([]);
  const openTutorialModal = () => {
    setModalData({
      title: "Watchlist Tutorial",
      children: <TutorialModal />,
      canClose: true,
      isOpen: true,
    });
  };
  const { getWatchList, isLoading: getWatchListIsLoading } = useGetWatchList();
  useEffect(() => setLoading(getWatchListIsLoading), [getWatchListIsLoading]);

  useEffect(() => {
    getWatchList(setData);
  }, []);
  const [watch_list_data, set_watch_list_data] = useState([]);

  function processCurrencyPairs(data) {
    const seen = new Set();
    const result = [];

    data.forEach((item) => {
      if (seen.has(item.slug)) return;

      const [source, target] = item.slug.split("-to-");
      const reverseSlug = `${target}-to-${source}`;
      const reverseItem = data.find((d) => d.slug === reverseSlug);

      if (reverseItem) {
        seen.add(item.slug);
        seen.add(reverseItem.slug);

        const rate1 = +item.rate;
        const rate2 = +reverseItem.rate;

        const minRate = Math.min(rate1, rate2);
        const maxRate = Math.max(rate1, rate2);
        const tip = Math.random();
        const averageRate =
          tip < 0.3
            ? minRate
            : tip > 0.7
            ? maxRate
            : ((rate1 + rate2) / 2).toFixed(minRate < 1 || maxRate < 1 ? 2 : 0);

        result.push({
          title: item.title
            ? item.title
            : `${source.toUpperCase()}/${target.toUpperCase()}`,
          rate: addComma(averageRate),
          min_rate: addComma(minRate),
          max_rate: addComma(maxRate),
          source: item.source,
          target: item.target,
        });
      } else {
        const rate = +item.rate;
        const averageRate = rate;

        result.push({
          title: item.title,
          rate: addComma(averageRate),
          min_rate: addComma(rate),
          max_rate: addComma(rate),
          source: item.source,
          target: item.target,
        });

        seen.add(item.slug);
      }
    });

    return result;
  }
  useEffect(() => {
    if (data && data.watch_list) {
      const a = processCurrencyPairs(data.watch_list);

      if (platform === "ios") {
        set_watch_list_data(a.filter((e) => !e.title.includes("IRR")));
      } else {
        set_watch_list_data(a);
      }
    } else {
      set_watch_list_data([]);
    }
  }, [data, rateIsReversed]);

  useEffect(() => {
    if (data && data.watch_list && data.watch_list[0]) {
      setSource(data.watch_list[0].source);
      setTarget(data.watch_list[0].target);
    }
  }, [data]);

  return (
    <div className="px-6 py-5 h-full flex flex-col ">
      <div className="flex flex-row gap-x-2 justify-start">
        <h1
          className={`font-${font}-bold text-2xl text-${oppositeTheme} ${
            font === "Fa" || font === "Ar" ? "-mt-2" : ""
          }`}
        >
          {lang["watch-list-label"]}
        </h1>
        <button
          onClick={() => openTutorialModal()}
          className="w-fit text-blue text-2xl -mt-3"
        >
          ?
        </button>
      </div>
      <div className={`flex-1 mt-2 pr-0 md:pr-4 overflow-y-scroll`}>
        <div className="min-w-[20rem] h-full">
          <CustomTable
            heads={head}
            rows={watch_list_data.map(({ source, target, ...rest }) => rest)}
            selectRow={(row, index) => {
              if (watch_list_data) {
                setSource(watch_list_data[index].source);
                setTarget(watch_list_data[index].target);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
