import React from "react";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useFontState } from "../../../Providers/FontProvider";

export default function SelectType({ type, selectType }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();

  const notActiveDepositButtonClass = `bg-${theme}-back font-${font}-regular pt-1.5 pb-0.5 px-6 rounded-full text-green`;
  const activeDepositButtonClass = `bg-green font-${font}-bold pt-2 pb-0.5 px-6 rounded-full text-light`;
  const notActiveWithdrawalButtonClass = `bg-${theme}-back font-${font}-regular pt-1.5 pb-0.5 px-6 rounded-full text-red`;
  const activeWithdrawalButtonClass = `bg-red font-${font}-bold pt-2 pb-0.5 px-6 rounded-full text-light`;
  const notActiveTransferButtonClass = `bg-${theme}-back font-${font}-regular pt-1.5 pb-0.5 px-6 rounded-full text-blue`;
  const activeTransferButtonClass = `bg-blue font-${font}-bold pt-2 pb-0.5 px-6 rounded-full text-light`;

  return (
    <div className="flex gap-x-2.5">
      <button
        onClick={() => selectType("deposit")}
        className={
          type === "deposit"
            ? activeDepositButtonClass
            : notActiveDepositButtonClass
        }
      >
        {lang["deposit"]}
      </button>
      <button
        onClick={() => selectType("withdrawal")}
        className={
          type === "withdrawal"
            ? activeWithdrawalButtonClass
            : notActiveWithdrawalButtonClass
        }
      >
        {lang["withdrawal"]}
      </button>
      <button
        onClick={() => selectType("transfer")}
        className={
          type === "transfer"
            ? activeTransferButtonClass
            : notActiveTransferButtonClass
        }
      >
        {lang["transfer"]}
      </button>
    </div>
  );
}
