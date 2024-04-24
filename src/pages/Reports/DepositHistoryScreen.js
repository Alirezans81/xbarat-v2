import React, { useState, useEffect } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import Filters from "../../components/pages/layout/Reports/pages/DepositHistoryScreen/Filters";
import Cards from "../../components/pages/layout/Reports/pages/DepositHistoryScreen/Cards";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useGetDepositHistorySingleUser } from "../../apis/pages/Reports/hooks";
import SubmitButton from "../../components/common/SubmitButton";
import CustomPagination from "../../components/common/CustomPagination";
import { useLanguageState } from "../../Providers/LanguageProvider";
export default function DepositHistoryScreen() {
  const limit = require("../../apis/pagination/limit.json");
  const theme = useThemeState();
  const lang = useLanguageState();

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const { one: oneDirection } = useDirectionState();
  const [temp, setTemp] = useState("");
  const [cards, setCards] = useState(true);
  const [status, setStatus] = useState("");
  const [deposits, setDeposits] = useState("");
  const [nextDataUrl, setNextDataUrl] = useState();
  const [previousDataUrl, setPreviousDataUrl] = useState();
  const [offset, setOffset] = useState(0);
  const [dataCount, setDataCount] = useState("");
  const [filterCards, setFilterCards] = useState("");
  const {
    getDepositHistorySingleUser,
    isLoading: getDepositHistorySingleUserIsLoading,
  } = useGetDepositHistorySingleUser();
  useEffect(
    () => setIsLoadingSplashScreen(getDepositHistorySingleUserIsLoading),
    [getDepositHistorySingleUserIsLoading]
  );

  useEffect(() => {
    getDepositHistorySingleUser(
      setTemp,
      setDataCount,
      setPreviousDataUrl,
      setNextDataUrl,
      offset
    );
  }, [offset]);

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
      let statusFilter = temp;
      let currency = temp;
      let TimeRange = temp;
      if (filterCards.status) {
        statusFilter = temp.filter(
          (data) => data.status_title === filterCards.status.title
        );
      }
      if (filterCards.currency) {
        currency = temp.filter(
          (data) => data.currency_abb === filterCards.currency.abbreviation
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
      console.log(statusFilter, currency, TimeRange);
      const intersection = findIntersection(statusFilter, currency, TimeRange);
      console.log(intersection);
      setDeposits(intersection);
    }
    if (filterCards && filterCards.clear) {
      setDeposits(temp);
    }
  }, [filterCards]);

  useEffect(() => {
    if (temp) {
      setDeposits(temp);
    }
  }, [temp]);
  return (
    <>
      {/* mobile phone */}
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
              className={"mr-0 px-5 h-full"}
              rounded={"full"}
            >
              {lang["close_filters"]}
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
              className={"mr-[22px] px-5 py-1 h-full"}
              rounded={"full"}
            >
              {lang["open_filters"]}
            </SubmitButton>
          </div>
          <div className="w-full h-full flex flex-col gap-y-4 pb-12 items-center">
            <div className="flex-1 overflow-y-auto h-full pr-3 mt-3 w-full">
              <Cards data={deposits} />
            </div>
            <div
              className={dataCount > limit["deposit"] ? `w-fit z-10` : "hidden"}
            >
              {" "}
              <CustomPagination
                totalPages={Math.ceil(dataCount / limit["deposit"])}
                itemsPerPage={limit["deposit"]}
                setOffset={setOffset}
              />
            </div>
          </div>
        </div>
      </div>

      {/* tablet & laptop */}
      <div className="hidden md:grid w-full h-full  grid-cols-5 grid-rows-1 gap-10">
        <div
          className={`md:col-span-2 lg:col-span-1 row-span-1 bg-${theme} rounded-3xl py-5 px-7`}
        >
          <Filters setFilterCards={setFilterCards} />
        </div>

        <div
          className={`flex flex-col gap-y-4 lg:col-span-4 md:col-span-3 row-span-1 bg-${theme} rounded-${oneDirection}-3xl py-5 pl-7 pr-4`}
        >
          <div className="flex-1 overflow-y-auto pr-3">
            <Cards data={deposits} />
          </div>
          <div
            className={
              dataCount > limit["deposit"]
                ? `w-full flex items-center justify-center z-10`
                : "hidden"
            }
          >
            <CustomPagination
              totalPages={Math.ceil(dataCount / limit["deposit"])}
              itemsPerPage={limit["deposit"]}
              setOffset={setOffset}
            />
          </div>
        </div>
      </div>
    </>
  );
}
