import React from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function RequestStatus({ status, isLarge }) {
  const lang = useLanguageState();
  const font = useFontState();

  if (status === "admin_assign") {
    return (
      <div className="flex flex-row items-center -mt-1.5">
        <img
          className="w-4 h-4"
          src={require("../../../../Images/pages/layout/Wallet/statues/adminAssign.png")}
        />
        <span className={`font-${font}-regular text-blue mx-1 pt-1`}>
          {lang["admin-assign"]}
        </span>
      </div>
    );
  } else if (status === "upload_document") {
    return (
      <div className="flex flex-row items-center -mt-1.5">
        <img
          className="w-4 h-4"
          src={require("../../../../Images/pages/layout/Wallet/statues/uploadDocument.png")}
        />
        <span className={`font-${font}-regular text-blue mx-1 pt-1`}>
          {lang["upload-document"]}
        </span>
      </div>
    );
  } else if (status === "admin_approve") {
    return (
      <div className="flex flex-row items-center -mt-1.5">
        <img
          className="w-4 h-4"
          src={require("../../../../Images/pages/layout/Wallet/statues/adminApprove.png")}
        />
        <span className={`font-${font}-regular text-blue mx-1 pt-1`}>
          {lang["admin-approve"]}
        </span>
      </div>
    );
  } else if (status === "accept") {
    return (
      <div className="flex flex-row items-center -mt-1.5">
        <img
          className="w-4 h-4"
          src={require("../../../../Images/pages/layout/Wallet/statues/accept.png")}
        />
        <span className={`font-${font}-regular text-green mx-1 pt-1`}>
          {lang["accept"]}
        </span>
      </div>
    );
  } else if (status === "reject") {
    return (
      <div className="flex flex-row items-center -mt-1.5">
        <img
          className="w-4 h-4"
          src={require("../../../../Images/pages/layout/Wallet/statues/reject.png")}
        />
        <span className={`font-${font}-regular text-red mx-1 pt-1`}>
          {lang["reject"]}
        </span>
      </div>
    );
  }
}
