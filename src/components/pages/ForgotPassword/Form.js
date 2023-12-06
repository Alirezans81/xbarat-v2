import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../../apis/pages/ForgotPassword/hooks";
import { useSendEmail } from "../../../apis/common/email/hooks";
import { useGenerateCode } from "../../../hooks/useGenerateCode";

export default function Form({ setIsSplashScreenLoading }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const lang = useLanguageState();

  const [mode, setMode] = useState("");

  const generateCode = useGenerateCode();
  const [code, setCode] = useState();

  const { sendEmail, isLoading: sendEmailIsLoading } = useSendEmail();
  useEffect(() => {
    setIsSplashScreenLoading(sendEmailIsLoading);
  }, [sendEmailIsLoading]);

  const [codeError, setCodeError] = useState();

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  const { forgotPassword, isLoading: forgotPasswordIsLoading } =
    useForgotPassword();
  useEffect(() => {
    setIsSplashScreenLoading(forgotPasswordIsLoading);
  }, [forgotPasswordIsLoading]);

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
        verify_email_code: "",
      }}
      onSubmit={(values) => {
        if (mode === "") {
          const generatedCode = generateCode(6);
          setCode(generatedCode);

          setMode("verify");
          sendEmail({
            to_email: values.email,
            subject: lang["email-varification-subject"],
            message: lang["email-varification-message"] + ": " + generatedCode,
          });
        } else if (mode === "verify") {
          if (values.verify_email_code === code) {
            setMode("confirm");
          } else setCodeError(lang["email-varification-code-error"] + "!");
        } else if (mode === "confirm") {
          forgotPassword({ password: values.password }, navigateToLogin);
        }
      }}
    >
      {({ values, handleBlur, handleChange, handleSubmit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              validateEmail(values.email) &&
              validatePassword(values.password) &&
              validateConfirmPassword(values.password, values.confirmPassword)
            ) {
              handleSubmit(e);
            }
          }}
        >
          <div className="flex justify-between font-mine-bold items-center mb-3">
            <span className="text-blue text-3xl">
              {lang["forgot-password"]}
            </span>
            <Link
              to={"/login"}
              className={`text-gray text-hover-${oppositeTheme}`}
            >
              <span>{lang["log-in"]}</span>
            </Link>
          </div>
          {mode === "verify" && (
            <>
              <div className="flex flex-col">
                <span className={`"font-mine-thin text-${oppositeTheme}`}>
                  {lang["code-sended-to-email-message-1st"] + "."}
                </span>
                <span className={`"font-mine-thin text-${oppositeTheme}`}>
                  {lang["code-sended-to-email-message-2nd"] + ":"}
                </span>
              </div>
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
              {codeError && (
                <span className="font-mine-thin text-red">{codeError}</span>
              )}
            </>
          )}
          {mode === "" && (
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
                <span className="font-mine-thin text-red">
                  {validationErrors.email}
                </span>
              )}
            </>
          )}
          {mode === "confirm" && (
            <>
              <input
                name="password"
                type="password"
                placeholder={lang["password"]}
                className={`input-${theme} mt-4 focus:outline-none`}
                onChange={handleChange("password")}
                onBlur={(e) => {
                  validatePassword(e.target.value);
                  handleBlur(e);
                }}
                value={values.password}
              />
              {validationErrors.password && (
                <span className="font-mine-thin text-red">
                  {validationErrors.password}
                </span>
              )}
              <input
                name="confirmPassword"
                type="password"
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
                <span className="font-mine-thin text-red">
                  {validationErrors.confirmPassword}
                </span>
              )}
              {/* {error && (
                <span className="font-mine-thin text-red">{error.message}</span>
              )} */}
            </>
          )}
          <button
            onClick={handleSubmit}
            type="submit"
            className="button w-full mt-10"
          >
            {lang["submit"]}
          </button>
        </form>
      )}
    </Formik>
  );
}
