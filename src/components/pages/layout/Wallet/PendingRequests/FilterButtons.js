import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function FilterButtons({
  showOrdersType,
  toggleShowDepositOrders,
  toggleShowWithdrawalOrders,
  toggleShowTransferOrders,
}) {
  const theme = useThemeState();
  const lang = useLanguageState();
  const font = useFontState();

  return (
    <div className="flex gap-x-2 justify-between w-full">
      <button
        onClick={toggleShowDepositOrders}
        className={
          showOrdersType === "deposit"
            ? `rounded-full text-sm md:text-base font-${font}-regular pt-1.5 pb-0.5 px-4 bg-green text-light`
            : `rounded-full text-sm md:text-base font-${font}-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-green`
        }
      >
        {lang["deposit"]}
      </button>
      <button
        onClick={toggleShowWithdrawalOrders}
        className={
          showOrdersType === "withdrawal"
            ? `rounded-full text-sm md:text-base font-${font}-regular pt-1.5 pb-0.5 px-4 bg-red text-light`
            : `rounded-full text-sm md:text-base font-${font}-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-red`
        }
      >
        {lang["withdrawal"]}
      </button>
      <button
        onClick={toggleShowTransferOrders}
        className={
          showOrdersType === "transfer"
            ? `rounded-full text-sm md:text-base font-${font}-regular pt-1.5 pb-0.5 px-4 bg-blue text-light`
            : `rounded-full text-sm md:text-base font-${font}-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-blue`
        }
      >
        {lang["transfer"]}
      </button>
    </div>
  );
}
