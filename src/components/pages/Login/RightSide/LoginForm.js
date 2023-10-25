import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../../../apis/pages/Login/hooks";

export default function LoginForm({ setIsSplashScreenLoading }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const lang = useLanguageState();
  const { one: direction } = useDirectionState();

  const { login, isLoading, error } = useLogin();
  useEffect(() => {
    setIsSplashScreenLoading(isLoading);
  });
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };

  const [rememberMeCheck, setRememberMeCheck] = useState(false);
  const ToggleRememberMeCheck = () => setRememberMeCheck(!rememberMeCheck);

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

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => login(values, navigateToHome, rememberMeCheck)}
    >
      {({ values, handleBlur, handleChange, handleSubmit }) => (
        <form
          className="p-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              validateEmail(values.email) &&
              validatePassword(values.password)
            ) {
              handleSubmit(e);
            }
          }}
        >
          <div className="flex justify-between font-mine-bold items-center mb-3">
            <span className="text-blue text-3xl">{lang["log-in"]}</span>
            <Link
              to={"/signup"}
              className={`text-gray text-hover-${oppositeTheme}`}
            >
              <span>{lang["sign-up"]}</span>
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
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <button type="button" onClick={ToggleRememberMeCheck}>
                <img
                  className="w-4 h-4"
                  src={require(`../../../../Images/pages/Login/check-${rememberMeCheck}.png`)}
                />
              </button>
              <span
                className={`font-mine-regular pt-1 m${direction}-1 text-${oppositeTheme} text-sm`}
              >
                {lang["remember-me"]}
              </span>
            </div>
            <Link to={"/forgot-password"}>
              <span className="font-mine-regular text-blue text-sm">
                {lang["forgot-password"]}
              </span>
            </Link>
          </div>
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
