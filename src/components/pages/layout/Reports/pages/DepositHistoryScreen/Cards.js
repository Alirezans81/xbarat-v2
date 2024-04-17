import { React, useEffect, useState } from "react";
import DepositCard from "../../DepositHistory/DepositCard";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../../../Providers/FontProvider";
export default function Cards({ data }) {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [deposit, setDeposit] = useState([]);

  useEffect(() => {
    setDeposit(data);
  }, [data]);

  return (
    <>
      <div
        className={
          deposit.length !== 0
            ? "w-full h-full grid lg:grid-cols-3 xs:grid-cols-1"
            : "hidden"
        }
      >
        {deposit
          ? deposit.map((data, index) => (
              <div key={index} className="col-span-1 h-48 p-1">
                <DepositCard data={data} lang={lang} />
              </div>
            ))
          : ""}
      </div>
      <div
        className={
          deposit.length === 0
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
