import React, { useEffect, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import ReferralPlans from "../../components/pages/layout/Referral/ReferralPlans";
import TargetReward from "../../components/pages/layout/Referral/TargetReward";
import Filters from "../../components/pages/layout/Referral/Filters";
import ReferralList from "../../components/pages/layout/Referral/ReferralList";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useGetReferraledUser } from "../../apis/pages/Referral/hooks";
import { useUserState } from "../../Providers/UserProvider";
import { useGetCurrencyByUrl } from "../../hooks/useCurrencyFilter";

export default function Referral() {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setLoading = useIsLoadingSplashScreenSetState();

  const [data, setData] = useState([]);

  const { getReferraledUser, isLoading: getReferraledUserIsLoading } =
    useGetReferraledUser();
  useEffect(
    () => setLoading(getReferraledUserIsLoading),
    [getReferraledUserIsLoading]
  );

  useEffect(() => {
    getReferraledUser(setData);
  }, []);

  const getCurrencyByUrl = useGetCurrencyByUrl();
  const userInfo = useUserState();
  const selectedCurrency = getCurrencyByUrl(userInfo.main_currency);

  return (
    <>
      <div
        className={`grid grid-cols-12 grid-row-2 md:gap-x-10 gap-y-7  text-${oppositeTheme} font-${font}-regular overflow-y-auto max-h-full w-full`}
      >
        <div
          className={` rounded-2xl col-start-1 col-end-4 row-start-1 row-end-2 pb-2.5 pt-5 px-6 bg-${theme} `}
        >
          <Filters />
        </div>

        <div
          className={` rounded-2xl col-start-4 col-end-8 row-start-1 row-end-2 py-5 px-6 bg-${theme} `}
        >
          <TargetReward />
        </div>

        <div
          className={` col-start-8 col-end-13 row-start-1 row-end-3 bg-${theme} font-${font}-regular rounded-2xl md:rounded-r-none `}
        >
          <ReferralPlans currency={selectedCurrency} />
        </div>

        <div
          className={` rounded-2xl col-start-1 col-end-8 row-start-2 row-end-3 py-5 px-6 bg-${theme} font-${font}-regular flex flex-col`}
        >
          <ReferralList data={data} />
        </div>
      </div>
    </>
  );
}
