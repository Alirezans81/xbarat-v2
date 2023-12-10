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
    <div className="flex gap-2">
      <button
        onClick={toggleShowDepositOrders}
        className={
          showOrdersType === "deposit"
            ? `rounded-full font-${font}-regular pt-1.5 pb-0.5 px-4 bg-green text-light`
            : `rounded-full font-${font}-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-green`
        }
      >
        {lang["only-deposits"]}
      </button>
      <button
        onClick={toggleShowWithdrawalOrders}
        className={
          showOrdersType === "withdrawal"
            ? `rounded-full font-${font}-regular pt-1.5 pb-0.5 px-4 bg-red text-light`
            : `rounded-full font-${font}-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-red`
        }
      >
        {lang["only-withdrawals"]}
      </button>
      <button
        onClick={toggleShowTransferOrders}
        className={
          showOrdersType === "transfer"
            ? `rounded-full font-${font}-regular pt-1.5 pb-0.5 px-4 bg-blue text-light`
            : `rounded-full font-${font}-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-blue`
        }
      >
        {lang["only-transfers"]}
      </button>
    </div>
  );
}
