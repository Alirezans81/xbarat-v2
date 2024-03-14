import React, { useState } from "react";
import DepositCard from "../../DepositHistory/DepositCard";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";

export default function Cards({ data }) {
  const lang = useLanguageState();

  return (
    <div className="w-full max-h-full grid grid-cols-3 mb-14">
      {data
        ? data.map((data, index) => (
            <div key={index} className="col-span-1 h-48 p-2">
              <DepositCard data={data} lang={lang} />
            </div>
          ))
        : ""}
    </div>
  );
}
