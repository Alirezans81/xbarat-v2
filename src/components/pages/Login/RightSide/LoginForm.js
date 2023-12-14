import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../../../apis/pages/Login/hooks";
import {
  useGetWalletAssets,
  useGetWalletTanks,
  useGetWallets,
} from "../../../../apis/common/wallet/hooks";
import {
  useWalletSetState,
  useWalletState,
} from "../../../../Providers/WalletProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function LoginForm({ setIsSplashScreenLoading }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const lang = useLanguageState();
  const font = useFontState();
  const { one: direction } = useDirectionState();
  const wallet = useWalletState();
  const setWallet = useWalletSetState();

  const { login, isLoading: loginIsLoading, error } = useLogin();
  useEffect(() => {
    setIsSplashScreenLoading(loginIsLoading);
  }, [loginIsLoading]);
  const { getWallets, isLoading: getWalletsIsLoading } = useGetWallets();
  useEffect(() => {
    setIsSplashScreenLoading(getWalletsIsLoading);
  }, [getWalletsIsLoading]);
  const { getWalletAssets, isLoading: getWalletAssetsIsLoading } =
    useGetWalletAssets();
  useEffect(() => {
    setIsSplashScreenLoading(getWalletAssetsIsLoading);
  }, [getWalletAssetsIsLoading]);
  const { getWalletTanks, isLoading: getWalletTanksIsLoading } =
    useGetWalletTanks();
  useEffect(() => {
    setIsSplashScreenLoading(getWalletTanksIsLoading);
  }, [getWalletTanksIsLoading]);

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

  const setWallets = (data) => {
    if (wallet && data) {
      let temp = wallet;
      temp.wallets = data;
      setWallet(temp);
      window.localStorage.setItem("wallet", JSON.stringify(temp));
    }
  };
  const setWalletAssets = (data) => {
    if (wallet && data) {
      let temp = wallet;
      temp.walletAssets = data;
      setWallet(temp);
      window.localStorage.setItem("wallet", JSON.stringify(temp));
    }
  };
  const setWalletTanks = (data) => {
    if (wallet && data) {
      let temp = wallet;
      temp.walletTanks = data;
      setWallet(temp);
      window.localStorage.setItem("wallet", JSON.stringify(temp));
    }
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
            <span className={`font-${font}-thin text-red`}>
              {validationErrors.password}
            </span>
          )}
          <div className="flex flex-col-reverse gap-y-3 sm:flex-row justify-between sm:items-center mt-2">
            <div className="flex items-center">
              <button type="button" onClick={ToggleRememberMeCheck}>
                <img
                  className="w-4 h-4"
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
                {lang["forgot-password"] + "?"}
              </span>
            </Link>
          </div>
          {error && (
            <span className={`font-${font}-thin text-red`}>
              {error.response.data.error}
            </span>
          )}
          <button type="submit" className="button w-full mt-10">
            {lang["submit"]}
          </button>
        </form>
      )}
    </Formik>
  );
}
