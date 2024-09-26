import { React, useState } from "react";
import RequestStatus from "../../pages/layout/common/RequestStatus";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useFontState } from "../../../Providers/FontProvider";
import PendingRequestTipsUploadDocument from "./PendingRequestTipsUploadDocument";
export default function PendingRequestModalStatus({ status, rejectReason }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const [tips, setTips] = useState(false);

  if (status === "Admin Assign") {
    return (
      <div
        className={`flex flex-col bg-${theme}-back px-3.5 pt-3 rounded-xl pb-2 w-full`}
      >
        <div className="flex flex-row items-center -mt-1.5">
          <img
            className="w-6 h-6"
            src={require("../../../Images/pages/layout/Wallet/statues/adminAssign.png")}
          />
          <span className={`font-${font}-bold text-lg text-blue mx-1 pt-2`}>
            {lang["admin-assign"]}
          </span>
        </div>
        <span className={`font-${font}-thin text-${oppositeTheme} mx-1`}>
          {lang["admin-assign-message"] + "."}
        </span>
      </div>
    );
  } else if (status === "Upload Document") {
    if (tips) {
      return (
        <div className="w-full h-full">
          <div
            className={`flex flex-col bg-${theme}-back px-3.5 pt-3 rounded-xl pb-2 w-full`}
          >
            <div className="flex flex-row items-center -mt-1.5">
              <img
                className="w-6 h-6"
                src={require("../../../Images/pages/layout/Wallet/statues/uploadDocument.png")}
              />
              <span className={`font-${font}-bold text-lg text-blue mx-1 pt-2`}>
                {lang["upload-document"]}
              </span>
            </div>
            <span className={`font-${font}-thin text-${oppositeTheme} mx-1`}>
              {lang["upload-document-message"] + "."}
            </span>
          </div>
        </div>
      );
    } else {
      return <PendingRequestTipsUploadDocument setTips={setTips} />;
    }
  } else if (status === "Admin Approve") {
    return (
      <div
        className={`flex flex-col bg-${theme}-back px-3.5 pt-3 rounded-xl pb-2 w-full`}
      >
        <div className="flex flex-row items-center -mt-1.5">
          <img
            className="w-6 h-6"
            src={require("../../../Images/pages/layout/Wallet/statues/adminApprove.png")}
          />
          <span className={`font-${font}-bold text-lg text-blue mx-1 pt-2`}>
            {lang["admin-approve"]}
          </span>
        </div>
        <span className={`font-${font}-thin text-${oppositeTheme} mx-1`}>
          {lang["admin-approve-message"] + "."}
        </span>
      </div>
    );
  } else if (status === "Accept") {
    return (
      <div
        className={`flex flex-col bg-${theme}-back px-3.5 pt-3 rounded-xl pb-2 w-full`}
      >
        <div className="flex flex-row items-center -mt-1.5">
          <img
            className="w-6 h-6"
            src={require("../../../Images/pages/layout/Wallet/statues/accept.png")}
          />
          <span className={`font-${font}-bold text-lg text-green mx-1 pt-2`}>
            {lang["accept"]}
          </span>
        </div>
        <span className={`font-${font}-thin text-${oppositeTheme} mx-1`}>
          {lang["accept-transaction-message"] + "."}
        </span>
      </div>
    );
  } else if (status === "Reject") {
    return (
      <div
        className={`flex flex-col bg-${theme}-back px-3.5 pt-3 rounded-xl pb-2 w-full`}
      >
        <div className="flex flex-row items-center -mt-1.5">
          <img
            className="w-6 h-6"
            src={require("../../../Images/pages/layout/Wallet/statues/reject.png")}
          />
          <span className={`font-${font}-bold text-lg text-red mx-1 pt-1`}>
            {lang["reject"]}
          </span>
        </div>
        <span className={`font-${font}-thin text-${oppositeTheme} mx-1`}>
          {rejectReason}
        </span>
      </div>
    );
  }
}
