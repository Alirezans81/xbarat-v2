import React, { useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import Transfer from "./Transfer";
const TutorialModal = () => {
  const lang = useLanguageState();
  const TutorialContext = lang["ContextTutorial"];
  const deposit = TutorialContext && TutorialContext.Deposit;
  const withdraw = TutorialContext && TutorialContext.Withdraw;
  const transfer = TutorialContext && TutorialContext.Transfer;

  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [tutorial, setTutorial] = useState("");
  var w = window.innerWidth;
  var cols = w <= 640 ? 1 : w > 640 && w <= 768 ? 2 : 3;
  return (
    <>
      {/* Main */}
      <div
        className={
          tutorial === ""
            ? `py-5 grid grid-cols-${cols} grid-rows-10 text-${oppositeTheme} gap-x-5 h-[25rem] w-[${
                cols * 5
              }rem] overflow-y-scroll animate-upward`
            : "hidden"
        }
      >
        <button
          onClick={() => setTutorial("Deposit")}
          className={`h-fit  row-span-10 flex flex-col justify-start items-center bg-${theme}-back rounded-2xl py-5 px-4 mt-5`}
        >
          <span className="bg-blue text-light rounded-2xl w-full flex justify-center py-2">
            Deposit
          </span>
          <span
            className={`w-full md:w-[12rem] bg-${theme} rounded-2xl p-5 text-start mt-5`}
          >
            {deposit.context[0]}
            <br />
            {deposit.context[1]}
            <br />
            {deposit.context[2]}
            <br />
            {deposit.context[3]}
            <br />
            {deposit.context[4]}
            <br />
            {deposit.context[5]}
          </span>
        </button>
        <button
          onClick={() => setTutorial("Withdraw")}
          className={`h-fit  row-span-10 flex flex-col justify-start items-center bg-${theme}-back rounded-2xl py-5 px-4 mt-5`}
        >
          <span className="bg-blue text-light rounded-2xl w-full flex justify-center py-2">
            Withdraw
          </span>
          <span
            className={`w-full md:w-[12rem] bg-${theme} rounded-2xl p-5 text-start mt-5`}
          >
            {withdraw.context[0]}
            <br />
            {withdraw.context[1]}
            <br />
            {withdraw.context[2]}
            <br />
            {withdraw.context[3]}
            <br />
            {withdraw.context[4]}
            <br />
            {withdraw.context[5]}
          </span>
        </button>
        <button
          onClick={() => setTutorial("Transfer")}
          className={`h-fit  row-span-10 flex flex-col justify-start items-center bg-${theme}-back rounded-2xl py-5 px-4 mt-5`}
        >
          <span className="bg-blue text-light rounded-2xl w-full flex justify-center py-2">
            Transfer
          </span>
          <span
            className={`w-full md:w-[12rem] bg-${theme} rounded-2xl p-5 text-start mt-5`}
          >
            {transfer.context[0]}
            <br />
            {transfer.context[1]}
            <br />
            {transfer.context[2]}
            <br />
            {transfer.context[3]}
            <br />
            {transfer.context[4]}
            <br />
            {transfer.context[5]}
          </span>
        </button>
      </div>

      {/* Deposit */}
      <div
        className={
          tutorial === "Deposit"
            ? `grid grid-cols-12 grid-rows-6 text-${oppositeTheme} gap-x-5 h-[30rem] w-fit max-h-[35rem] overflow-y-scroll gap-y-2 animate-upward`
            : "hidden"
        }
      >
        <div className="col-span-12 row-span-1 flex flex-row justify-start items-center gap-x-5 animate-rightward">
          <button
            onClick={() => setTutorial("")}
            className="text-base bg-blue text-light rounded-2xl py-2 px-5"
          >
            {tutorial}
          </button>
        </div>
        <div className={`flex row-span-5 col-span-12 h-full `}>
          <Deposit deposit={deposit} />
        </div>
      </div>

      {/* Withdraw */}
      <div
        className={
          tutorial === "Withdraw"
            ? `grid grid-cols-12 grid-rows-6 text-${oppositeTheme} gap-x-5 h-[30rem] overflow-y-scroll gap-y-2 animate-upward`
            : "hidden"
        }
      >
        <div className="col-span-12 row-span-1 flex flex-row justify-start items-center gap-x-5 animate-rightward">
          <button
            onClick={() => setTutorial("")}
            className="text-base bg-blue text-light rounded-2xl py-2 px-5"
          >
            {tutorial}
          </button>
        </div>
        <div className={`flex row-span-5 col-span-12 h-full `}>
          <Withdraw withdraw={withdraw} />
        </div>
      </div>

      {/* Transfer */}
      <div
        className={
          tutorial === "Transfer"
            ? `grid grid-cols-12 grid-rows-6 text-${oppositeTheme} gap-x-5 h-[30rem] overflow-y-scroll gap-y-2 animate-upward`
            : "hidden"
        }
      >
        <div className="col-span-12 row-span-1 flex flex-row justify-start items-center gap-x-5 animate-rightward">
          <button
            onClick={() => setTutorial("")}
            className="text-base bg-blue text-light rounded-2xl py-2 px-5"
          >
            {tutorial}
          </button>
        </div>
        <div className={`flex row-span-5 col-span-12 h-full `}>
          <Transfer transfer={transfer} />
        </div>
      </div>
    </>
  );
};

export default TutorialModal;
