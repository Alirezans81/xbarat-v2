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
import { useModalDataSetState } from "../Providers/ModalDataProvider";
import { useUserState } from "../Providers/UserProvider";
import SecurityGuidline from "../components/modals/SecurityGuidline";
import { useWalletState } from "../Providers/WalletProvider";
// import { useLocation, useNavigation } from "react-router-dom";
// import { useModalDataSetState } from "../Providers/ModalDataProvider";
// import TransactionModal from "../components/modals/TransactionModal";
import Joyride from "react-joyride";
import CustomBeacon from "../components/common/Tour/CustomBeacon";
import CustomTooltip from "../components/common/Tour/CustomTooltip";
export default function Wallet() {
  const theme = useThemeState();
  const setModalData = useModalDataSetState();
  const user = useUserState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const token = useTokenState();
  const wallet = useWalletState();
  const [runTour, setRunTour] = useState(true);

  // const setModalData = useModalDataSetState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  // const location = useLocation();

  // const openTransactionModal = (defaultType, refreshPendingRequests) => {
  //   setModalData({
  //     title: lang["transaction"],
  //     children: <TransactionModal />,
  //     props: {
  //       defaultType,
  //       refreshPendingRequests,
  //     },
  //     canClose: true,
  //     isOpen: true,
  //   });
  // };

  // useEffect(() => {
  //   const selectedCurrency = location.state && location.state.selectedCurrency
  //     ? location.state.selectedCurrency
  //     : null;
  //   selectedCurrency && openTransactionModal("deposit", refreshPendingRequests);
  // }, []);

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
  const securityGuidlineModal = () => {
    setModalData({
      title:
        font !== "Fa"
          ? lang["important-note"] + "❗❗❗"
          : "❗❗❗" + lang["important-note"],
      children: <SecurityGuidline />,
      canClose: false,
      isOpen: true,
    });
  };
  useEffect(() => {
    if (user && !localStorage.getItem("read_guidline")) {
      securityGuidlineModal();
    }
  }, [user]);
  const steps = [
    {
      target: ".quick-deposit-component",
      content: lang["quick-deposit-component-tour"],
      placement: "bottom",
    },
    {
      target: ".last-deposit-component",
      content: lang["last-deposit-component-tour"],
      placement: "top",
    },
    {
      target: ".balance-component",
      content: lang["balance-component-tour"],
      placement: "top",
    },
    {
      target: ".pending-requests-component",
      content: lang["pending-requests-component-tour"],
      placement: "top",
    },
  ];
  return (
    <>
      <button
        onClick={() => setRunTour(true)}
        className={`${
          runTour ? "hidden" : ""
        } font-${font}-regular fixed top-24 right-6 bg-blue  text-white px-4 pb-1 pt-2 rounded-full shadow-lg z-[9999]`}
      >
        {lang["start"] + " " + lang["guide"]}
      </button>
      <Joyride
        steps={steps}
        key={runTour}
        run={runTour}
        beaconComponent={CustomBeacon}
        locale={{
          back: lang["back"],
          close: lang["close"],
          last: lang["last"],
          next: lang["next"],
          nextLabelWithProgress: `${lang["next"]} (${lang["step"]} {step} ${lang["of"]} {steps})`,
          open: lang["open"],
          skip: lang["skip"],
        }}
        tooltipComponent={CustomTooltip}
        continuous
        scrollOffset={0}
        hideBackButton={true}
        hideCloseButton={true}
        showSkipButton={false}
        showProgress={true}
        styles={{
          beaconInner: { borderRadius: "50px" },
          options: {
            zIndex: 10000,
            arrowColor: theme === "dark" ? "#152831" : "#FFFFFF",
            backgroundColor: theme === "dark" ? "#152831" : "#FFFFFF",
            textColor: theme === "dark" ? "#FFFFFF" : "#2A2B2E",
            primaryColor: "#0A8DFF",
          },
        }}
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setRunTour(false);
          }
        }}
      />
      <div className="absolute w-full h-full overflow-y-auto pl-8 pr-8 md:pl-0 md:pr-6 pb-20 md:pb-0">
        <div
          className={`w-full bg-${theme} shadow-${theme} rounded-2xl flex justify-center md:hidden pt-5 pb-2.5 px-5 mt-2`}
        >
          <span
            className={`text-2xl md:hidden text-${oppositeTheme} font-${font}-bold`}
          >
            {lang["wallet"]}
          </span>
        </div>
        <div className="mt-5 md:mt-0 grid grid-cols-12 grid-rows-6 md:gap-x-10 gap-y-7 pb-16">
          <div
            className={`h-72 col-span-12 md:col-span-3 flex md:hidden xl:flex row-span-3 flex-col gap-y-4 bg-${theme} p-5 rounded-3xl`}
          >
            <div className={`flex-1 quick-deposit-component`}>
              <QuickDeposit refreshPendingRequests={refreshPendingRequests} />
            </div>
            <div className={`flex-1 last-deposit-component`}>
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
            className={`h-72 col-span-12 xl:col-span-9 row-span-3 bg-${theme} p-5 rounded-3xl md:rounded-r-none balance-component`}
          >
            <Balance refreshPendingRequests={refreshPendingRequests} />
          </div>
          <div
            className={`-mt-3 md:-mt-0 h-72 col-span-12 row-span-3 bg-${theme} p-5 rounded-3xl md:rounded-r-none pb-10 pending-requests-component`}
          >
            <PendingRequests
              refreshPendingRequests={refreshPendingRequests}
              pendingRequests={pendingRequests}
            />
          </div>
        </div>
      </div>
    </>
  );
}
