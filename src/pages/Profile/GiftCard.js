import React, { useEffect, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import Sites from "../../components/pages/layout/GiftCard/Sites";
import GiftCards from "../../components/pages/layout/GiftCard/GiftCards";
import { useFontState } from "../../Providers/FontProvider";
import { useGetGiftCardSites } from "../../apis/pages/GiftCards/hooks";
import Suggestions from "../../components/pages/layout/GiftCard/Suggestions";

export default function GiftCard() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const setLoading = useIsLoadingSplashScreenSetState();

  const [sites, setSites] = useState([]);
  const [selectedSiteIndex, setSelectedSiteIndex] = useState(-1);
  const { getGiftCardSites, getGiftCardSitesIsLoading } = useGetGiftCardSites();
  useEffect(
    () => setLoading(getGiftCardSitesIsLoading),
    [getGiftCardSitesIsLoading]
  );
  useEffect(() => {
    getGiftCardSites(setSites);
  }, []);

  const [suggestions, setSuggestions] = useState([1, 1, 1, 1, 1, 1, 1, 1]);

  const [giftCards, setGiftCards] = useState([1, 1, 1, 1, 1, 1, 1, 1]);

  return (
    <div
      className={`w-full h-full overflow-y-auto pl-8 pr-8 md:pl-0 md:pr-0 pb-20 md:pb-0 text-${oppositeTheme} font-${font}-regular`}
    >
      <div className="w-full min-h-full grid grid-cols-11 grid-rows-2 md:gap-x-10 gap-y-7">
        <div
          className={`col-span-3 row-span-2 bg-${theme} rounded-3xl px-6 py-5`}
        >
          <Sites
            sites={sites}
            selectedSiteIndex={selectedSiteIndex}
            setSelectedSiteIndex={setSelectedSiteIndex}
          />
        </div>
        <div
          className={`col-span-8 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none px-6 py-5`}
        >
          <Suggestions
            selectedSiteIndex={selectedSiteIndex}
            suggestions={suggestions}
          />
        </div>
        <div
          className={`col-span-8 row-span-1 bg-${theme} rounded-3xl md:rounded-r-none px-6 py-5`}
        >
          <GiftCards giftCards={giftCards} />
        </div>
      </div>
    </div>
  );
}
