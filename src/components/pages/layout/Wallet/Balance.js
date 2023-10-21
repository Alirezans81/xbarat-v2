import React from "react";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import CustomSlider from "../../../common/CustomSlider";
import CurrencyCard from "./Balance/CurrencyCard";

export default function Balance() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  const balances = useWalletState();

  return (
    <div className="h-full flex flex-col gap-y-2">
      <span className={`font-mine-bold text-${oppositeTheme} text-2xl`}>
        {lang["your-balance"]}
      </span>
      <div className="flex-1 px-7 relative">
        {balances.length !== 0 ? (
          <CustomSlider slidesToScroll={3} slidesToShow={3} infinite>
            {balances.map((balance, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full px-4"
              >
                <CurrencyCard balance={balance} />
              </div>
            ))}
          </CustomSlider>
        ) : (
          <div className="absolute left-0 h-full w-full top-0 flex justify-center items-center">
            <span className={`font-mine-thin text-3xl text-${oppositeTheme}`}>
              {lang["no-data"]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
