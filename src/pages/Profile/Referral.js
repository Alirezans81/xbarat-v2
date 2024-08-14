<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import ReferralPlans from "../../components/pages/layout/Referral/ReferralPlans";
import TargetReward from "../../components/pages/layout/Referral/TargetReward";
import Filters from "../../components/pages/layout/Referral/Filters";
import ReferralList from "../../components/pages/layout/Referral/ReferralList";
import { useUserState } from "../../Providers/UserProvider";
import { useGetCurrencyByUrl } from "../../hooks/useCurrencyFilter";
import { useSortByCreateDate } from "../../hooks/useConvertDateTime";

export default function Referral() {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const userInfo = useUserState();

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(userInfo.referral_gift.user_referrals);
  }, [userInfo]);

  const getCurrencyByUrl = useGetCurrencyByUrl();
  const selectedCurrency = getCurrencyByUrl(userInfo.main_currency);

  const [lastData, setLastData] = useState([]);
  const sortByCreateDate = useSortByCreateDate();
  useEffect(() => {
    if (data && data.length > 0) {
      let tempArray = [];
      data.map((e) => {
        if (
          e.date_verify &&
          e.exchange_at &&
          (e.date_verify !== "-" || e.exchange_at !== "-")
        ) {
          if (
            e.exchange_at === "-" ||
            new Date(e.date_verify) > new Date(e.exchange_at)
          ) {
            tempArray.push({
              datetime_create: e.date_verify,
              amount: +e.amount_signup,
            });
          } else {
            tempArray.push({
              datetime_create: e.exchange_at,
              amount: +e.amount_exchange,
            });
          }
        }
      });

      setLastData(tempArray.sort(sortByCreateDate));
    }
  }, [data]);

  if (data && selectedCurrency && lastData) {
    return (
      <>
        <div
          className={`grid grid-cols-12 grid-row-2 md:gap-x-10 gap-y-7 text-${oppositeTheme} font-${font}-regular overflow-y-auto max-h-full w-full px-6 md:px-0 pb-24 md:pb-0`}
        >
          <div
            className={`order-3 rounded-2xl md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-2 col-span-12 py-5 px-6 bg-${theme} `}
          >
            <Filters />
          </div>

          <div
            className={`order-1 rounded-2xl md:col-start-4 md:col-end-8 md:row-start-1 md:row-end-2 col-span-12 py-5 px-6 bg-${theme} `}
          >
            <TargetReward
              data={lastData}
              user_referrals_count={userInfo.referral_gift.user_referrals_count}
              total_benefit={
                +userInfo.referral_gift.referral_exchange_amount +
                +userInfo.referral_gift.referral_gift_amount +
                +userInfo.referral_gift.referral_signup_amount
              }
              currency={selectedCurrency}
            />
          </div>

          <div
            className={`order-2 md:col-start-8 md:col-end-13 md:row-start-1 md:row-end-3 col-span-12 bg-${theme} font-${font}-regular rounded-2xl md:rounded-r-none `}
          >
            <ReferralPlans currency={selectedCurrency} />
          </div>

          <div
            className={`order-4 rounded-2xl md:col-start-1 md:col-end-8 md:row-start-2 md:row-end-3 col-span-12 bg-${theme} font-${font}-regular overflow-x-auto`}
          >
            <ReferralList data={data} currency={selectedCurrency} />
          </div>
        </div>
      </>
    );
  }
=======
import React from "react";

export default function Referral() {
  return <div>Referral</div>;
>>>>>>> 05d536c (change cards routing in folders - add referral page)
}
