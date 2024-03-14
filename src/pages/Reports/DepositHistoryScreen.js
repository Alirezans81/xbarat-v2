import React, { useState, useEffect } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import Filters from "../../components/pages/layout/Reports/pages/DepositHistoryScreen/Filters";
import Cards from "../../components/pages/layout/Reports/pages/DepositHistoryScreen/Cards";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useGetDepositHistory } from "../../apis/pages/Reports/hooks";
import { useUserState } from "../../Providers/UserProvider";
export default function DepositHistoryScreen() {
  const theme = useThemeState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const user = useUserState();
  const { one: oneDirection } = useDirectionState();
  const [selectionRange, setSelectionRange] = useState();
  const [temp, setTemp] = useState("");
  const [deposits, setDeposits] = useState("");
  const [nextDataUrl, setNextDataUrl] = useState();
  const [previousDataUrl, setPreviousDataUrl] = useState();

  const { getDepositHistory, isLoading: getDepositHistoryIsLoading } =
    useGetDepositHistory();
  useEffect(
    () => setIsLoadingSplashScreen(getDepositHistoryIsLoading),
    [getDepositHistoryIsLoading]
  );

  useEffect(() => {
    getDepositHistory(setTemp, null, setNextDataUrl, setPreviousDataUrl);
  }, []);
  useEffect(() => {
    if (temp) {
      setDeposits(temp.filter((data) => data.user_sender === user.url));
    }
  }, [temp]);
  console.log(temp);
  return (
    <div className="w-full h-full grid grid-cols-5 grid-rows-1 gap-10">
      <div
        className={`col-span-1 row-span-1 bg-${theme} rounded-3xl py-5 px-7`}
      >
        <Filters
          selectionRange={selectionRange}
          setSelectionRange={setSelectionRange}
        />
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
