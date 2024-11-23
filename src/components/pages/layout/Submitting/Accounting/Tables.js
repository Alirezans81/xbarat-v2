import React, { useState } from "react";
import SubmitButton from "../../../../common/SubmitButton";
import CustomTable from "../../../../common/CustomTable";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useConvertDateTime } from "../../../../../hooks/useConvertDateTime";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import { Checkbox, Radio } from "flowbite-react";

export default function Tables() {
  const lang = useLanguageState();
  const addComma = useAddComma();
  const convertDateTime = useConvertDateTime();

  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  const [selectedDeposit, setSelectedDeposit] = useState();
  const [selectedWithdrawal, setSelectedWithdrawal] = useState();

  const tableHead = [
    "",
    lang["person-code"],
    lang["date-&-time"],
    lang["amount"],
    "",
    "",
  ];
  const depositsTableData = deposits.map((deposit, index) => {
    let temp = {};
    temp.checkBox = (
      <Radio
        id={`deposit${index}`}
        name="deposits"
        value={deposit}
        onClick={() => setSelectedDeposit(deposit)}
      />
    );
    temp.person_code = "C233463545";
    temp.datetime = convertDateTime(deposit.datetime);
    temp.amount = addComma(+deposit.amount) + " USD";
    temp.actions = "";
    return temp;
  });
  const withdrawalsTableData = withdrawals.map((withdrawal, index) => {
    let temp = {};
    temp.checkBox = (
      <Radio
        id={`withdrawal${index}`}
        name="withdrawals"
        value={withdrawal}
        onClick={() => setSelectedWithdrawal(withdrawal)}
      />
    );
    temp.person_code = "C233463545";
    temp.datetime = convertDateTime(withdrawal.datetime);
    temp.amount = addComma(+withdrawal.amount) + " USD";
    temp.actions = "";
    return temp;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-2 grid-rows-1 gap-x-20">
        <div className="col-span-1 overflow-y-visible">
          <CustomTable heads={tableHead} rows={depositsTableData} />
        </div>
        <div className="col-span-1 flex">
          <CustomTable heads={tableHead} rows={withdrawalsTableData} />
        </div>
      </div>
      <div className="flex justify-center">
        <SubmitButton className="text-xl px-5" rounded="full">
          {lang["assign"]}
        </SubmitButton>
      </div>
    </div>
  );
}
