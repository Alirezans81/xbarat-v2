import React, { useState } from "react";
import TopSection from "./common/TopSection";
import TransferCard from "./TransferHistory/TransferCard";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import CustomSlider from "../../../common/CustomSlider";

export default function TransferHistory() {
  const lang = useLanguageState();

  const [datas, setDatas] = useState([
    {
      type: "Transfer",
      amount: 1250000000,
      currency: "IRR",
      userReceiver: "C101527432",
      status: "accept",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
    {
      type: "Transfer",
      amount: 1250000000,
      currency: "IRR",
      userReceiver: "C101527432",
      status: "reject",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
    {
      type: "Transfer",
      amount: 1250000000,
      currency: "IRR",
      userReceiver: "C101527432",
      status: "accept",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
    {
      type: "Transfer",
      amount: 1250000000,
      currency: "IRR",
      userReceiver: "C101527432",
      status: "accept",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
    {
      type: "Transfer",
      amount: 1250000000,
      currency: "IRR",
      userReceiver: "C101527432",
      status: "reject",
      date: new Date(),
      rejectReason: "Your uploaded document is not as clear as it must be.",
    },
  ]);

  return (
    <div className="flex flex-col">
      <TopSection route={"transfer"} />
      <div className="flex-1 px-7 pt-5">
        <CustomSlider infinite slidesToShow={1} slidesToScroll={1}>
          {datas.map((data, index) => (
            <div className="px-7" key={index}>
              <TransferCard lang={lang} data={data} />
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  );
}
