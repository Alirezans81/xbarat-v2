import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useWalletState } from "../../../Providers/WalletProvider";
import { useCurrencyPairsState } from "../../../Providers/CurrencyPairsProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useFontState } from "../../../Providers/FontProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
const generateColor = (index) => {
  const colors = ["#0B9B08", "#8F97A6", "#0A8DFF", "#FCB819", "#E42F08"];
  return colors[index % colors.length];
};

const PiechartAssets = () => {
  const lang = useLanguageState();
  const wallet = useWalletState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [walletData, setWalletData] = useState([]);
  const currency_pairs = useCurrencyPairsState();
  const font = useFontState();
  const getExchangeRateToUSD = (currency, currencyPairs) => {
    if (currency === "USD") return 1;

    let pairs = currencyPairs.find(
      (pair) =>
        pair.currency_source_abb === currency &&
        pair.currency_destination_abb === "USD"
    );

    if (pairs) return pairs.has_reverse_rate ? pairs.rate : 1 / pairs.rate;

    return null;
  };
  const roundToTwo = (num) => Math.round(num * 100) / 100;
  useEffect(() => {
    const filteredAssets = wallet.walletAssets
      .filter((data) => data.balance > 0)
      .map((asset, index) => {
        const rateToUSD = getExchangeRateToUSD(
          asset.currency_abb,
          currency_pairs
        );
        const convertedValue = rateToUSD ? asset.balance * rateToUSD : 0;
        return {
          id: index,
          value: convertedValue.toFixed(2),
          label: `${asset.currency_abb} (${roundToTwo(asset.balance)})`,
          color: generateColor(index),
        };
      });

    setWalletData(filteredAssets);
  }, [wallet, currency_pairs]);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-5 pb-3 pt-4">
      <div
        className={`text-${oppositeTheme} w-full h-fit text-2xl font-${font}-bold pt-3`}
      >
        {lang["wallet"]}
      </div>
      <div className="flex flex-1 w-full h-full flex-col md:flex-row pt-3 md:pt-0">
        <div className="flex flex-row md:flex-col gap-y-3 h-full justify-center overflow-scroll">
          {wallet.walletAssets
            .filter((data) => data.balance > 0)
            .map((asset, index) => (
              <div className="flex flex-row w-full h-fit justify-center items-center gap-x-2">
                <div
                  style={{ backgroundColor: generateColor(index) }}
                  className={`w-4 h-3 rounded-full`}
                ></div>

                <div className="flex flex-col justify-start items-start w-full max-w-3  overflow-scroll">
                  <span className={`font-bold text-${oppositeTheme} w-full `}>
                    {roundToTwo(asset.balance)}
                  </span>
                  <span
                    className={`text-${oppositeTheme} w-full text-sm font-bold flex justify-start`}
                  >
                    {asset.currency_abb}
                  </span>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-1 justify-center items-center">
          <PieChart
            className="w-fit"
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
            series={[
              {
                data: walletData,
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                cx: "50%",
                cy: "50%",
                innerRadius: 60,
                outerRadius: 70,
                paddingAngle: 6,
                startAngle: 0,
                endAngle: 360,
                cornerRadius: 10,
              },
            ]}
            width={1}
            height={150}
          />
        </div>
      </div>
    </div>
  );
};

export default PiechartAssets;
