import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import RequestStatus from "../../common/RequestStatus";

export default function RequestCard({ pendingOrder }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const addComma = useAddComma();

  return (
    <div
      className={`flex flex-col justify-center bg-${theme}-back rounded-3xl h-full pt-4 pb-4 px-4`}
    >
      <div className="w-full flex flex-row justify-between items-center">
        {pendingOrder && pendingOrder.type === "deposit" && (
          <span className="font-mine-bold text-green">{lang["deposit"]}</span>
        )}
        {pendingOrder && pendingOrder.type === "withdrawal" && (
          <span className="font-mine-bold text-red">{lang["withdrawal"]}</span>
        )}
        {pendingOrder && pendingOrder.type === "transfer" && (
          <span className="font-mine-bold text-blue">{lang["transfer"]}</span>
        )}
        <button>
          <img
            className="w-6 h-6 mb-2 "
            src={require(`../../../../../Images/open-modal-${oppositeTheme}.png`)}
          />
        </button>
      </div>
      <div className="flex flex-col">
        <span className={`font-mine-regular text-${oppositeTheme}`}>
          {addComma(pendingOrder.amount || 0) +
            " " +
            lang["in"] +
            " " +
            pendingOrder.location}
        </span>
        <div className="-mb-2">
          <RequestStatus status={pendingOrder.status} />
        </div>
      </div>
      <div className="flex flex-row w-full items-end gap-x-2 h-8 font-mine-bold mt-4">
        {pendingOrder && pendingOrder.status === "new" && (
          <>
            <button className="flex-1 border-2 rounded-lg pt-1.5 border-blue text-blue">
              {lang["edit"]}
            </button>
            <button className="flex-1 border-2 rounded-lg pt-1.5 border-red text-red">
              {lang["cancel"]}
            </button>
          </>
        )}
        {pendingOrder && pendingOrder.status === "adminApprove" && (
          <span
            className={`font-mine-thin text-${oppositeTheme} text-lg leading-4`}
          >
            {lang["admin-approve-message"] + "."}
          </span>
        )}
        {pendingOrder && pendingOrder.status === "adminAssign" && (
          <span
            className={`font-mine-thin text-${oppositeTheme} text-lg leading-4`}
          >
            {lang["admin-assign-message"] + "."}
          </span>
        )}
        {pendingOrder && pendingOrder.status === "uploadDocument" && (
          <span
            className={`font-mine-thin text-${oppositeTheme} text-lg leading-4`}
          >
            {lang["upload-document-message"] + "."}
          </span>
        )}
        {pendingOrder && pendingOrder.status === "reject" && (
          <span
            className={`font-mine-thin text-${oppositeTheme} text-lg leading-4`}
          >
            {pendingOrder.rejectReason}
          </span>
        )}
      </div>
      <span className="text-gray font-mine-regular text-sm mt-4 -mb-2">
        {pendingOrder.date}
      </span>
    </div>
  );
}
