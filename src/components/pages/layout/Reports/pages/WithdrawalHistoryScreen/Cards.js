import React, { useState } from "react";
import WithdrawalCard from "../../WithdrawalHistory/WithdrawalCard";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";

export default function Cards({ data }) {
  const lang = useLanguageState();

  return (
    <div className="w-full max-h-full grid grid-cols-3 mb-14">
      {data ? (
        data.map((data, index) => (
          <div key={index} className="col-span-1 h-48 p-2">
            <WithdrawalCard data={data} lang={lang} />
          </div>
        ))
      ) : (
        <>
          <div className="w-full h-full flex justify-center items-center"></div>
        </>
      )}
    </div>
  );
}
