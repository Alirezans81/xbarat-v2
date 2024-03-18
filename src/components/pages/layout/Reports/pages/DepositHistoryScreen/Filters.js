import React, { useState } from "react";
import { useThemeState } from "../../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../../Providers/LanguageProvider";
import CustomDateTimeInput from "../../../../../common/CustomDateTimePicker";
import {
  CustomDropdown,
  CustomItem,
} from "../../../../../common/CustomDropdown";
import SubmitButton from "../../../../../common/SubmitButton";
import { useFontState } from "../../../../../../Providers/FontProvider";
import { useCurrenciesState } from "../../../../../../Providers/CurrenciesProvider";
export default function Filters({ status, setFilterCards }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [selectionRange, setSelectionRange] = useState();
  const font = useFontState();
  const currency = useCurrenciesState();
  const [filterCurrency, setFilterCurrency] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const handleFilter = () => {
    let Filter = {
      sourcAmount: parseInt(source),
      targetAmount: parseInt(target),
      currency: filterCurrency,
      status: filterStatus,
      range: selectionRange,
      clear: false,
    };
    setFilterCards(Filter);
  };
  const handleNoFilter = () => {
    let Filter = {
      clear: true,
    };
    setFilterCurrency("");
    setFilterStatus("");
    setSource("");
    setTarget("");
    setSelectionRange("");
    setFilterCards(Filter);
  };
  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="flex flex-col">
        <span className={`text-${oppositeTheme} text-2xl font-${font}-bold`}>
          {lang["date-&-time"]}
        </span>
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
      <div className="flex flex-col">
        <span className={`text-${oppositeTheme} text-2xl font-${font}-bold`}>
          {lang["currency"]}
        </span>
        <div className="mt-2 w-full">
          <div className="w-full flex">
            <CustomDropdown
              className="justify-between"
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
                  <div className="flex flex-row  w-10 h-10 justify-center">
                    <img
                      className="w-fit h-fit"
                      alt=""
                      src={data.sym_pic_gray}
                    />
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
      <div className="flex flex-col">
        <span className={`text-${oppositeTheme} text-2xl font-${font}-bold`}>
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
      <div className="flex flex-col">
        <span className={`text-${oppositeTheme} text-2xl font-${font}-bold`}>
          {lang["amount"]}
        </span>
        <div className="mt-2 w-full">
          <div className="w-full flex">
            <input
              onChange={(e) => setSource(e.target.value)}
              className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
              placeholder={lang["source"]}
              value={source}
            />
          </div>
          <div className="w-full flex mt-2">
            <input
              onChange={(e) => setTarget(e.target.value)}
              className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
              placeholder={lang["target"]}
              value={target}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-10 bg-red rounded-lg flex items-center justify-center text-white">
        <button onClick={handleNoFilter} className="w-full">
          Remove All Filters
        </button>
      </div>
      <div className="w-full h-fit">
        <SubmitButton rounded="lg" className={"w-full"} onClick={handleFilter}>
          {lang["submit"]}
        </SubmitButton>
      </div>
    </div>
  );
}
