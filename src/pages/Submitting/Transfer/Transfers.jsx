import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import CustomDateTimeInput from "../../../components/common/CustomDateTimePicker";
import { CustomDropdown } from "../../../components/common/CustomDropdown";
import Pagination from "./Pagination";
import "../product.css";
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
          top: "6%",
          width: "70%",
          height: "90%",
          borderTopLeftRadius: "50px",
          borderBottomLeftRadius: "50px",
        }}
      >
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "7%", top: "3.5%" }}
        >
          {lang["user-sender"]}
          User sender
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "21%", top: "3.5%" }}
        >
          {lang["user-receiver"]}
          User receiver
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "34.5%", top: "3.5%" }}
        >
          {lang["currency"]}
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "53.5%", top: "3.5%" }}
        >
          {lang["amount"]}
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "73%", top: "3.5%" }}
        >
          {lang["date"]}
          date
        </div>
        <div
          className={`text-${oppositeTheme} text-base`}
          style={{ position: "absolute", left: "85.8%", top: "3.5%" }}
        >
          {lang["actions"]}
          actions
        </div>
        <Pagination transfers={Data.transfers} />
      </div>

      <div
        className={`bg-${theme} overflow-y-scroll`}
        style={{
          position: "absolute",
          left: "4%",
          top: "6%",
          width: "23.6%",
          height: "90%",
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
                  placeHolder={lang["start"]}
                  className="w-full"
                />
              </div>
              <div className="mt-2 mb-3">
                <CustomDateTimeInput
                  selectionRange={selectionRange}
                  setSelectionRange={setSelectionRange}
                  type="end"
                  placeHolder={lang["end"]}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-2xl font-mine-bold mt-3`}
            >
              {lang["sender-person-code"]}
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0">
                <input
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                  placeholder={lang["sender-person-code"]}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-2xl font-mine-bold mt-3`}
            >
              {lang["receiver-person-code"]}
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0">
                <input
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                  placeholder={lang["receiver-person-code"]}
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
            </div>
          </div>

          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-2xl font-mine-bold mt-3`}
            >
              {lang["source-amount"]}
            </span>
            <div className="mt-0 w-full">
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
                  placeholder={lang["source-amount"]}
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
