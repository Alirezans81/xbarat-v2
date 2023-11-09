import React, { useState } from "react";
import SelectType from "./TransactionModal/SelectType";
import Deposit from "./TransactionModal/Deposit";
import Withdrawal from "./TransactionModal/Withdrawal";
import Transfer from "./TransactionModal/Transfer";

export default function TransactionModal({ data, defaultType }) {
  const [type, selectType] = useState(defaultType || "deposit");

  return (
    <div className="">
      <SelectType type={type} selectType={selectType} />
      {type === "deposit" && <Deposit data={data} />}
      {type === "withdrawal" && <Withdrawal data={data} />}
      {type === "transfer" && <Transfer data={data} />}
    </div>
  );
}
