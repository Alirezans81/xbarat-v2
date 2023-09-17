import { Formik } from "formik";
import React from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useModalDataClose } from "../../Providers/ModalDataProvider";
import SubmitButton from "../common/SubmitButton";

export default function ChangePasswordModal({ token }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const closeModal = useModalDataClose();

  const updatePassword = (values) => {
    console.log(values);
    closeModal();
  };

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmationPassword: "",
      }}
      onSubmit={(values) => updatePassword(values)}
    >
      {({ handleChange, handleBlur, values, resetForm, submitForm }) => (
        <div className="flex flex-col w-full mt-4">
          <div className="flex flex-col">
            <span className="text-gray font-mine-regular">
              {lang["current-password"]}
            </span>
            <input
              className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
              type="text"
              onChange={handleChange("currentPassword")}
              onBlur={handleBlur("currentPassword")}
              value={values.currentPassword}
            />
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-gray font-mine-regular">
              {lang["new-password"]}
            </span>
            <input
              className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
              type="text"
              onChange={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              value={values.newPassword}
            />
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-gray font-mine-regular">
              {lang["confirm-password"]}
            </span>
            <input
              className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
              type="text"
              onChange={handleChange("confirmationPassword")}
              onBlur={handleBlur("confirmationPassword")}
              value={values.confirmationPassword}
            />
          </div>
          <SubmitButton rounded="lg" className="mt-6 mb-3" onClick={submitForm}>
            {lang["submit"]}
          </SubmitButton>
        </div>
      )}
    </Formik>
  );
}
