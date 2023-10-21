import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { Formik } from "formik";
import { CustomDropdown } from "../../../common/CustomDropdown";
import SubmitButton from "../../../common/SubmitButton";
import { useDirectionState } from "../../../../Providers/DirectionProvider";

export default function QuickDeposit() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const { oneEnd: oneEndDirection } = useDirectionState();

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-row mb-2">
        <img
          className="w-7 h-7 -mt-1"
          src={require("../../../../Images/pages/layout/Wallet/deposit.png")}
        />
        <span className={`text-green text-xl font-mine-bold mx-1.5`}>
          {lang["deposit"]}
        </span>
      </div>
      <Formik initialValues={{ amount: "" }}>
        {({ handleChange, handleBlur, values, handleSubmit }) => (
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="col-span-1 row-span-1 flex">
              <CustomDropdown
                label={
                  <span className="text-gray font-mine-regular">
                    {lang["currency"]}
                  </span>
                }
              ></CustomDropdown>
            </div>
            <div className="col-span-1 row-span-1 flex">
              <CustomDropdown
                label={
                  <span className="text-gray font-mine-regular">
                    {lang["location"]}
                  </span>
                }
              ></CustomDropdown>
            </div>
            <div className="col-span-1 row-span-1 flex">
              <input
                className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
                placeholder={lang["amount"]}
                name="amount"
                onBlur={handleBlur("amount")}
                onChange={handleChange("amount")}
                value={values.amount}
              />
            </div>
            <div className="col-span-1 row-span-1 flex">
              <SubmitButton
                className="w-full h-9"
                rounded="lg"
                onClick={handleSubmit}
              >
                Submit
              </SubmitButton>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
