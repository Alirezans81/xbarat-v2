import React, { useState,useEffect } from "react";
import TopSection from "./common/TopSection";
import CustomSlider from "../../../common/CustomSlider";
import ExchangeCard from "./ExchangeHistory/ExchangeCard";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useGetExchangeHistory } from "../../../../apis/pages/Reports/hooks";
export default function ExchangeHistory() {
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const lang = useLanguageState();

  const { getExchangeHistory, isLoading: getExchangeHistoryIsLoading } = useGetExchangeHistory();
  useEffect(
    () => setIsLoadingSplashScreen(getExchangeHistoryIsLoading),
    [getExchangeHistoryIsLoading]
  );

  const [exchange, getExchange] = useState([]);
  useEffect(() => {
     getExchangeHistory(getExchange);
  }, []);             // const [datas, setDatas] = useState([
  //   {
  //     currencyPair: {
  //       source: { title: "USD" },
  //       target: { title: "IRR" },
  //       defaultRateType: "USD/IRR",
  //     },
  //     amount: 1000,
  //     targetAmount: 15000000,
  //     rate: 497500,
  //     date: new Date(),
  //     status: "open",
  //   },
  //   {
  //     currencyPair: {
  //       source: { title: "USD" },
  //       target: { title: "IRR" },
  //       defaultRateType: "USD/IRR",
  //     },
  //     amount: 1000,
  //     targetAmount: 15000000,
  //     rate: 497500,
  //     date: new Date(),
  //     status: "open",
  //   },
  //   {
  //     currencyPair: {
  //       source: { title: "USD" },
  //       target: { title: "EUR" },
  //       defaultRateType: "USD/EUR",
  //     },
  //     amount: 1000,
  //     targetAmount: 15000000,
  //     rate: 497500,
  //     date: new Date(),
  //     status: "done",
  //   },
  //   {
  //     currencyPair: {
  //       source: { title: "USD" },
  //       target: { title: "EUR" },
  //       defaultRateType: "USD/EUR",
  //     },
  //     amount: 1000,
  //     targetAmount: 15000000,
  //     rate: 497500,
  //     date: new Date(),
  //     status: "done",
  //   },
  //   {
  //     currencyPair: {
  //       source: { title: "USD" },
  //       target: { title: "EUR" },
  //       defaultRateType: "USD/EUR",
  //     },
  //     amount: 1000,
  //     targetAmount: 15000000,
  //     rate: 497500,
  //     date: new Date(),
  //     status: "done",
  //   },
  //   {
  //     currencyPair: {
  //       source: { title: "USD" },
  //       target: { title: "EUR" },
  //       defaultRateType: "USD/EUR",
  //     },
  //     amount: 1000,
  //     targetAmount: 15000000,
  //     rate: 497500,
  //     date: new Date(),
  //     status: "done",
  //   },
  // ]);

  const getQuantityOfCards = () => {
    if (window.innerWidth >= 1280) {
      return 1;
    } else if (window.innerWidth >= 1024) {
      return 3;
    } else if (window.innerWidth >= 768) {
      return 2;
    } else if (window.innerWidth >= 640) {
      return 1;
    } else {
      return 1;
    }
  };

  return (
    <div className="flex flex-col">
      <TopSection route={"exchange"} />
      <div className="flex-1 px-2 xl:px-8 pt-5">
        <CustomSlider
          infinite
          slidesToShow={getQuantityOfCards()}
          slidesToScroll={getQuantityOfCards()}
        >
          {exchange.map((data, index) => (
            <div className="px-1 xl:px-5" key={index}>
              <ExchangeCard data={data} lang={lang} />
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  );
}
