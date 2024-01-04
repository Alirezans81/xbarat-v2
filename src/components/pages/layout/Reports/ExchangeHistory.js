import React, { useState } from "react";
import TopSection from "./common/TopSection";
import CustomSlider from "../../../common/CustomSlider";
import ExchangeCard from "./ExchangeHistory/ExchangeCard";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
export default function ExchangeHistory() {
  const lang = useLanguageState();
  const [datas, setDatas] = useState([
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

  return (
    <div className="flex flex-col">
      <TopSection route={"exchange"} />
      <div className="flex-1 px-8 pt-5">
        <CustomSlider infinite slidesToShow={1} slidesToScroll={1}>
          {datas.map((data, index) => (
            <div className="px-7" key={index}>
              <ExchangeCard data={data} lang={lang} />
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  );
}
