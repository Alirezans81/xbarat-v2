import React, { useEffect, useState } from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import FilterButtons from "./PendingRequests/FilterButtons";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import CustomSlider from "../../../common/CustomSlider";
import RequestCard from "./PendingRequests/RequestCard";
import { useFontState } from "../../../../Providers/FontProvider";
import { useSortByCreateDate } from "../../../../hooks/useConvertDateTime";

export default function PendingRequests({
  refreshPendingRequests,
  pendingRequests: allPendingOrders,
}) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [showOrdersType, setShowOrdersType] = useState("");
  const toggleShowDepositOrders = () => {
    setShowOrdersType(showOrdersType !== "deposit" ? "deposit" : "");
  };
  const toggleShowWithdrawalOrders = () => {
    setShowOrdersType(showOrdersType !== "withdrawal" ? "withdrawal" : "");
  };
  const toggleShowTransferOrders = () => {
    setShowOrdersType(showOrdersType !== "transfer" ? "transfer" : "");
  };

  const getQuantityOfCards = () => {
    if (window.innerWidth >= 1280) {
      return 4;
    } else if (window.innerWidth >= 1024) {
      return 3;
    } else if (window.innerWidth >= 768) {
      return 2;
    } else if (window.innerWidth >= 640) {
      return 2;
    } else {
      return 1;
    }
  };

  const sortByCreateDate = useSortByCreateDate();
  const resetPending = () => {
    if (
      allPendingOrders &&
      allPendingOrders.deposit &&
      allPendingOrders.withdrawal &&
      allPendingOrders.transfer
    ) {
      const convertedDeposits = allPendingOrders.deposit.map((deposit) => {
        deposit.type = "deposit";
        return deposit;
      });
      const convertedWithdrawals = allPendingOrders.withdrawal.map(
        (withdrawal) => {
          withdrawal.type = "withdrawal";
          return withdrawal;
        }
      );
      const convertedTransfers = allPendingOrders.transfer.map((transfer) => {
        transfer.type = "transfer";
        return transfer;
      });

      const temp = [
        ...convertedDeposits,
        ...convertedWithdrawals,
        ...convertedTransfers,
      ];

      setPendingOrders(temp.sort(sortByCreateDate));
    }
  };

  const [pendingOrders, setPendingOrders] = useState([]);
  useEffect(() => {
    setShowOrdersType("");
    resetPending();
  }, [allPendingOrders]);

  useEffect(() => {
    if (
      allPendingOrders &&
      allPendingOrders.deposit &&
      allPendingOrders.withdrawal &&
      allPendingOrders.transfer
    ) {
      if (showOrdersType === "deposit") {
        setPendingOrders(allPendingOrders.deposit);
      } else if (showOrdersType === "withdrawal") {
        setPendingOrders(allPendingOrders.withdrawal);
      } else if (showOrdersType === "transfer") {
        setPendingOrders(allPendingOrders.transfer);
      } else resetPending();
    }
  }, [showOrdersType]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row w-full gap-y-0.5 justify-between md:items-center">
        <span className={`font-${font}-bold text-${oppositeTheme} text-2xl`}>
          {lang["pending-requests"]}
        </span>
        {allPendingOrders && allPendingOrders.length !== 0 && (
          <div className="w-full md:w-auto">
            <FilterButtons
              showOrdersType={showOrdersType}
              toggleShowDepositOrders={toggleShowDepositOrders}
              toggleShowWithdrawalOrders={toggleShowWithdrawalOrders}
              toggleShowTransferOrders={toggleShowTransferOrders}
            />
          </div>
        )}
      </div>
      <div className="flex-1 mt-3 px-7 relative">
        {pendingOrders.length !== 0 ? (
          <CustomSlider
            slidesToShow={getQuantityOfCards()}
            slidesToScroll={getQuantityOfCards()}
          >
            {pendingOrders.map((pendingOrder, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full px-4"
              >
                <RequestCard
                  refreshPendingRequests={refreshPendingRequests}
                  pendingOrder={pendingOrder}
                />
              </div>
            ))}
          </CustomSlider>
        ) : (
          <div className="absolute left-0 h-full w-full mt-5 md:-mt-4 top-0 flex justify-center items-center">
            <span
              className={`font-${font}-thin text-3xl text-${oppositeTheme}`}
            >
              {lang["no-data"]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
