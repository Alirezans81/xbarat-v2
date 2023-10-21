import React, { useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";
import RequestStatus from "../common/RequestStatus";

export default function LastDeposit() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const addComma = useAddComma();

  const [lastDeposit, setLastDeposit] = useState({
    date: "2022 Feb 13  15:55",
    amount: 1250000000,
    status: "adminApprove",
    location: "Iran",
  });

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-row w-full justify-between items-center">
        <span className={`text-${oppositeTheme} font-mine-bold text-xl`}>
          {lang["last-deposit"]}
        </span>
        <span className="text-gray text-sm font-mine-regular">
          {lastDeposit.date}
        </span>
      </div>
      <div className="flex flex-row w-full justify-between items-end">
        <div className="flex flex-col">
          <span className={`font-mine-regular text-${oppositeTheme}`}>
            {addComma(lastDeposit.amount || 0) +
              " " +
              lang["in"] +
              " " +
              lastDeposit.location}
          </span>
          <div className="-mb-2">
            <RequestStatus status={lastDeposit.status} />
          </div>
        </div>
        <button>
          <img
            className="w-6 h-6"
            src={require(`../../../../Images/open-modal-${oppositeTheme}.png`)}
          />
        </button>
      </div>
    </div>
  );
}
