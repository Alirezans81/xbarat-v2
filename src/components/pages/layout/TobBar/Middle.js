import React, { useEffect, useState } from "react";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import {
  useAddComma,
  useSortByBalance,
} from "../../../../hooks/useNumberFunctions";
import { useLanguageState } from "../../../../Providers/LanguageProvider";

export default function Middle() {
  const lang = useLanguageState();
  const font = useFontState();
  const addComma = useAddComma();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const { walletAssets } = useWalletState();
  const sortByBalance = useSortByBalance();
  const data = walletAssets.sort(sortByBalance).slice(0, 3);

  const [allAreZero, setAllAreZero] = useState(true);
  useEffect(() => {
    data &&
      data.length &&
      data.map((walletAsset) => {
        if (
          +walletAsset.balance !== 0 ||
          +walletAsset.pending !== 0 ||
          +walletAsset.locked !== 0
        ) {
          setAllAreZero(false);
        }
      });
  }, [data]);

  if (window.innerWidth > 1280 && !allAreZero) {
    return (
      <div
        className={`bg-${theme}-back flex gap-x-4 pl-2 py-2 rounded-full pr-5`}
      >
        {data.map((walletAsset, index) => {
          if (
            +walletAsset.balance !== 0 ||
            +walletAsset.pending !== 0 ||
            +walletAsset.locked !== 0
          ) {
            return (
              <div key={index} className="flex items-center gap-x-2">
                <div className={`p-2 bg-${theme} rounded-full`}>
                  <img
                    className="w-7 h-7"
                    src={
                      theme === "dark"
                        ? walletAsset.currency_sym_pic_light
                        : walletAsset.currency_sym_pic_dark
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-${oppositeTheme} font-${font}-regular text`}
                  >
                    {addComma(+walletAsset.balance) +
                      " " +
                      walletAsset.currency_abb}
                  </span>
                  <div className="flex flex-row gap-x-2 -mt-1">
                    {+walletAsset.pending !== 0 && (
                      <span
                        className={`text-green text-sm font-${font}-regular`}
                      >
                        {"+ " +
                          addComma(+walletAsset.pending) +
                          " " +
                          lang["pending"]}
                      </span>
                    )}
                    {+walletAsset.locked !== 0 && (
                      <span className={`text-red text-sm font-${font}-regular`}>
                        {"+ " +
                          addComma(+walletAsset.locked) +
                          " " +
                          lang["locked"]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
