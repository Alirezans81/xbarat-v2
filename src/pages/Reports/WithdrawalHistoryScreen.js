import React, { useState, useEffect } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import Filters from "../../components/pages/layout/Reports/pages/WithdrawalHistoryScreen/Filters";
import Cards from "../../components/pages/layout/Reports/pages/WithdrawalHistoryScreen/Cards";
import { useGetWithdrawHistorySingleUser } from "../../apis/pages/Reports/hooks";
import SubmitButton from "../../components/common/SubmitButton";
import CustomPagination from "../../components/common/CustomPagination";
import { useLanguageState } from "../../Providers/LanguageProvider";
export default function WithdrawalHistoryScreen() {
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const limit = require("../../apis/pagination/limit.json");
  const lang = useLanguageState();
  const [dataCount, setDataCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();

  const [cards, setCards] = useState(true);
  const [status, setStatus] = useState("");
  const [temp, setTemp] = useState("");
  const [filterCards, setFilterCards] = useState("");
  const [withdrawals, setWithdrawals] = useState("");

  const [previousDataUrl, setPreviousDataUrl] = useState("");
  const [nextDataUrl, setNextDataUrl] = useState();

  const {
    getWithdrawHistorySingleUser,
    isLoading: getWithdrawHistorySingleUserIsLoading,
  } = useGetWithdrawHistorySingleUser();
  useEffect(
    () => setIsLoadingSplashScreen(getWithdrawHistorySingleUserIsLoading),
    [getWithdrawHistorySingleUserIsLoading]
  );

  useEffect(() => {
    getWithdrawHistorySingleUser(
      setTemp,
      setDataCount,
      setNextDataUrl,
      setPreviousDataUrl,
      { offset }
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
      const intersection = findIntersection(statusFilter, currency, TimeRange);
      setWithdrawals(intersection);
    }
    if (filterCards && filterCards.clear) {
      setWithdrawals(temp);
    }
  }, [filterCards]);

  useEffect(() => {
    if (temp) {
      setWithdrawals(temp);
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
              <Cards data={withdrawals} />
            </div>
            <div
              className={
                dataCount > limit["withdrawal"] ? `w-fit z-10` : "hidden"
              }
            >
              {" "}
              <CustomPagination
                totalPages={Math.ceil(dataCount / limit["withdrawal"])}
                itemsPerPage={limit["withdrawal"]}
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
            <Cards data={withdrawals} />
            <div
              className={
                dataCount > limit["withdrawal"]
                  ? `w-3/4 h-1/6 fixed bottom-0`
                  : "hidden"
              }
            ></div>
          </div>
          <div
            className={
              dataCount > limit["withdrawal"]
                ? `w-full flex items-center justify-center z-10`
                : "hidden"
            }
          >
            {" "}
            <CustomPagination
              totalPages={Math.ceil(dataCount / limit["withdrawal"])}
              itemsPerPage={limit["withdrawal"]}
              setOffset={setOffset}
            />
          </div>
        </div>
      </div>
    </>
  );
}
