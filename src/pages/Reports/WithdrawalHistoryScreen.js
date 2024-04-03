import React, { useState, useEffect } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import Filters from "../../components/pages/layout/Reports/pages/WithdrawalHistoryScreen/Filters";
import Cards from "../../components/pages/layout/Reports/pages/WithdrawalHistoryScreen/Cards";
import { useGetWithdrawHistorySingleUser } from "../../apis/pages/Reports/hooks";
export default function WithdrawalHistoryScreen() {
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();

  const [selectionRange, setSelectionRange] = useState();
  const [temp, setTemp] = useState("");
  const [nextDataUrl, setNextDataUrl] = useState();
  const [filterCards, setFilterCards] = useState("");

  const [withdraw, setWithdraw] = useState("");

  const [previousDataUrl, setPreviousDataUrl] = useState();
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
      null,
      setNextDataUrl,
      setPreviousDataUrl
    );
  }, []);

  useEffect(() => {
    if (temp) setWithdraw(temp);
  }, [filterCards]);
  useEffect(() => {
    if (filterCards && !filterCards.clear) {
      if (filterCards.status) {
        const statusFilter = withdraw.filter(
          (data) => data.status_title === filterCards.status.title
        );
        setWithdraw(statusFilter);
      }
      if (filterCards.currency) {
        const currency = withdraw.filter(
          (data) => data.currency_abb === filterCards.currency.abbreviation
        );
        setWithdraw(currency);
      }
      if (filterCards.sourcAmount) {
        const source = withdraw.filter(
          (data) => parseInt(data.amount) <= parseInt(filterCards.sourceAmount)
        );
        console.log(source);
        setWithdraw(source);
      }
    }
  }, [withdraw]);
  useEffect(() => {
    if (temp) {
      setWithdraw(temp);
    }
  }, [temp]);
  return (
    <div className="w-full h-full grid grid-cols-5 grid-rows-1 gap-10">
      <div
        className={`col-span-1 row-span-1 bg-${theme} rounded-3xl py-5 px-7`}
      >
        <Filters setFilterCards={setFilterCards} />
      </div>

      <div
        className={`col-span-4 row-span-1 bg-${theme} rounded-${oneDirection}-3xl py-5 pl-7 pr-4 `}
      >
        <div className="overflow-y-auto h-full pr-3">
          <Cards data={withdraw} />
        </div>
      </div>
    </div>
  );
}
