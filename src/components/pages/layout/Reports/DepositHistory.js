import React, { useState } from "react";
import TopSection from "./common/TopSection";
import CustomSlider from "../../../common/CustomSlider";
import DepositCard from "./DepositHistory/DepositCard";
import { useLanguageState } from "../../../../Providers/LanguageProvider";

export default function DepositHistory() {
  const lang = useLanguageState();

  const [datas, setDatas] = useState([
    {
      type: "Deposit",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "accept",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
    {
      type: "Deposit",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "reject",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
    {
      type: "Deposit",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "accept",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
    {
      type: "Deposit",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "accept",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
    {
      type: "Deposit",
      amount: 1250000000,
      currency: "IRR",
      location: "Iran",
      status: "reject",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
  ]);

  return (
    <div className="flex flex-col">
      <TopSection route={"deposit"} />
      <div className="flex-1 px-5 pt-5">
        <CustomSlider infinite slidesToShow={3} slidesToScroll={3}>
          {datas.map((data, index) => (
            <div className="px-3" key={index}>
              <DepositCard data={data} lang={lang} />
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  );
}
