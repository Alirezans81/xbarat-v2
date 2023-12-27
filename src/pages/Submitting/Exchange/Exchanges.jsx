import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import CustomDateTimeInput from "../../../components/common/CustomDateTimePicker";
import { CustomDropdown } from "../../../components/common/CustomDropdown";
import Pagination from "./Pagination";
import "../product.css";
import Filters from "../../../components/pages/layout/Reports/pages/ExchangeHistoryScreen/Filters";
import cursor from "../assets/cursor.png";
import { useState } from "react";
const Data = require("../Data.json");

const Exchanges = () => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [selectionRange, setSelectionRange] = useState();

  const [personCode, setPersonCode] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [untilDate, setUntilDate] = useState("");
  const [sourceAmount, setSourceAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");

  return (
    <div
      className="bg-transparent  font-bold "
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "manjari-bold",
      }}
    >
      <div
        className={`bg-${theme}`}
        style={{
          position: "absolute",
          right: "0%",
          top: "17%",
          width: "67%",
          height: "80%",
          borderTopLeftRadius: "50px",
          borderBottomLeftRadius: "50px",
        }}
      >
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "7%", top: "3.5%" }}
        >
          Person Code
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "23%", top: "3.5%" }}
        >
          Source
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "36%", top: "3.5%" }}
        >
          Target
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "49%", top: "3.5%" }}
        >
          Exchanged Rate
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "73%", top: "3.5%" }}
        >
          Date
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "85.8%", top: "3.5%" }}
        >
          Actions
        </div>
        <Pagination exchanges={Data.exchanges} />
      </div>

      <div
        className={`bg-${theme} overflow-y-scroll`}
        style={{
          position: "absolute",
          left: "6.4%",
          top: "17%",
          width: "23.6%",
          height: "80%",
          paddingRight: "3%",
          paddingLeft: "3%",
          paddingTop: "1%",
          paddingBottom: "1%",
          borderRadius: "50px",
        }}
      >
        {/* <div className="text-blue text-2xl px-5 pt-5">Exchanges</div>
        <div className="text-light text-base px-10">Person Code</div>
        <div className="border-solid border-1px border-light"></div> */}
        <div className="flex flex-col">
          <span
            className={`text-${oppositeTheme} text-2xl font-mine-bold mt-3`}
          >
            {lang["person-code"]}
          </span>
          <div className=" w-full">
            <div className="w-full flex mt-0">
              <input
                className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                placeholder={lang["person-code"]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-full justify-between">
          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-2xl font-mine-bold mt-3`}
            >
              {lang["date-&-time"]}
            </span>
            <div className="mt-0 mb-1">
              <div>
                <CustomDateTimeInput
                  selectionRange={selectionRange}
                  setSelectionRange={setSelectionRange}
                  type="start"
                  placeHolder="Start"
                  className="w-full"
                />
              </div>
              <div className="mt-2 mb-3">
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
            <span
              className={`text-${oppositeTheme} text-2xl font-mine-bold mt-3`}
            >
              {lang["currency"]}
            </span>
            <div className="mt-0 w-full">
              <div className="w-full flex">
                <CustomDropdown className="justify-between" />
              </div>
              <div className="w-full flex mt-2 mb-3">
                <CustomDropdown className="justify-between" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-2xl font-mine-bold mt-3`}
            >
              {lang["amount"]}
            </span>
            <div className="mt-0 w-full">
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
                  placeholder={lang["source"]}
                />
              </div>
              <div className="w-full flex mt-2">
                <input
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                  placeholder={lang["target"]}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-2xl font-mine-bold mt-3`}
            >
              {lang["min-rate"]}
            </span>
            <div className="mt-0 w-full">
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
                  placeholder={lang["min-rate"]}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-2xl font-mine-bold mt-3 `}
            >
              {lang["max-rate"]}
            </span>
            <div className="mt-0 mb-10 w-full">
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
                  placeholder={lang["max-rate"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchanges;
