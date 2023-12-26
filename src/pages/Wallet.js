import React, { useEffect, useState } from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import QuickDeposit from "../components/pages/layout/Wallet/QuickDeposit";
import LastDeposit from "../components/pages/layout/Wallet/LastDeposit";
import Balance from "../components/pages/layout/Wallet/Balance";
import PendingRequests from "../components/pages/layout/Wallet/PendingRequests";
import { useGetPendingRequests } from "../apis/pages/Wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useTokenState } from "../Providers/TokenProvider";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useFontState } from "../Providers/FontProvider";

export default function Wallet() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const token = useTokenState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const { getPendingRequests, isLoading: getPendingRequestsIsLoading } =
    useGetPendingRequests();
  useEffect(
    () => setIsLoadingSplashScreen(getPendingRequestsIsLoading),
    [getPendingRequestsIsLoading]
  );

  const [pendingRequests, setPendingRequests] = useState([]);
  const refreshPendingRequests = () => {
    getPendingRequests(token, setPendingRequests);
  };

  useEffect(() => {
    refreshPendingRequests();
  }, []);

  return (
    <div className="absolute w-full h-full overflow-y-auto pl-8 pr-8 md:pl-0 md:pr-6">
      <div
        className={`w-full bg-${theme} shadow-${theme} rounded-2xl flex justify-center md:hidden pt-5 pb-2.5 px-5 mt-2`}
      >
        <span
          className={`text-2xl md:hidden text-${oppositeTheme} font-${font}-bold`}
        >
          {lang["wallet"]}
        </span>
      </div>
      <div className="mt-5 md:mt-0 grid grid-cols-12 grid-rows-6 md:gap-x-10 gap-y-7 pb-36 md:pb-16">
        <div
          className={`h-72 col-span-12 md:col-span-3 flex md:hidden xl:flex row-span-3 flex-col gap-y-4 bg-${theme} p-5 rounded-3xl`}
        >
          <div className={`flex-1`}>
            <QuickDeposit refreshPendingRequests={refreshPendingRequests} />
          </div>
          <div className={`flex-1`}>
            <LastDeposit
              refreshPendingRequests={refreshPendingRequests}
              lastDeposit={
                pendingRequests &&
                pendingRequests.deposit &&
                pendingRequests.deposit[0]
                  ? pendingRequests.deposit[0]
                  : null
              }
            />
          </div>
        </div>
        <div
          className={`h-72 col-span-12 xl:col-span-9 row-span-3 bg-${theme} p-5 rounded-3xl md:rounded-r-none`}
        >
          <Balance refreshPendingRequests={refreshPendingRequests} />
        </div>
        <div
          className={`-mt-3 md:-mt-0 h-auto md:h-72 col-span-12 row-span-3 bg-${theme} p-5 rounded-3xl md:rounded-r-none pb-10`}
        >
          <PendingRequests
            refreshPendingRequests={refreshPendingRequests}
            pendingRequests={pendingRequests}
          />
        </div>
      </div>
    </div>
  );
}
