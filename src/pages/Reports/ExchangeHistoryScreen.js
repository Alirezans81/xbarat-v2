import React, { useEffect, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import Filters from "../../components/pages/layout/Reports/pages/ExchangeHistoryScreen/Filters";
import Cards from "../../components/pages/layout/Reports/pages/ExchangeHistoryScreen/Cards";
import { useGetExchangeHistory } from "../../apis/pages/Reports/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import SubmitButton from "../../components/common/SubmitButton";

export default function ExchangeHistoryScreen() {
  const theme = useThemeState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const { one: oneDirection } = useDirectionState();
  const [temp, setTemp] = useState("");
  const [cards, setCards] = useState(true);
  const [exchange, setExchange] = useState("");
  const [nextDataUrl, setNextDataUrl] = useState();
  const [previousDataUrl, setPreviousDataUrl] = useState();
  const [filterCards, setFilterCards] = useState("");
  const { getExchangeHistory, isLoading: getExchangeHistoryIsLoading } =
    useGetExchangeHistory();
  useEffect(
    () => setIsLoadingSplashScreen(getExchangeHistoryIsLoading),
    [getExchangeHistoryIsLoading]
  );
  useEffect(() => {
    getExchangeHistory(setTemp, null, setNextDataUrl, setPreviousDataUrl);
  }, []);

  function findIntersection(array1, array2, array3) {
    const set1 = new Set(array1.map((obj) => JSON.stringify(obj)));
    const set2 = new Set(array2.map((obj) => JSON.stringify(obj)));
    const set3 = new Set(array3.map((obj) => JSON.stringify(obj)));

    const intersection = [...set1].filter(
      (objStr) => set2.has(objStr) && set3.has(objStr)
    );

    return intersection.map((objStr) => JSON.parse(objStr));
  }
  useEffect(() => {
    if (filterCards && !filterCards.clear) {
      let source_currency = temp;
      let target_currency = temp;
      console.log(filterCards);
      let TimeRange = temp;

      if (filterCards.source_currency) {
        source_currency = temp.filter(
          (data) =>
            data.currency_source_abb ===
            filterCards.source_currency.abbreviation
        );
      }
      if (filterCards.target_currency) {
        target_currency = temp.filter(
          (data) =>
            data.currency_destination_abb ===
            filterCards.target_currency.abbreviation
        );
      }
      if (filterCards.range) {
        const start = filterCards.range.startDate.getTime();
        const end = filterCards.range.endDate.getTime();
        TimeRange = temp.filter(
          (data) =>
            (new Date(data.datetime_create).getTime() >= start) &
            (new Date(data.datetime_create).getTime() <= end)
        );
      }
      const intersection = findIntersection(
        target_currency,
        source_currency,
        TimeRange
      );
      setExchange(intersection);
    }
    if (filterCards && filterCards.clear) {
      setExchange(temp);
    }
  }, [filterCards]);

  useEffect(() => {
    if (temp) {
      setExchange(temp);
    }
  }, [temp]);

  return (
    <>
      <div className="grid md:hidden w-full h-full grid-cols-5 grid-rows-1 gap-10 px-8 py-2">
        <div
          className={
            !cards
              ? `col-span-5 row-span-1 bg-${theme} rounded-3xl py-5 px-7 h-full`
              : "hidden"
          }
        >
          <div className="w-full h-10 flex justify-end items-center rounded-3xl">
            <SubmitButton
              onClick={() => setCards(true)}
              className={" mr-2 w-1/4 h-full"}
              rounded={"full"}
            >
              Close Filters
            </SubmitButton>
          </div>
          <div className="w-full h-full mt-3 ">
            <Filters setFilterCards={setFilterCards} />
          </div>
        </div>

        <div
          className={
            cards
              ? `col-span-5 row-span-1 bg-${theme} rounded-${oneDirection}-3xl py-5 pl-7 pr-4 flex flex-col rounded-3xl `
              : "hidden"
          }
        >
          <div className="h-10 w-full flex justify-end items-center rounded-3xl">
            <SubmitButton
              onClick={() => setCards(false)}
              className={" mr-5 w-1/4 h-full"}
              rounded={"full"}
            >
              Open Filters
            </SubmitButton>
          </div>
          <div className="overflow-y-auto h-full pr-3 mt-3 w-full">
            <Cards data={exchange} />
          </div>
        </div>
      </div>

      <div className="hidden md:grid w-full h-full  grid-cols-5 grid-rows-1 gap-10">
        <div
          className={`md:col-span-2 lg:col-span-1 row-span-1 bg-${theme} rounded-3xl py-5 px-7`}
        >
          <Filters setFilterCards={setFilterCards} />
        </div>

        <div
          className={`lg:col-span-4 md:col-span-3 row-span-1 bg-${theme} rounded-${oneDirection}-3xl py-5 pl-7 pr-4`}
        >
          <div className="overflow-y-auto h-full pr-3">
            <Cards data={exchange} />
          </div>
        </div>
      </div>
    </>
  );
}
