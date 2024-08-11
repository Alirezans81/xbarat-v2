import React from "react";
import CustomTable from "../../../common/CustomTable";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function ReferralList({ data }) {
  const lang = useLanguageState();
  const font = useFontState();

  const heads = [
    lang["person-code"],
    "full name",
    "registered at",
    "exchanged at",
  ];

  if (data && data.length > 0) {
    return (
      <div className="w-full flex gap-x-2 h-48">
        <CustomTable heads={heads} rows={data} haverable />
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center h-48 items-center my-auto">
        <span className={`text-4xl font-${font}-thin -mb-4`}>
          {lang["no-data"]}
        </span>
      </div>
    );
  }
}
