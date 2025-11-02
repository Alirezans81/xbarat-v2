import React, { useState, useEffect } from "react";
import SubmitButton from "../common/SubmitButton";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useModalDataClose } from "../../Providers/ModalDataProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useCurrencyPairsState } from "../../Providers/CurrencyPairsProvider";
const EditExchangeModal = ({ data, exchange }) => {
  const fee_percentage = useCurrencyPairsState().filter(
    (pair) => pair.url === data.currency_pair
  )[0].fee_percentage;
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const closeModal = useModalDataClose();
  const [source, setSource] = useState(data.amount_source);
  const [rate, setRate] = useState(data.rate);
  const [destination, setDestination] = useState(data.amount_destination);
  const [isFocused, setIsFocused] = useState("");
  useEffect(() => {
    setDestination((rate * source * (100 - fee_percentage)) / 100);
  }, [rate, source]);
  const handleSubmit = () => {
    data["amount_source"] = parseFloat(source);
    data["amount_destination"] = parseFloat(destination);
    data["rate"] = parseFloat(rate);
    exchange(closeModal);
  };
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  return (
    <div
      className={`grid grid-cols-1 gird-rows-6 w-full h-fit font-${font}-regular gap-y-5 pb-3 `}
    >
      <div
        className={`row-span-1 col-span-1 bg-${theme}-back text-blue  min-w-[20rem] rounded-2xl p-2 flex justify-center`}
      >
        {lang["exchange"]}
      </div>
      <div
        className={`col-span-1 row-span-5 bg-${theme}-back flex flex-col  rounded-2xl p-5 gap-y-3`}
      >
        <div
          dir={font === "Fa" || font === "Ar" ? "rtl" : "ltr"}
          className="flex flex-row gap-x-2"
        >
          <div className="text-blue-gradient gap-x-1 flex flex-row w-1/2">
            <span>{lang["amount"]}</span>
            <span>{lang["source"]}</span>
          </div>
          <span className={`w-1/2 flex justify-end text-${oppositeTheme}`}>
            <input
              onFocus={() => setIsFocused("source")}
              onBlur={() => setIsFocused("")}
              className={
                isFocused === "source"
                  ? `w-32 bg-${theme} text-${oppositeTheme} rounded-lg px-2`
                  : "w-32 bg-blue rounded-lg px-2"
              }
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </span>
        </div>
        <div
          dir={font === "Fa" || font === "Ar" ? "rtl" : "ltr"}
          className="flex flex-row gap-x-2"
        >
          <span className="text-blue-gradient flex justify-start w-1/2">
            {lang["rate"]}
          </span>
          <span className={`w-1/2 flex justify-end text-${oppositeTheme}`}>
            <input
              onFocus={() => setIsFocused("rate")}
              onBlur={() => setIsFocused("")}
              className={
                isFocused === "rate"
                  ? `w-32 bg-${theme} text-${oppositeTheme} rounded-lg px-2`
                  : "w-32 bg-blue rounded-lg px-2"
              }
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </span>
        </div>
        <div
          dir={font === "Fa" || font === "Ar" ? "rtl" : "ltr"}
          className="flex flex-row gap-x-2"
        >
          <div className="text-blue-gradient gap-x-1 flex flex-row w-1/2">
            <span>{lang["amount"]}</span>
            <span>{lang["target"]}</span>
          </div>
          <span className={`w-1/2 flex justify-end text-${oppositeTheme}`}>
            {destination}
          </span>
        </div>
      </div>
      <SubmitButton
        onClick={handleSubmit}
        rounded={"2xl"}
        className="w-full h-full max-h-[3rem] text-light p-2 "
      >
        {lang["submit"]}
      </SubmitButton>
    </div>
  );
};

export default EditExchangeModal;
