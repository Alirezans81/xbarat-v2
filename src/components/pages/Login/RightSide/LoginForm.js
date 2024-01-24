import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../../../apis/pages/Login/hooks";
import { useFontState } from "../../../../Providers/FontProvider";
import { useToastDataSetState } from "../../../../Providers/ToastDataProvider";

export default function LoginForm({ setIsSplashScreenLoading }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const lang = useLanguageState();
  const font = useFontState();
  const { one: direction } = useDirectionState();
  const setToastData = useToastDataSetState();

  const [showPassword, setShowPasswprd] = useState(false);
  const toggleShowPassword = () => {
    setShowPasswprd(!showPassword);
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

  const [rememberMeCheck, setRememberMeCheck] = useState(true);
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
      onSubmit={(values) =>
        login(
          values,
          (data) => {
            navigateToHome();
          },
          rememberMeCheck
        )
      }
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
          <div
            className={`flex justify-between font-${font}-bold items-center mb-3`}
          >
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
                    ? require("../../../../Images/common/preview.png")
                    : require("../../../../Images/common/preview-disabled.png")
                }
              />
            </button>
          </div>
          {validationErrors.password && (
            <span className={`font-${font}-thin text-red`}>
              {validationErrors.password}
            </span>
          )}
          <div className="flex flex-col-reverse gap-y-3 sm:flex-row justify-between sm:items-center mt-2">
            <div className="flex items-center">
              <button type="button" onClick={ToggleRememberMeCheck}>
                <img
                  className="w-4 h-4 md:w-5 md:h-5"
                  src={require(`../../../../Images/pages/Login/check-${rememberMeCheck}.png`)}
                />
              </button>
              <span
                className={`font-${font}-regular pt-1 m${direction}-1 text-${oppositeTheme} text-sm`}
              >
                {lang["remember-me"]}
              </span>
            </div>
            <Link to={"/forgot-password"}>
              <span className={`font-${font}-regular text-blue text-sm`}>
                {lang["forgot-password"]}
              </span>
            </Link>
          </div>
          <button type="submit" className="button w-full mt-10">
            {lang["submit"]}
          </button>
        </form>
      )}
    </Formik>
  );
}
