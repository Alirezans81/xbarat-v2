import React, { useEffect, useState } from "react";
import CustomSlider from "../../../common/CustomSlider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import PendingExchangeCard from "./PendingExchange/PendingExchangeCard";
import { useGetPendingExchanges } from "../../../../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useTokenState } from "../../../../Providers/TokenProvider";

export default function PendingExchange() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const token = useTokenState();

  const [pendingExchanges, setPendingExchanges] = useState([]);

  const { getPendingExchanges, isLoading: getPendingExchangesIsLoading } =
    useGetPendingExchanges();
  useEffect(
    () => setLoading(getPendingExchangesIsLoading),
    [getPendingExchangesIsLoading]
  );

  const refreshPendingExchange = () => {
    getPendingExchanges(token, setPendingExchanges);
  };

  useEffect(() => refreshPendingExchange(), []);

  return (
    <div className="px-5 py-3 h-full">
      <div className="flex justify-between items-center w-full">
        <span className={`text-2xl text-${oppositeTheme} mx-0.5`}>
          {lang["pending-orders"]}
        </span>
      </div>
      <div className="mt-3.5 w-full px-4 h-full relative">
        {pendingExchanges.length !== 0 ? (
          <CustomSlider slidesToShow={1} slidesToScroll={1}>
            {pendingExchanges.map((pendingExchange, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full px-1"
              >
                <PendingExchangeCard
                  lang={lang}
                  data={pendingExchange}
                  refreshPendingExchange={refreshPendingExchange}
                />
              </div>
            ))}
          </CustomSlider>
        ) : (
          <div className="absolute left-0 h-full w-full -mt-8 top-0 flex justify-center items-center">
            <span className={`font-mine-thin text-3xl text-${oppositeTheme}`}>
              {lang["no-data"]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
