import React, { useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import Transfer from "./Transfer";
const TutorialModal = () => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [tutorial, setTutorial] = useState({ title: "", status: "" });
  const temp = ">";
  const context =
    "If You Wish To Deposit Your Money Into Xbarat You Can Do So By 1.Enter Your Currency  2.Enter The Amount Of Money You Wish To Deposit 3.Click In Deposit 4.Send A Picture Of Your Recipt ";
  console.log(tutorial);
  return (
    <>
      {/* Main */}
      <div
        className={
          tutorial.title === ""
            ? `py-5 grid grid-cols-9 grid-rows-10 text-${oppositeTheme} gap-x-5 h-[30rem] overflow-y-scroll`
            : "hidden"
        }
      >
        <button
          onClick={() => setTutorial({ title: "Deposit", status: "" })}
          className={`h-fit col-span-3 row-span-10 flex flex-col justify-start items-center bg-${theme}-back rounded-2xl py-5 px-4`}
        >
          <span className="bg-blue rounded-2xl w-full flex justify-center py-2">
            Deposit
          </span>
          <span className="w-[5rem] md:w-[12rem] bg-dark rounded-2xl p-5 text-start mt-5">
            {context}
          </span>
        </button>
        <button
          onClick={() => setTutorial({ title: "Withdraw", status: "" })}
          className={`h-fit col-span-3 row-span-10 flex flex-col justify-start items-center bg-${theme}-back rounded-2xl py-5 px-4`}
        >
          <span className="bg-blue rounded-2xl w-full flex justify-center py-2">
            Withdraw
          </span>
          <span className="w-[5rem] md:w-[12rem] bg-dark rounded-2xl p-5 text-start mt-5">
            {context}
          </span>
        </button>
        <button
          onClick={() => setTutorial({ title: "Transfer", status: "" })}
          className={`h-fit col-span-3 row-span-10 flex flex-col justify-start items-center bg-${theme}-back rounded-2xl py-5 px-4`}
        >
          <span className="bg-blue rounded-2xl w-full flex justify-center py-2">
            Transfer
          </span>
          <span className=" w-[5rem] md:w-[12rem] bg-dark rounded-2xl p-5 text-start mt-5">
            {context}
          </span>
        </button>
      </div>

      {/* Deposit */}
      <div
        className={
          tutorial.title === "Deposit"
            ? `grid grid-cols-12 grid-rows-6 text-${oppositeTheme} gap-x-5 h-[30rem] overflow-y-scroll gap-y-2`
            : "hidden"
        }
      >
        <div className="col-span-12 row-span-1 flex flex-row justify-start items-center gap-x-5">
          <button className="text-base">{tutorial.title}</button>
          <span className="text-blue">{temp}</span>
          <button className="text-base">{tutorial.status}</button>
        </div>
        <div className="flex row-span-5 col-span-12 h-full">
          <Deposit setTutorial={setTutorial} />
        </div>
      </div>

      {/* Withdraw */}
      <div
        className={
          tutorial.title === "Withdraw"
            ? `bg-red. py-5 grid grid-cols-9 grid-rows-10 text-${oppositeTheme} gap-x-5 h-[30rem] overflow-y-scroll gap-y-2`
            : "hidden"
        }
      >
        <div className="col-span-9 row-span-1 flex flex-row justify-start items-center gap-x-5">
          <button className="text-bold text-base ">{tutorial.title}</button>
          <span className="text-blue">{temp}</span>
        </div>
        <div className="row-span-9 col-span-9 flex ">
          <Withdraw />
        </div>
        {/* <Withdraw /> */}
      </div>

      {/* Transfer */}
      <div
        className={
          tutorial.title === "Transfer"
            ? `bg-red. py-5 grid grid-cols-9 grid-rows-10 text-${oppositeTheme} gap-x-5 h-[30rem] overflow-y-scroll gap-y-2`
            : "hidden"
        }
      >
        <div className="col-span-9 row-span-1 flex flex-row justify-start items-center gap-x-5">
          <button className="text-bold text-base ">{tutorial.title}</button>
          <span className="text-blue">{temp}</span>
        </div>
        <div className="row-span-9 col-span-9 flex ">
          <Transfer />
        </div>
        {/* <Transfer /> */}
      </div>
    </>
  );
};

export default TutorialModal;
