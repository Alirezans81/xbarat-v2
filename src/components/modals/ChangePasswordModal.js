import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useModalDataClose } from "../../Providers/ModalDataProvider";
import { useToastDataSetState } from "../../Providers/ToastDataProvider";
import SubmitButton from "../common/SubmitButton";
import { useFontState } from "../../Providers/FontProvider";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useChangePassword } from "../../apis/modal/ChangePasswordModal/hooks";

export default function ChangePasswordModal() {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const closeModal = useModalDataClose();
  const setLoading = useIsLoadingSplashScreenSetState();
  const setToastData = useToastDataSetState();

  const [error, setError] = useState();

  const {
    changePassword,
    isLoading,
    error: changePasswordError,
  } = useChangePassword();
  useEffect(() => setLoading(isLoading), [isLoading]);
  useEffect(
    () =>
      changePasswordError &&
      changePasswordError.response &&
      setError(Object.values(changePasswordError.response.data).join(" ")),
    [changePasswordError]
  );

  const openPasswordUpdatedToast = () => {
    setToastData({
      status: "success",
      message: lang["password-updated"] + ".",
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };

  const updatePassword = (values) => {
    changePassword(
      {
        password: values.currentPassword,
        new_password: values.newPassword,
      },
      () => {
        closeModal();
        openPasswordUpdatedToast();
      }
    );
  };

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmationPassword: "",
      }}
      onSubmit={(values) => {
        if (values.newPassword) {
          if (values.newPassword === values.confirmationPassword) {
            if (
              Boolean(values.newPassword.match(/[a-z]/)) &&
              Boolean(values.newPassword.match(/[A-Z]/)) &&
              Boolean(values.newPassword.match(/[0-9]/)) &&
              Boolean(values.newPassword.match(/[!@#$%*?]/))
            ) {
              updatePassword(values);
            } else {
              setError(lang["password-contain-error"] + "!");
            }
          } else {
            setError(lang["password-match-error"] + "!");
          }
        } else {
          setError(lang["password-empty-error"] + "!");
        }
      }}
    >
      {({ handleChange, handleBlur, values, resetForm, submitForm }) => (
        <div className="flex flex-col w-[17rem] mt-4">
          <div className="flex flex-col">
            <span className={`text-gray font-${font}-regular`}>
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
            <span className={`text-gray font-${font}-regular`}>
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
            <span className={`text-gray font-${font}-regular`}>
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
          {error && (
            <span className={`text-red font-${font}-thin mt-2`}>{error}</span>
          )}
          <SubmitButton
            rounded="lg"
            className="mt-5 mb-3 h-10"
            onClick={submitForm}
          >
            {lang["submit"]}
          </SubmitButton>
        </div>
      )}
    </Formik>
  );
}
