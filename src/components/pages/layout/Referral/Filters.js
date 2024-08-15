import React, { useState } from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import CustomDateTimeInput from "../../../common/CustomDateTimePicker";
import { Formik } from "formik";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import SubmitButton from "../../../common/SubmitButton";

export default function Filters() {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const [selectionRange, setSelectionRange] = useState();

  return (
    <div className="flex flex-col justify-between h-full gap-y-3 md:gap-y-0">
      <span className={`text-xl font-${font}-bold`}>{lang["referral"]}</span>
      <Formik initialValues={{ person_code: "" }} onSubmit={(values) => {}}>
        {({ handleBlur, handleChange, values, handleSubmit }) => (
          <>
            <div className="flex flex-col gap-y-2">
              <span className="text-xl -mb-1">{lang["date-&-time"]}</span>
              <CustomDateTimeInput
                selectionRange={selectionRange}
                setSelectionRange={setSelectionRange}
                type="start"
                placeHolder={lang["start"]}
                className="w-full"
              />
              <CustomDateTimeInput
                selectionRange={selectionRange}
                setSelectionRange={setSelectionRange}
                type="end"
                placeHolder={lang["end"]}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-1.5">
              <span className="text-xl -mb-1">{lang["person-code"]}</span>
              <input
                name="person_code"
                className={`w-full hide-input-arrows bg-${theme} font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                placeholder="CNOoslDU0027539"
                type="text"
                onChange={handleChange("person_code")}
                onBlur={handleBlur("person_code")}
                value={values.person_code}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <SubmitButton
              rounded="lg"
              className="mt-3 h-10"
              onClick={handleSubmit}
            >
              {lang["submit"]}
            </SubmitButton>
          </>
        )}
      </Formik>
    </div>
  );
}
