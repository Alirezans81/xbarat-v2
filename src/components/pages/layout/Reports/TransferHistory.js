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
      <TopSection route={"transfer"} />
      <div className="flex-1 px-4 pt-5">
        <CustomSlider
          infinite
          slidesToShow={getQuantityOfCards()}
          slidesToScroll={getQuantityOfCards()}
        >
          {datas.map((data, index) => (
            <div className="px-3" key={index}>
              <TransferCard lang={lang} data={data} />
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  );
}
