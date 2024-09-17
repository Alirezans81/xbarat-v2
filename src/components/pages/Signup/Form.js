import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSignup, useVerifyEmail } from "../../../apis/pages/Signup/hooks";
import { useFontState } from "../../../Providers/FontProvider";
import { useToastDataSetState } from "../../../Providers/ToastDataProvider";
import { useLogin } from "../../../apis/pages/Login/hooks";

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

  const [resendButtonEnabled, setResendButtonEnabled] = useState(false);

  const sendCode = (values) => {
    signup(values, () => mode !== "submit" && setMode("submit"));
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
      showTime: 10000,
    });
  };
  const showErrorToast = (errorMessage) => {
    setToastData({
      status: "failed",
      message: errorMessage,
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };

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

  const {
    verifyEmail,
    isLoading: verifyEmailIsLoading,
    error: verifyEmailError,
  } = useVerifyEmail();
  useEffect(() => {
    setIsSplashScreenLoading(verifyEmailIsLoading);
  }, [verifyEmailIsLoading]);
  useEffect(
    () =>
      verifyEmailError &&
      verifyEmailError.response &&
      showErrorToast(Object.values(verifyEmailError.response.data).join(" ")),
    [verifyEmailError]
  );

  const { login, isLoading: loginIsLoading, error: loginError } = useLogin();
  useEffect(() => {
    setIsSplashScreenLoading(loginIsLoading);
  }, [loginIsLoading]);
  useEffect(
    () =>
      loginError &&
      loginError.response &&
      showErrorToast(Object.values(loginError.response.data).join(" ")),
    [loginError]
  );
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
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

  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const toggleAcceptedPolicy = () => setAcceptedPolicy((prev) => !prev);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        referral: "",
        verify_email_code: "",
      }}
      onSubmit={(values) => {
        if (mode === "check") {
          if (acceptedPolicy) {
            signup(
              {
                email: values.email,
                password: values.password,
                referral: values.referral,
              },
              () => setMode("submit")
            );
          } else {
            let newValidationErrors = validationErrors;
            newValidationErrors.acceptedPolicy = lang["privacy-&-policy-error"];
            setValidationErrors(newValidationErrors);
          }
        } else if (mode === "submit") {
          verifyEmail(values.verify_email_code, () => {
            showSuccessToast(
              lang["successful-signup-1st"] +
                ". " +
                lang["successful-signup-2nd"] +
                "."
            );

            login({ email: values.email, password: values.password }, () =>
              navigateToHome()
            );
          });
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
                    alt=""
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
                name="referral"
                type="text"
                placeholder={lang["referral-code-placeholder"]}
                className={`input-${theme} mt-4 focus:outline-none`}
                onChange={handleChange("referral")}
                onBlur={handleBlur("referral")}
                value={values.referral}
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
                    onClick={() => sendCode(values)}
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
            </>
          )}
          {mode === "check" && (
            <>
              <div className="w-full mt-3">
                <div className="flex gap-x-2 items-start">
                  <button
                    className="mt-0.5"
                    type="button"
                    onClick={toggleAcceptedPolicy}
                  >
                    <img
                      className="w-4 h-4 md:w-5 md:h-5"
                      src={require(`../../../Images/pages/Login/check-${acceptedPolicy}.png`)}
                    />
                  </button>
                  <a
                    href="https://xbarat.net/privacy-policy"
                    className={`flex-1 font-${font}-regular pt-1 text-blue underline underline-offset-2 text-sm`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {lang["accept-policy"] + "?"}
                  </a>
                </div>
              </div>
              {validationErrors.acceptedPolicy && (
                <span className={`font-${font}-thin text-red`}>
                  {validationErrors.acceptedPolicy}
                </span>
              )}
            </>
          )}
          <button type="submit" className={`button w-full mt-8`}>
            {lang["submit"]}
          </button>
        </form>
      )}
    </Formik>
  );
}
