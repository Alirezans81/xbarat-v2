import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../../apis/pages/Signup/hooks";

export default function Form({ setIsSplashScreenLoading }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const lang = useLanguageState();

  const { signup, isLoading, error } = useSignup();

  useEffect(() => {
    setIsSplashScreenLoading(isLoading);
  });
  const navigate = useNavigate();
  const navigateToWaitLink = () => {
    navigate("/wait-link");
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
      }}
      onSubmit={(values) =>
        signup(
          {
            email: values.email,
            password: values.password,
            referral_code: values.referral_code,
          },
          navigateToWaitLink
        )
      }
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
            <span className="text-blue text-3xl">{lang["sign-up"]}</span>
            <Link
              to={"/login"}
              className={`text-gray text-hover-${oppositeTheme}`}
            >
              <span>{lang["log-in"]}</span>
            </Link>
          </div>
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
          <input
            name="referral_code"
            type="text"
            placeholder={lang["referral-code-placeholder"]}
            className={`input-${theme} mt-4 focus:outline-none`}
            onChange={handleChange("referral_code")}
            onBlur={handleBlur("referral_code")}
            value={values.referral_code}
          />
          {error && (
            <span className="font-mine-thin text-red">{error.message}</span>
          )}
          <button type="submit" className="button w-full mt-10">
            {lang["submit"]}
          </button>
        </form>
      )}
    </Formik>
  );
}
