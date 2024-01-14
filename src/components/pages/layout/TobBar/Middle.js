import React from "react";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";
import { useLanguageState } from "../../../../Providers/LanguageProvider";

export default function Middle() {
  const lang = useLanguageState();
  const font = useFontState();
  const addComma = useAddComma();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const { walletAssets } = useWalletState();
  const data = walletAssets.slice(0, 3);

  if (data && data.length) {
    return (
      <div
        className={`bg-${theme}-back flex gap-x-4 pl-2 py-2 rounded-full pr-5`}
      >
        {data.map((walletAsset, index) => (
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
                <span className={`text-green text-sm font-${font}-regular`}>
                  {"+ " +
                    addComma(+walletAsset.pending) +
                    " " +
                    lang["pending"]}
                </span>
                <span className={`text-red text-sm font-${font}-regular`}>
                  {"+ " + addComma(+walletAsset.locked) + " " + lang["locked"]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
