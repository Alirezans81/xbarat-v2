import React, { useEffect, useState } from "react";
import CustomSlider from "../../../common/CustomSlider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import PendingOrderCard from "./PendingOrders/PendingOrderCard";
import FilterButtons from "./PendingOrders/FilterButtons";

export default function PendingOrders() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [showOrdersType, setShowOrdersType] = useState("");
  const toggleShowOpenOrders = () => {
    setShowOrdersType(showOrdersType !== "open" ? "open" : "");
  };
  const toggleShowDoneOrders = () => {
    setShowOrdersType(showOrdersType !== "done" ? "done" : "");
  };
  const toggleShowTodayOrders = () => {
    setShowOrdersType(showOrdersType !== "today" ? "today" : "");
  };

  const [allPendingOrders, setAllPendingOrders] = useState([
    {
      currencyPair: {
        source: { title: "USD" },
        target: { title: "IRR" },
        defaultRateType: "USD/IRR",
      },
      amount: 1000,
      targetAmount: 15000000,
      rate: 497500,
      date: new Date(),
      status: "open",
    },
    {
      currencyPair: {
        source: { title: "USD" },
        target: { title: "IRR" },
        defaultRateType: "USD/IRR",
      },
      amount: 1000,
      targetAmount: 15000000,
      rate: 497500,
      date: new Date(),
      status: "open",
    },
    {
      currencyPair: {
        source: { title: "USD" },
        target: { title: "EUR" },
        defaultRateType: "USD/EUR",
      },
      amount: 1000,
      targetAmount: 15000000,
      rate: 497500,
      date: new Date(),
      status: "done",
    },
    {
      currencyPair: {
        source: { title: "USD" },
        target: { title: "EUR" },
        defaultRateType: "USD/EUR",
      },
      amount: 1000,
      targetAmount: 15000000,
      rate: 497500,
      date: new Date(),
      status: "done",
    },
    {
      currencyPair: {
        source: { title: "USD" },
        target: { title: "EUR" },
        defaultRateType: "USD/EUR",
      },
      amount: 1000,
      targetAmount: 15000000,
      rate: 497500,
      date: new Date(),
      status: "done",
    },
    {
      currencyPair: {
        source: { title: "USD" },
        target: { title: "EUR" },
        defaultRateType: "USD/EUR",
      },
      amount: 1000,
      targetAmount: 15000000,
      rate: 497500,
      date: new Date(),
      status: "done",
    },
  ]);

  const isToday = (dateToCheck) => {
    // Get today's date
    const today = new Date();

    // Compare the components of the dateToCheck with today's date
    const isSameDate =
      dateToCheck.getDate() === today.getDate() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getFullYear() === today.getFullYear();

    // Return true if the dateToCheck is today, otherwise return false
    return isSameDate;
  };

  useEffect(() => {
    if (showOrdersType === "open") {
      setPendingOrders(
        allPendingOrders.filter((order) => order.status === "open")
      );
    } else if (showOrdersType === "done") {
      setPendingOrders(
        allPendingOrders.filter((order) => order.status === "done")
      );
    } else if (showOrdersType === "today") {
      setPendingOrders(allPendingOrders.filter((order) => isToday(order.date)));
    } else {
      setPendingOrders(allPendingOrders);
    }
  }, [showOrdersType]);

  const [pendingOrders, setPendingOrders] = useState(allPendingOrders);

  return (
    <div className="px-5 py-3 h-full">
      <div className="flex justify-between items-center w-full">
        <span className={`text-2xl text-${oppositeTheme} mx-0.5`}>
          {lang["pending-orders"]}
        </span>
        <FilterButtons
          showOrdersType={showOrdersType}
          toggleShowOpenOrders={toggleShowOpenOrders}
          toggleShowDoneOrders={toggleShowDoneOrders}
          toggleShowTodayOrders={toggleShowTodayOrders}
        />
      </div>
      <div className="mt-3.5 w-full px-7 h-full relative">
        {pendingOrders.length !== 0 ? (
          <CustomSlider slidesToShow={3} slidesToScroll={3}>
            {pendingOrders.map((pendingOrder, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full px-4"
              >
                <PendingOrderCard lang={lang} data={pendingOrder} />
              </div>
            ))}
          </CustomSlider>
        ) : (
          <div className="absolute left-0 h-full w-full -mt-8 top-0 flex justify-center items-center">
            <span className={`font-mine-thin text-3xl text-${oppositeTheme}`}>
              {lang["no-data"]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
