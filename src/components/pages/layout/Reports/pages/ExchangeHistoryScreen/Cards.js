import React, { useState } from "react";
import ExchangeCard from "../../ExchangeHistory/ExchangeCard";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";

export default function Cards() {
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
    <div className="w-full max-h-full grid grid-cols-3 grid-rows-2">
      {datas.map((data, index) => (
        <div key={index} className="col-span-1 h-48 row-span-1 p-2">
          <ExchangeCard data={data} lang={lang} />
        </div>
      ))}
    </div>
  );
}
