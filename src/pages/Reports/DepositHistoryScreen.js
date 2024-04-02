import React, { useState, useEffect } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import Filters from "../../components/pages/layout/Reports/pages/DepositHistoryScreen/Filters";
import Cards from "../../components/pages/layout/Reports/pages/DepositHistoryScreen/Cards";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useGetStatuses } from "../../apis/common/status/hooks";
import { useGetDepositHistorySingleUser } from "../../apis/pages/Reports/hooks";
import { useUserState } from "../../Providers/UserProvider";
export default function DepositHistoryScreen() {
  const theme = useThemeState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const user = useUserState();
  const { one: oneDirection } = useDirectionState();
  const [temp, setTemp] = useState("");
  const [status, setStatus] = useState("");
  const [deposits, setDeposits] = useState("");
  const [nextDataUrl, setNextDataUrl] = useState();
  const [previousDataUrl, setPreviousDataUrl] = useState();
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
      null,
      setNextDataUrl,
      setPreviousDataUrl
    );
  }, []);

  const { getStatuses, isLoading: getStatusesIsLoading } = useGetStatuses();
  useEffect(
    () => setIsLoadingSplashScreen(getStatusesIsLoading),
    [getStatusesIsLoading]
  );
  useEffect(() => {
    getStatuses(setStatus);
  }, []);

  useEffect(() => {
    if (filterCards && !filterCards.clear) {
      if (filterCards.status) {
        const statusFilter = deposits.filter(
          (data) => data.status_title === filterCards.status.title
        );
        setDeposits(statusFilter);
      }
      if (filterCards.currency) {
        const currency = deposits.filter(
          (data) => data.currency_abb === filterCards.currency.abbreviation
        );
        setDeposits(currency);
      }
      if (filterCards.sourceAmount) {
        const source = deposits.filter(
          (data) => parseInt(data.amount) >= parseInt(filterCards.sourceAmount)
        );
        setDeposits(source);
      }
      if (filterCards.sourceAmount) {
        const target = deposits.filter(
          (data) => parseInt(data.amount) <= parseInt(filterCards.targetAmount)
        );
        setDeposits(target);
      }
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
    <div className="w-full h-full grid grid-cols-5 grid-rows-1 gap-10">
      <div
        className={`col-span-1 row-span-1 bg-${theme} rounded-3xl py-5 px-7`}
      >
        <Filters status={status} setFilterCards={setFilterCards} />
      </div>

      <div
        className={`col-span-4 row-span-1 bg-${theme} rounded-${oneDirection}-3xl py-5 pl-7 pr-4 `}
      >
        <div className="overflow-y-auto h-full pr-3">
          <Cards data={deposits} />
        </div>
      </div>
    </div>
  );
}
