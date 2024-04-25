import ExchangeCard from "../../ExchangeHistory/ExchangeCard";
import React, { useState, useEffect } from "react";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../../../Providers/FontProvider";
export default function Cards({ data }) {
  const [exchange, setExchange] = useState([]);
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  useEffect(() => {
    setExchange(data);
  }, [data]);

  return (
    <>
      <div
        className={
          (exchange.length <= 9) & (exchange.length >= 7)
            ? "w-full h-5/6 grid lg:grid-cols-3 xs:grid-cols-1"
            : (exchange.length <= 6) & (exchange.length >= 4)
            ? "w-full h-5/6 grid lg:grid-cols-3 xs:grid-cols-1 grid-rows-3"
            : (exchange.length <= 3) & (exchange.length >= 1)
            ? "w-full h-5/6 grid lg:grid-cols-3 xs:grid-cols-1"
            : "hidden"
        }
      >
        {exchange
          ? exchange.map((data, index) => (
              <div key={index} className="col-span-1 h-48 p-2">
                <ExchangeCard data={data} lang={lang} />
              </div>
            ))
          : ""}
      </div>
      <div
        className={
          exchange.length === 0
            ? "w-full h-full flex justify-center items-center"
            : "hidden"
        }
      >
        <div className="flex-1 flex justify-center items-center">
          <span
            className={`font-${font}-thin -ml-4 md:-ml-0 text-2xl md:text-3xl text-${oppositeTheme}`}
          >
            {lang["no-data"]}
          </span>
        </div>
      </div>
    </>
  );
}
