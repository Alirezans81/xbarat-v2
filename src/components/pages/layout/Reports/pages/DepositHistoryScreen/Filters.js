import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    console.log(filterCurrency);
    handleFilter();
  }, [filterCurrency, filterStatus, selectionRange]);
  const handleFilter = () => {
    let Filter = {
      currency: filterCurrency,
      status: filterStatus,
      range: selectionRange,
    };
    console.log(Filter);

    setFilterCards(Filter);
    console.log(Filter);
  };

  return (
    <div className="flex flex-col w-full h-full justify-start">
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
      <div className="flex flex-col mt-5">
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
      <div className="flex flex-col mt-5">
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
    </div>
  );
}
