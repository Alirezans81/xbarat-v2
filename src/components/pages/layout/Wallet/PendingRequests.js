import React, { useEffect, useState } from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import FilterButtons from "./PendingRequests/FilterButtons";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import CustomSlider from "../../../common/CustomSlider";
import RequestCard from "./PendingRequests/RequestCard";

export default function PendingRequests() {
  const lang = useLanguageState();
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

  const [allPendingOrders, setAllPendingOrders] = useState([
    {
      type: "deposit",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "uploadDocument",
      date: "2022 Feb 13  15:55",
    },
    {
      type: "deposit",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "new",
      date: "2022 Feb 13  15:55",
    },
    {
      type: "withdrawal",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "reject",
      date: "2022 Feb 13  15:55",
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
    {
      type: "transfer",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "adminAssign",
      date: "2022 Feb 13  15:55",
    },
    {
      type: "transfer",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "adminApprove",
      date: "2022 Feb 13  15:55",
    },
  ]);

  const [pendingOrders, setPendingOrders] = useState(allPendingOrders);
  useEffect(() => {
    if (showOrdersType === "deposit") {
      setPendingOrders(
        allPendingOrders.filter((order) => order.type === "deposit")
      );
    } else if (showOrdersType === "withdrawal") {
      setPendingOrders(
        allPendingOrders.filter((order) => order.type === "withdrawal")
      );
    } else if (showOrdersType === "transfer") {
      setPendingOrders(
        allPendingOrders.filter((order) => order.type === "transfer")
      );
    } else {
      setPendingOrders(allPendingOrders);
    }
  }, [showOrdersType]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row w-full justify-between items-center">
        <span className={`font-mine-bold text-${oppositeTheme} text-2xl`}>
          {lang["pending-requests"]}
        </span>
        <FilterButtons
          showOrdersType={showOrdersType}
          toggleShowDepositOrders={toggleShowDepositOrders}
          toggleShowWithdrawalOrders={toggleShowWithdrawalOrders}
          toggleShowTransferOrders={toggleShowTransferOrders}
        />
      </div>
      <div className="flex-1 mt-3 px-7 relative">
        {pendingOrders.length !== 0 ? (
          <CustomSlider slidesToShow={4} slidesToScroll={4}>
            {pendingOrders.map((pendingOrder, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full px-4"
              >
                <RequestCard pendingOrder={pendingOrder} />
              </div>
            ))}
          </CustomSlider>
        ) : (
          <div className="absolute left-0 h-full w-full -mt-4 top-0 flex justify-center items-center">
            <span className={`font-mine-thin text-3xl text-${oppositeTheme}`}>
              {lang["no-data"]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
