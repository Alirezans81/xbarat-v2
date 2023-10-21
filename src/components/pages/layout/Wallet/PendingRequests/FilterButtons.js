import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";

export default function FilterButtons({
  showOrdersType,
  toggleShowDepositOrders,
  toggleShowWithdrawalOrders,
  toggleShowTransferOrders,
}) {
  const theme = useThemeState();
  const lang = useLanguageState();

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleShowDepositOrders}
        className={
          showOrdersType === "deposit"
            ? `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-green text-light`
            : `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-green`
        }
      >
        {lang["only-deposits"]}
      </button>
      <button
        onClick={toggleShowWithdrawalOrders}
        className={
          showOrdersType === "withdrawal"
            ? `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-red text-light`
            : `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-red`
        }
      >
        {lang["only-withdrawals"]}
      </button>
      <button
        onClick={toggleShowTransferOrders}
        className={
          showOrdersType === "transfer"
            ? `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-blue text-light`
            : `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-blue`
        }
      >
        {lang["only-transfers"]}
      </button>
    </div>
  );
}
