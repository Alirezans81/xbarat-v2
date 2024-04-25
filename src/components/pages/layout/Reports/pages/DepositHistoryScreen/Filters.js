import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";
import CustomDateTimeInput from "../../../../../common/CustomDateTimePicker";
import {
  CustomDropdown,
  CustomItem,
} from "../../../../../common/CustomDropdown";
import refresh from "../../../../../../Images/rotate-arrow.png";
import SubmitButton from "../../../../../common/SubmitButton";
import { useFontState } from "../../../../../../Providers/FontProvider";
import { useCurrenciesState } from "../../../../../../Providers/CurrenciesProvider";
import { useStatusesState } from "../../../../../../Providers/StatusesProvider";

export default function Filters({ setFilterCards }) {
  const theme = useThemeState();
  const status = useStatusesState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [selectionRange, setSelectionRange] = useState();
  const font = useFontState();
  const currency = useCurrenciesState();
  const [filterCurrency, setFilterCurrency] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const handleFilter = () => {
    const Filter = {
      currency: filterCurrency,
      status: filterStatus,
      range: selectionRange,
      clear: false,
    };
    console.log(Filter);

    setFilterCards(Filter);
  };
  const handleReset = () => {
    setFilterCurrency("");
    setFilterStatus("");
    setSelectionRange("");
    const Filter = {
      clear: true,
    };
    setFilterCards(Filter);
  };

  return (
    <div className="flex flex-col w-full h-full justify-start pb-16 md:pb-2.5">
      <div className="flex flex-col">
        <div className="w-full flex flex-row items-center">
          <div className="flex-1 flex justify-start items-end">
            <span
              className={`text-${oppositeTheme} text-xl font-${font}-bold mt-1`}
            >
              {lang["date-&-time"]}
            </span>
          </div>
          <div className="w-5/12 flex justify-end items-start">
            <button
              className="w-full h-full flex justify-end"
              rounded={"3xl"}
              onClick={handleReset}
            >
              <img className="w-6 h-6" src={refresh} alt="" />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <div>
            <CustomDateTimeInput
              selectionRange={selectionRange}
              setSelectionRange={setSelectionRange}
              type="start"
              placeHolder="Start"
              className="w-full"
            />
          </div>
          <div className="mt-2">
            <CustomDateTimeInput
              selectionRange={selectionRange}
              setSelectionRange={setSelectionRange}
              type="end"
              placeHolder="End"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 ">
        <span className={`text-${oppositeTheme} text-xl font-${font}-bold`}>
          {lang["currency"]}
        </span>
        <div className="mt-2 w-full">
          <div className="w-full flex">
            <CustomDropdown
              className="justify-between w-fit"
              label={
                <div>
                  <div className={filterCurrency ? "flex flex-row" : "hidden"}>
                    <img
                      className={`w-7 h-7 -mt-1.5 `}
                      src={filterCurrency.sym_pic_gray}
                      alt=""
                    />
                    <span>{filterCurrency.abbreviation}</span>
                  </div>
                  <div className={filterCurrency ? "hidden" : "flex flex-row"}>
                    <span></span>
                  </div>
                </div>
              }
            >
              {currency.map((data) => (
                <CustomItem
                  onClick={() => setFilterCurrency(data)}
                  className={`bg-${theme} h-fit`}
                >
                  <div className="flex flex-row w-16 h-10 justify-center">
                    <img className="w-10 h-10" alt="" src={data.sym_pic_gray} />
                    <span className=" w-fit h-fit mt-3 ml-2">
                      {data.abbreviation}
                    </span>
                  </div>
                </CustomItem>
              ))}
            </CustomDropdown>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <span className={`text-${oppositeTheme} text-xl font-${font}-bold`}>
          {lang["status"]}
        </span>
        <div className="mt-2 w-full">
          <div className="w-full flex">
            <CustomDropdown
              className="justify-between"
              label={
                <div>
                  <div
                    className={
                      filterStatus
                        ? "flex justify-center items-center"
                        : "hidden"
                    }
                  >
                    <span>{filterStatus.title}</span>
                  </div>
                </div>
              }
            >
              {status ? (
                status.map((data) => (
                  <CustomItem
                    onClick={() => setFilterStatus(data)}
                    className={`bg-${theme} h-fit`}
                  >
                    <div className="flex w-full h-full justify-center">
                      <span className=" w-full h-full flex justify-center items-center ">
                        {data.title}
                      </span>
                    </div>
                  </CustomItem>
                ))
              ) : (
                <div>
                  Unfortunately This Service Is Not Available At This Time
                </div>
              )}
            </CustomDropdown>
          </div>
        </div>
      </div>
      <div
        className={"w-full mt-auto justify-start align-center flex flex-col"}
      >
        <SubmitButton
          rounded={"3xl"}
          className={"w-full py-1"}
          onClick={handleFilter}
        >
          {lang["submit"]}
        </SubmitButton>
      </div>
    </div>
  );
}
