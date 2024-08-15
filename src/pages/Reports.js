import React, { useEffect, useState } from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import ExchangeHistory from "../components/pages/layout/Reports/ExchangeHistory";
import DepositHistory from "../components/pages/layout/Reports/DepositHistory";
import WithdrawalHistory from "../components/pages/layout/Reports/WithdrawalHistory";
import TransferHistory from "../components/pages/layout/Reports/TransferHistory";
import { useTokenState } from "../Providers/TokenProvider";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useGetTop5Report } from "../apis/pages/Reports/hooks";
import { useFontState } from "../Providers/FontProvider";
import { useLanguageState } from "../Providers/LanguageProvider";

export default function Reports() {
  const theme = useThemeState();
  const font = useFontState();
  const lang = useLanguageState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const token = useTokenState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const { getTop5Report, isLoading: getTop5ReportIsLoading } =
    useGetTop5Report();
  useEffect(
    () => setIsLoadingSplashScreen(getTop5ReportIsLoading),
    [getTop5ReportIsLoading]
  );

  const [report, setReport] = useState([]);
  useEffect(() => {
    getTop5Report(token, {}, setReport);
  }, []);

  const depositData = report.deposit || [];
  const transferData = report.transfer || [];
  const withdrawalData = report.withdrawal || [];
  const exchangeData = report.exchange || [];

  return (
    <div className="absolute w-full h-full overflow-y-auto pl-8 pr-8 md:pl-0 md:pr-6 pb-20 md:pb-0">
      <div
        className={`w-full bg-${theme} shadow-${theme} rounded-2xl flex justify-center md:hidden pt-5 pb-2.5 px-5 mt-2 mb-8`}
      >
        <span
          className={`text-2xl md:hidden text-${oppositeTheme} font-${font}-bold`}
        >
          {lang["reports"]}
        </span>
      </div>
      <div className="md:mt-0 grid grid-cols-12 grid-rows-2 md:gap-x-10 gap-y-7 pb-16">
        <div
          className={`h-72 col-span-12 xl:col-span-4 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none xl:rounded-3xl py-5 px-7`}
        >
          <ExchangeHistory data={exchangeData} />
        </div>
        <div
          className={`h-72 col-span-12 xl:col-span-8 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none py-5 px-7`}
        >
          <DepositHistory data={depositData} />
        </div>
        <div
          className={`h-72 col-span-12 xl:col-span-8 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none xl:rounded-3xl py-5 px-7`}
        >
          <WithdrawalHistory data={withdrawalData} />
        </div>
        <div
          className={`h-72 col-span-12 xl:col-span-4 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none py-5 px-7`}
        >
          <TransferHistory data={transferData} />
        </div>
      </div>
    </div>
  );
}
