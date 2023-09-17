import React from "react";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../../Providers/ThemeProvider";

export default function FilterButtons({
  showOrdersType,
  toggleShowOpenOrders,
  toggleShowDoneOrders,
  toggleShowTodayOrders,
}) {
  const lang = useLanguageState();
  const theme = useThemeState();

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleShowOpenOrders}
        className={
          showOrdersType === "open"
            ? `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-blue-gradient text-light`
            : `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-gray`
        }
      >
        {lang["open-orders"]}
      </button>
      <button
        onClick={toggleShowDoneOrders}
        className={
          showOrdersType === "done"
            ? `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-blue-gradient text-light`
            : `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-gray`
        }
      >
        {lang["done-orders"]}
      </button>
      <button
        onClick={toggleShowTodayOrders}
        className={
          showOrdersType === "today"
            ? `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-blue-gradient text-light`
            : `rounded-full font-mine-regular pt-1.5 pb-0.5 px-4 bg-${theme}-back text-gray`
        }
      >
        {lang["today-orders"]}
      </button>
    </div>
  );
}
