import React from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";

export default function RequestStatus({ status }) {
  const lang = useLanguageState();

  if (status === "new") {
    return (
      <div className="flex flex-row items-center -mt-1.5">
        <img
          className="w-4 h-4"
          src={require("../../../../Images/pages/layout/Wallet/statues/new.png")}
        />
        <span className="font-mine-regular text-gray mx-1 pt-1">
          {lang["new"]}
        </span>
      </div>
    );
  } else if (status === "adminApprove") {
    return (
      <div className="flex flex-row items-center -mt-1.5">
        <img
          className="w-4 h-4"
          src={require("../../../../Images/pages/layout/Wallet/statues/adminApprove.png")}
        />
        <span className="font-mine-regular text-blue mx-1 pt-1">
          {lang["admin-approve"]}
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
        <span className="font-mine-regular text-red mx-1 pt-1">
          {lang["reject"]}
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
        <span className="font-mine-regular text-green mx-1 pt-1">
          {lang["accept"]}
        </span>
      </div>
    );
  } else if (status === "adminAssign") {
    return (
      <div className="flex flex-row items-center -mt-1.5">
        <img
          className="w-4 h-4"
          src={require("../../../../Images/pages/layout/Wallet/statues/adminAssign.png")}
        />
        <span className="font-mine-regular text-blue mx-1 pt-1">
          {lang["admin-assign"]}
        </span>
      </div>
    );
  } else if (status === "uploadDocument") {
    return (
      <div className="flex flex-row items-center -mt-1.5">
        <img
          className="w-4 h-4"
          src={require("../../../../Images/pages/layout/Wallet/statues/uploadDocument.png")}
        />
        <span className="font-mine-regular text-blue mx-1 pt-1">
          {lang["upload-document"]}
        </span>
      </div>
    );
  }
}
