import React, { useEffect, useState } from "react";
import { useGetWatchList } from "../../../../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import CustomTable from "../../../common/CustomTable";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";
import { useDirectionState } from "../../../../Providers/DirectionProvider";

export default function WatchList() {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { oneEnd: endDirection } = useDirectionState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const addComma = useAddComma();

  const head = [lang["currency-pair"], lang["low"], lang["high"]];
  const [data, setData] = useState([]);

  const { getWatchList, isLoading: getWatchListIsLoading } = useGetWatchList();
  useEffect(() => setLoading(getWatchListIsLoading), [getWatchListIsLoading]);

  useEffect(() => {
    getWatchList(setData);
  }, []);

  const watch_list_data =
    data && data.watch_list
      ? data.watch_list.map((row) => {
          let temp = {};
          temp.title = row.title;
          temp.min_rate = addComma(row.min_rate);
          temp.max_rate = addComma(row.max_rate);

          return temp;
        })
      : [];

  return (
    <div className="px-6 py-5 h-full flex flex-col">
      <h1 className={`font-mine-regular text-2xl text-${oppositeTheme}`}>
        {lang["watch-list-label"]}
      </h1>
      <div className={`flex-1 overflow-y-auto mt-2 p${endDirection}-4`}>
        <CustomTable heads={head} rows={watch_list_data} />
      </div>
    </div>
  );
}