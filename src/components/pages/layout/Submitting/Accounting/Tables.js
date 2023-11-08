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

  const [deposits, setDeposits] = useState([
    {
      url: "https://smicln.ir/api/order/deposit/6686/",
      user_sender: "https://smicln.ir/api/user/mortexa/",
      wallet_tank_sender:
        "https://smicln.ir/api/wallet/tank/mortexa-wallet-test-iranian-rial-card1/",
      user_receiver: "https://smicln.ir/api/user/alireza10/",
      wallet_tank_receiver:
        "https://smicln.ir/api/wallet/tank/alireza10-w-alireza10-iranian-rial-saman01/",
      currency: "https://smicln.ir/api/currency/afghan-afghani/",
      status: "https://smicln.ir/api/status/wating-for-admin-assignment/",
      branch: null,
      city: "https://smicln.ir/api/location/city/herat/",
      code: "6686",
      amount: "1000.000000",
      document: null,
      datetime: "2023-11-07T09:32:56.784048Z",
      description: "",
      reject_description: "",
      is_deleted: false,
      person_code: "",
    },
    {
      url: "https://smicln.ir/api/order/deposit/6686/",
      user_sender: "https://smicln.ir/api/user/mortexa/",
      wallet_tank_sender:
        "https://smicln.ir/api/wallet/tank/mortexa-wallet-test-iranian-rial-card1/",
      user_receiver: "https://smicln.ir/api/user/alireza10/",
      wallet_tank_receiver:
        "https://smicln.ir/api/wallet/tank/alireza10-w-alireza10-iranian-rial-saman01/",
      currency: "https://smicln.ir/api/currency/afghan-afghani/",
      status: "https://smicln.ir/api/status/wating-for-admin-assignment/",
      branch: null,
      city: "https://smicln.ir/api/location/city/herat/",
      code: "6686",
      amount: "1000.000000",
      document: null,
      datetime: "2023-11-07T09:32:56.784048Z",
      description: "",
      reject_description: "",
      is_deleted: false,
      person_code: "",
    },
    {
      url: "https://smicln.ir/api/order/deposit/6686/",
      user_sender: "https://smicln.ir/api/user/mortexa/",
      wallet_tank_sender:
        "https://smicln.ir/api/wallet/tank/mortexa-wallet-test-iranian-rial-card1/",
      user_receiver: "https://smicln.ir/api/user/alireza10/",
      wallet_tank_receiver:
        "https://smicln.ir/api/wallet/tank/alireza10-w-alireza10-iranian-rial-saman01/",
      currency: "https://smicln.ir/api/currency/afghan-afghani/",
      status: "https://smicln.ir/api/status/wating-for-admin-assignment/",
      branch: null,
      city: "https://smicln.ir/api/location/city/herat/",
      code: "6686",
      amount: "1000.000000",
      document: null,
      datetime: "2023-11-07T09:32:56.784048Z",
      description: "",
      reject_description: "",
      is_deleted: false,
      person_code: "",
    },
  ]);
  const [withdrawals, setWithdrawals] = useState([
    {
      url: "https://smicln.ir/api/order/withdrawal/None/",
      user_sender: "https://smicln.ir/api/user/alireza10/",
      wallet_tank_sender:
        "https://smicln.ir/api/wallet/tank/alireza10-w-alireza10-iranian-rial-saman01/",
      user_receiver: null,
      wallet_tank_receiver: null,
      currency: "https://smicln.ir/api/currency/uropean-euro/",
      status: "https://smicln.ir/api/status/wating-for-admin-assignment/",
      branch: null,
      city: "https://smicln.ir/api/location/city/mashhad/",
      code: null,
      amount: "100.000000",
      document: null,
      datetime: "2023-11-07T12:14:30.403624Z",
      description: "",
      reject_description: "",
      is_deleted: false,
    },
    {
      url: "https://smicln.ir/api/order/withdrawal/None/",
      user_sender: "https://smicln.ir/api/user/alireza10/",
      wallet_tank_sender:
        "https://smicln.ir/api/wallet/tank/alireza10-w-alireza10-iranian-rial-saman01/",
      user_receiver: null,
      wallet_tank_receiver: null,
      currency: "https://smicln.ir/api/currency/uropean-euro/",
      status: "https://smicln.ir/api/status/wating-for-admin-assignment/",
      branch: null,
      city: "https://smicln.ir/api/location/city/mashhad/",
      code: null,
      amount: "100.000000",
      document: null,
      datetime: "2023-11-07T12:14:30.403624Z",
      description: "",
      reject_description: "",
      is_deleted: false,
    },
    {
      url: "https://smicln.ir/api/order/withdrawal/None/",
      user_sender: "https://smicln.ir/api/user/alireza10/",
      wallet_tank_sender:
        "https://smicln.ir/api/wallet/tank/alireza10-w-alireza10-iranian-rial-saman01/",
      user_receiver: null,
      wallet_tank_receiver: null,
      currency: "https://smicln.ir/api/currency/uropean-euro/",
      status: "https://smicln.ir/api/status/wating-for-admin-assignment/",
      branch: null,
      city: "https://smicln.ir/api/location/city/mashhad/",
      code: null,
      amount: "100.000000",
      document: null,
      datetime: "2023-11-07T12:14:30.403624Z",
      description: "",
      reject_description: "",
      is_deleted: false,
    },
  ]);

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
      <div className="flex-1 grid grid-cols-2 gap-x-20">
        <div className="col-span-1">
          <CustomTable heads={tableHead} rows={depositsTableData} />
        </div>
        <div className="col-span-1">
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
