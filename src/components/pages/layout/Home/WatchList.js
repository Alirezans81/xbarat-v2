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
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function WatchList({
  selectedSourceIndex,
  availableTargets,
  findSource,
  findTarget,
  rateIsReversed,
  selectedCurrecnyPair,
}) {
  const lang = useLanguageState();
  const setModalData = useModalDataSetState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setLoading = useIsLoadingSplashScreenSetState();
  const addComma = useAddComma();
  const calculateReverseRate = useCalculateReverseRate();

  const currencies = useCurrenciesState();

  const head = [lang["currency-pair"], lang["rate"], lang["low"], lang["high"]];
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

  const [targetSlug, setTargetSlug] = useState();

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [watch_list_data, set_watch_list_data] = useState([]);
  console.log(head);
  useEffect(() => {
    data && data.watch_list
      ? set_watch_list_data(
          data.watch_list.map((row, index) => {
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
                  +selectedCurrecnyPair.rate_multiplier,
                  +row.floating_number
                )
              );

              temp.min_rate = addComma(
                calculateReverseRate(
                  +row.min_rate,
                  +selectedCurrecnyPair.rate_multiplier,
                  +row.floating_number
                )
              );
              temp.max_rate = addComma(
                calculateReverseRate(
                  +row.max_rate,
                  +selectedCurrecnyPair.rate_multiplier,
                  +row.floating_number
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
            }

            return temp;
          })
        )
      : set_watch_list_data([]);
  }, [data, rateIsReversed]);

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
    if (
      data &&
      data.watch_list &&
      data.watch_list[0] &&
      selectedSourceIndex >= 0
    ) {
      setTargetSlug(data.watch_list[0].target);
    }
  }, [selectedSourceIndex]);

  return (
    <div className="px-6 py-5 h-full flex flex-col ">
      <div className="w-fit h-fit flex flex-row gap-x-2 justify-start">
        <h1 className={`font-${font}-bold text-2xl text-${oppositeTheme}`}>
          {lang["watch-list-label"]}
        </h1>
        <button
          onClick={() => openTutorialModal()}
          className="bg-none text-blue text-2xl w-full h-full -mt-1"
        >
          ?
        </button>
      </div>
      <div className={`flex-1 mt-2 pr-0 md:pr-4 overflow-x-scroll`}>
        <div className="min-w-[20rem] h-full">
          <CustomTable
            heads={head}
            rows={watch_list_data}
            selectRow={(row, index) => {
              if (data && data.watch_list) {
                findSource(data.watch_list[index].source);
                setTargetSlug(data.watch_list[index].target);
                setSelectedIndex(index);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
