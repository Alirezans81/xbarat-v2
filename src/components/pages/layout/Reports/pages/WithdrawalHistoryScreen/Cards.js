import React, { useState, useEffect } from "react";
import WithdrawalCard from "../../WithdrawalHistory/WithdrawalCard";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../../../Providers/FontProvider";
export default function Cards({ data }) {
  const [withdraw, setWithdraw] = useState([]);
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  useEffect(() => {
    setWithdraw(data);
  }, [data]);
  return (
    <>
      <div
        className={
          withdraw.length > 0
            ? "w-full h-5/6 grid lg:grid-cols-3 xs:grid-cols-1"
            : "hidden"
        }
      >
        {withdraw
          ? withdraw.map((data, index) => (
              <div key={index} className="col-span-1 h-48 p-2">
                <WithdrawalCard data={data} lang={lang} />
              </div>
            ))
          : ""}
      </div>
      <div
        className={
          withdraw.length === 0
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
