import React, { useEffect, useState } from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import QuickDeposit from "../components/pages/layout/Wallet/QuickDeposit";
import LastDeposit from "../components/pages/layout/Wallet/LastDeposit";
import Balance from "../components/pages/layout/Wallet/Balance";
import PendingRequests from "../components/pages/layout/Wallet/PendingRequests";
import { useGetPendingRequests } from "../apis/pages/Wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useTokenState } from "../Providers/TokenProvider";

export default function Wallet() {
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();
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
    <div className="h-full w-full grid grid-cols-12 grid-rows-6 gap-x-10 gap-y-7">
      <div
        className={`col-span-3 row-span-3 flex flex-col gap-y-4 bg-${theme} p-5 rounded-3xl`}
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
        className={`col-span-9 row-span-3 bg-${theme} p-5 rounded-${oneDirection}-3xl`}
      >
        <Balance refreshPendingRequests={refreshPendingRequests} />
      </div>
      <div
        className={`col-span-12 row-span-3 bg-${theme} p-5 rounded-${oneDirection}-3xl`}
      >
        <PendingRequests
          refreshPendingRequests={refreshPendingRequests}
          pendingRequests={pendingRequests}
        />
      </div>
    </div>
  );
}
