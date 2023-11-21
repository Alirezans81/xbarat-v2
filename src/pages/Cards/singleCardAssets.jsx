import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useState, useEffect } from "react";
import arrowRightLight from "../../Images/arrow-right-light.png";
import arrowRightDark from "../../Images/arrow-right-dark.png";
import { th } from "date-fns/locale";
const SingleCardAssets = ({ assetData, assetIndex }) => {
  const wallet = useWalletState();
  const theme = useThemeState();
  const lang = useLanguageState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const walletTanks = wallet.walletTanks.filter(
    (data) => data.currency_abb === assetData.currency_abb
  );
  console.log(walletTanks);
  return (
    <>
      <div className={`bg-${theme}-back h-20 rounded-lg w-full`}>
        <span
          style={{ position: "absolute", left: "46%" }}
          className={`text-${oppositeTheme} text-2xl mt-1`}
        >
          {assetData.currency_abb}
        </span>

        <span
          style={{ position: "absolute", top: "17%" }}
          className="text-gray"
        >
          {[walletTanks.length, lang["cards-profile"]].join(" ")}
        </span>

        {/* <button>
          <img
            style={{
              width: "10%",
              height: "80%",
            }}
            alt=""
            src={theme === "light" ? arrowRightDark : arrowRightLight}
          />
        </button> */}
      </div>
    </>
  );
};

export default SingleCardAssets;
