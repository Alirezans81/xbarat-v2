import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../../apis/pages/Signup/hooks";
import { useCheckEmail, useSendEmail } from "../../../apis/common/email/hooks";
import { useGenerateCode } from "../../../hooks/useGenerateCode";
import { useFontState } from "../../../Providers/FontProvider";
import { useToastDataSetState } from "../../../Providers/ToastDataProvider";

export default function Form({ setIsSplashScreenLoading }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const lang = useLanguageState();
  const font = useFontState();
  const setToastData = useToastDataSetState();

  const [showPassword, setShowPasswprd] = useState(false);
  const toggleShowPassword = () => {
    setShowPasswprd(!showPassword);
  };

  const [mode, setMode] = useState("check");

  const generateCode = useGenerateCode();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState();

  const [resendButtonEnabled, setResendButtonEnabled] = useState(false);

  const sendCode = (email) => {
    const generatedCode = generateCode(6);
    setCode(generatedCode);
    process.env.REACT_APP_MODE === "DEPLOYMENT"
      ? sendEmail(
          {
            to_email: email,
            subject: lang["email-varification-subject"],
            message: lang["email-varification-message"] + ": " + generatedCode,
          },
          () => mode !== "submit" && setMode("submit")
        )
      : console.log("generatedCode: ", generatedCode);
    setResendButtonEnabled(false);
    setTimeout(() => setResendButtonEnabled(true), 60000);
    mode !== "submit" && setMode("submit");
  };

  const showSuccessToast = (succesMessage) => {
    setToastData({
      status: "success",
      message: succesMessage,
      canClose: true,
      isOpen: true,
      showTime: 5000,
    });
  };
  const showErrorToast = (errorMessage) => {
    setToastData({
      status: "failed",
      message: errorMessage,
      canClose: true,
      isOpen: true,
      showTime: 5000,
    });
  };

  const {
    checkEmail,
    isLoading: checkEmailIsLoading,
    error: checkEmailError,
  } = useCheckEmail();
  useEffect(() => {
    setIsSplashScreenLoading(checkEmailIsLoading);
  }, [checkEmailIsLoading]);

  const {
    sendEmail,
    isLoading: sendEmailIsLoading,
    error: sendEmailError,
  } = useSendEmail();
  useEffect(() => {
    setIsSplashScreenLoading(sendEmailIsLoading);
  }, [sendEmailIsLoading]);
  useEffect(() => {
    sendEmailError &&
      sendEmailError.response &&
      showErrorToast(Object.values(sendEmailError.response.data).join(" "));
  }, [sendEmailError]);

  const {
    signup,
    isLoading: signupIsLoading,
    error: signupError,
  } = useSignup();
  useEffect(() => {
    setIsSplashScreenLoading(signupIsLoading);
  }, [signupIsLoading]);
  useEffect(
    () =>
      signupError &&
      signupError.response &&
      showErrorToast(Object.values(signupError.response.data).join(" ")),
    [signupError]
  );

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  const [validationErrors, setValidationErrors] = useState({});
  const validateEmail = (email) => {
    let newValidationErrors = validationErrors;
    let result = true;

    if (!email) {
      newValidationErrors.email = lang["email-empty-error"];
      result = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newValidationErrors.email = lang["email-invalid-error"];
      result = false;
    } else {
      newValidationErrors.email = null;
    }

    setValidationErrors(newValidationErrors);
    return result;
  };
  const passwordContainsCheck = (password) => {
    if (
      !Boolean(password.match(/[a-z]/)) ||
      !Boolean(password.match(/[A-Z]/)) ||
      !Boolean(password.match(/[0-9]/)) ||
      !Boolean(password.match(/[!@#$%*?]/))
    ) {
      let newValidationErrors = validationErrors;
      newValidationErrors.password = lang["password-contain-error"] + "!";
      new setValidationErrors(newValidationErrors);
      return false;
    }
    return true;
  };
  const validatePassword = (password) => {
    let newValidationErrors = validationErrors;
    let result = true;

    if (!password) {
      newValidationErrors.password = lang["password-empty-error"];
      result = false;
    } else {
      newValidationErrors.password = null;
    }

    setValidationErrors(newValidationErrors);
    return result;
  };
  const validateConfirmPassword = (password, confirmPassword) => {
    let newValidationErrors = validationErrors;
    let result = true;

    if (password && !confirmPassword) {
      newValidationErrors.confirmPassword = lang["password-empty-error"];
      result = false;
    } else if (password && confirmPassword !== password) {
      newValidationErrors.confirmPassword = lang["password-match-error"];
      result = false;
    } else {
      newValidationErrors.confirmPassword = null;
    }

    setValidationErrors(newValidationErrors);
    return result;
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        referral_code: "",
        verify_email_code: "",
      }}
      onSubmit={(values) => {
        if (mode === "check") {
          checkEmail(
            values.email,
            () => showErrorToast(lang["email-exists-error"]),
            null,
            () => sendCode(values.email)
          );
        } else if (mode == "submit") {
          if (values.verify_email_code === code) {
            signup(
              {
                email: values.email,
                password: values.password,
                referral_code: values.referral_code,
              },
              () => {
                showSuccessToast(
                  lang["successful-signup-1st"] +
                    ". " +
                    lang["successful-signup-2nd"] +
                    "."
                );
                navigateToLogin();
              }
            );
          } else setCodeError(lang["email-varification-code-error"] + ".");
        }
      }}
    >
      {({ values, handleBlur, handleChange, handleSubmit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (mode === "check" && validateEmail(values.email)) {
              handleSubmit(e);
            } else if (
              mode === "password" &&
              validatePassword(values.password) &&
              validateConfirmPassword(
                values.password,
                values.confirmPassword
              ) &&
              passwordContainsCheck(values.password)
            ) {
              handleSubmit(e);
            } else if (mode === "submit") {
              handleSubmit(e);
            }
          }}
        >
          <div
            className={`flex justify-between font-${font}-bold items-center mb-3`}
          >
            <span className="text-blue text-3xl">{lang["sign-up"]}</span>
            <Link
              to={"/login"}
              className={`text-gray text-hover-${oppositeTheme}`}
            >
              <span>{lang["log-in"]}</span>
            </Link>
          </div>
          {mode === "check" && (
            <>
              <input
                name="email"
                type="email"
                placeholder={lang["email"]}
                className={`input-${theme} mt-4 focus:outline-none`}
                onChange={handleChange("email")}
                onBlur={(e) => {
                  validateEmail(e.target.value);
                  handleBlur(e);
                }}
                value={values.email}
              />
              {validationErrors.email && (
                <span className={`font-${font}-thin text-red`}>
                  {validationErrors.email}
                </span>
              )}
              <div className="relative md:w-96">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={lang["password"]}
                  className={`input-${theme} mt-4 focus:outline-none`}
                  onChange={handleChange("password")}
                  onBlur={(e) => {
                    validatePassword(e.target.value);
                    passwordContainsCheck(e.target.value);
                    handleBlur(e);
                  }}
                  value={values.password}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute top-6 right-3"
                >
                  <img
                    className="w-7 h-7"
                    src={
                      showPassword
                        ? require("../../../Images/common/preview.png")
                        : require("../../../Images/common/preview-disabled.png")
                    }
                  />
                </button>
              </div>
              {validationErrors.password && (
                <span className={`font-${font}-thin text-red`}>
                  {validationErrors.password}
                </span>
              )}
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder={lang["confirm-password"]}
                className={`input-${theme} mt-4 focus:outline-none`}
                onChange={handleChange("confirmPassword")}
                onBlur={(e) => {
                  validateConfirmPassword(values.password, e.target.value);
                  handleBlur(e);
                }}
                value={values.confirmPassword}
              />
              {validationErrors.confirmPassword && (
                <span className={`font-${font}-thin text-red`}>
                  {validationErrors.confirmPassword}
                </span>
              )}
              <input
                name="referral_code"
                type="text"
                placeholder={lang["referral-code-placeholder"]}
                className={`input-${theme} mt-4 focus:outline-none`}
                onChange={handleChange("referral_code")}
                onBlur={handleBlur("referral_code")}
                value={values.referral_code}
              />
            </>
          )}
          {mode === "submit" && (
            <>
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center gap-x-1.5">
                  <span className={`font-${font}-thin text-${oppositeTheme}`}>
                    {lang["code-sended-to-email-message-1st"]}
                  </span>
                  <span className={`font-${font}-regular text-blue`}>
                    {values.email}
                  </span>
                </div>
                <span className={`font-${font}-thin text-${oppositeTheme}`}>
                  {lang["code-sended-to-email-message-2nd"] + ":"}
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="relative">
                  <input
                    name="verify_email_code"
                    type="verify_email_code"
                    placeholder={lang["code"]}
                    className={`input-${theme} mt-4 focus:outline-none`}
                    onChange={handleChange("verify_email_code")}
                    onBlur={(e) => {
                      validateEmail(e.target.value);
                      handleBlur(e);
                    }}
                    value={values.verify_email_code}
                  />
                  <button
                    type="button"
                    disabled={!resendButtonEnabled}
                    onClick={() => sendCode(values.email)}
                  >
                    <img
                      className="absolute right-2.5 top-6 w-7 h-7"
                      src={
                        resendButtonEnabled
                          ? require("../../../Images/pages/Signup/resend.png")
                          : require("../../../Images/pages/Signup/resend-disabled.png")
                      }
                    />
                  </button>
                </div>
                <span className={`font-${font}-regular text-gray`}>
                  {"You can click on resend after 1 minute."}
                </span>
              </div>
              {codeError && (
                <span className={`font-${font}-thin text-red`}>
                  {codeError}
                </span>
              )}
            </>
          )}
          <button type="submit" className="button w-full mt-10">
            {lang["submit"]}
          </button>
        </form>
      )}
    </Formik>
  );
}
