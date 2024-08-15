import React from "react";
import CustomTable from "../../../common/CustomTable";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import { useConvertDateTime } from "../../../../hooks/useConvertDateTime";

export default function ReferralList({ data, currency }) {
  const lang = useLanguageState();
  const font = useFontState();

  const convertDateTime = useConvertDateTime();

  const heads = [
    lang["person-code"],
    lang["full-name"],
    lang["registered-at"],
    lang["exchanged-at"],
    lang["total-benefit"],
  ];

  if (data && data.length > 0) {
    return (
      <div className="flex flex-col md:pb-0 pb-5 h-[35dvh] w-[43rem] md:w-full px-6 pt-5">
        <CustomTable
          heads={heads}
          rows={data.map((e) => {
            let temp = {};
            temp.code = e.code;
            temp.full_name = e.full_name;
            temp.date_verify = convertDateTime(e.date_verify);
            temp.exchange_at = e.exchange_at || "-";
            temp.total_benefit =
              currency.symbol + (+e.amount_signup + +e.amount_exchange);

            return temp;
          })}
        />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center h-[35dvh] items-center my-auto">
        <span className={`text-4xl font-${font}-thin -mb-6`}>
          {lang["no-data"]}
        </span>
      </div>
    );
  }
}
