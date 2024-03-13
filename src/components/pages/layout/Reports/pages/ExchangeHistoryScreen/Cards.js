import React, { useState } from "react";
import ExchangeCard from "../../ExchangeHistory/ExchangeCard";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";

export default function Cards({ datas }) {
  const lang = useLanguageState();

  return (
    <div className="w-full max-h-full grid grid-cols-3 mb-14">
      {datas &&
        datas.map((data, index) => (
          <div key={index} className="col-span-1 h-48 p-2">
            <ExchangeCard data={data} lang={lang} />
          </div>
        ))}
    </div>
  );
}
