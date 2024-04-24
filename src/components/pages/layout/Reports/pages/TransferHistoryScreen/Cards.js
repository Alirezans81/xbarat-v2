import React, { useState, useEffect } from "react";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../../../Providers/FontProvider";
import TransferCard from "../../TransferHistory/TransferCard";
import { useThemeState } from "../../../../../../Providers/ThemeProvider";
export default function Cards({ data }) {
  const [transfer, setTransfer] = useState([]);
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  useEffect(() => {
    setTransfer(data);
  }, [data]);
  return (
    <>
      <div
        className={
          (transfer.length <= 9) & (transfer.length >= 7)
            ? "w-full h-5/6 grid lg:grid-cols-3 xs:grid-cols-1"
            : (transfer.length <= 6) & (transfer.length >= 4)
            ? "w-full h-5/6 grid lg:grid-cols-3 xs:grid-cols-1 grid-rows-3"
            : (transfer.length <= 3) & (transfer.length >= 1)
            ? "w-full h-5/6 grid lg:grid-cols-3 xs:grid-cols-1"
            : "hidden"
        }
      >
        {transfer
          ? transfer.map((data, index) => (
              <div key={index} className="col-span-1 h-48 p-2">
                <TransferCard data={data} lang={lang} />
              </div>
            ))
          : ""}
      </div>
      <div
        className={
          transfer.length === 0
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
