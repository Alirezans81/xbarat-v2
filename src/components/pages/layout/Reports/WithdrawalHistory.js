import React, { useState,useEffect } from "react";
import TopSection from "./common/TopSection";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import CustomSlider from "../../../common/CustomSlider";
import WithdrawalCard from "./WithdrawalHistory/WithdrawalCard";
import { useGetWithdrawHistory } from "../../../../apis/pages/Reports/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
export default function WithdrawalHistory() {
  const lang = useLanguageState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const { getWithdrawHistory, isLoading: getWithdrawHistoryIsLoading } = useGetWithdrawHistory();
  useEffect(
    () => setIsLoadingSplashScreen(getWithdrawHistoryIsLoading),
    [getWithdrawHistoryIsLoading]
  );

  const [withdraw, setWithdraw] = useState([]);
  useEffect(() => {
     getWithdrawHistory(setWithdraw);
  }, []);                                           
  // const [datas, setDatas] = useState([
  //   {
  //     type: "Withdrawal",
  //     amount: 1250000000,
  //     currency: "IRR",
  //     location: "Iran",
  //     status: "accept",
  //     date: new Date(),
  //     rejectReason: "Your uploaded document is not as clear as it must be.",
  //   },
  //   {
  //     type: "Withdrawal",
  //     amount: 1250000000,
  //     currency: "IRR",
  //     location: "Iran",
  //     status: "reject",
  //     date: new Date(),
  //     rejectReason: "Your uploaded document is not as clear as it must be.",
  //   },
  //   {
  //     type: "Withdrawal",
  //     amount: 1250000000,
  //     currency: "IRR",
  //     location: "Iran",
  //     status: "accept",
  //     date: new Date(),
  //     rejectReason: "Your uploaded document is not as clear as it must be.",
  //   },
  //   {
  //     type: "Withdrawal",
  //     amount: 1250000000,
  //     currency: "IRR",
  //     location: "Iran",
  //     status: "accept",
  //     date: new Date(),
  //     rejectReason: "Your uploaded document is not as clear as it must be.",
  //   },
  //   {
  //     type: "Withdrawal",
  //     amount: 1250000000,
  //     currency: "IRR",
  //     location: "Iran",
  //     status: "reject",
  //     date: new Date(),
  //     rejectReason: "Your uploaded document is not as clear as it must be.",
  //   },
  // ]);

  const getQuantityOfCards = () => {
    if (window.innerWidth >= 1280) {
      return 3;
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
      <TopSection route={"withdrawal"} />
      <div className="flex-1 px-5 pt-5">
        <CustomSlider
          infinite
          slidesToShow={getQuantityOfCards()}
          slidesToScroll={getQuantityOfCards()}
        >
          {withdraw.map((data, index) => (
            <div className="px-3" key={index}>
              <WithdrawalCard lang={lang} data={data} />
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  );
}
