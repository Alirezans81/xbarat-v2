import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import WaitLink from "./pages/WaitLink";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import OnLoad from "./pages/OnLoad";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Reports from "./pages/Reports";
import ExchangeHistoryScreen from "./pages/Report/ExchangeHistoryScreen";
import DepositHistoryScreen from "./pages/Report/DepositHistoryScreen";
import WithdrawalHistoryScreen from "./pages/Report/WithdrawalHistoryScreen";
import TransferHistoryScreen from "./pages/Report/TransferHistoryScreen";
import Profile from "./pages/Profile";
import Cards from "./components/pages/layout/Reports/pages/ExchangeHistoryScreen/Cards";
import Tickets from "./pages/Tickets";
import ExConfirmation from "./pages/Submitting/Exchange/Exchanges";
import Transfers from "./pages/Submitting/Transfer/Transfers";
import Assignment from "./pages/Submitting/Assignment";
import Accounting from "./pages/Submitting/Accounting";
import Users from "./pages/User Mangement/Users";
import Admins from "./pages/User Mangement/Admins";
import Branches from "./pages/User Mangement/Branches";
import Singular from "./pages/Currency/Singular";
import Pair from "./pages/Currency/Pair";
import Robots from "./pages/More/Robots";
import {
  useLanguageSetState,
  useLanguageState,
} from "./Providers/LanguageProvider";
import {
  useLanguageListSetState,
  useLanguageListState,
} from "./Providers/LanguageListProvider";
import {
  useGetLanguageFile,
  useGetLanguages,
} from "./apis/common/language/hooks";
import LoadingSplashScreen from "./components/common/LoadingSplashScreen";
import {
  useIsLoadingSplashScreenSetState,
  useIsLoadingSplashScreenState,
} from "./Providers/IsLoadingSplashScreenProvider";
import { useFontSetState } from "./Providers/FontProvider";

export default function App() {
  const lang = useLanguageState();
  const isLoading = useIsLoadingSplashScreenState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const setLang = useLanguageSetState();
  const setFont = useFontSetState();

  const languageList = useLanguageListState();
  const setLanguageList = useLanguageListSetState();
  const { getLanguages, isLoading: getLanguagesIsLoading } = useGetLanguages();
  useEffect(() => setLoading(getLanguagesIsLoading), [getLanguagesIsLoading]);

  useEffect(() => {
    getLanguages(setLanguageList, null, (languageList) =>
      localStorage.setItem("languageList", JSON.stringify(languageList))
    );
  }, []);

  const { getLanguageFile, isLoading: getLanguageFileIsLoading } =
    useGetLanguageFile();
  useEffect(
    () => setLoading(getLanguageFileIsLoading),
    [getLanguageFileIsLoading]
  );

  useEffect(() => {
    const savedLanguageIndex = +localStorage.getItem("selectedLanguageIndex");
    if (savedLanguageIndex >= 0 && languageList[savedLanguageIndex]) {
      setFont(languageList[savedLanguageIndex].symbol);
      getLanguageFile(
        languageList[savedLanguageIndex].file,
        null,
        null,
        setLang
      );
    }
  }, [languageList]);

  if (lang) {
    return (
      <>
        <LoadingSplashScreen isLoading={isLoading} />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/wait-link" element={<WaitLink />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <OnLoad>
                    <Home isDemo />
                  </OnLoad>
                }
              />
              <Route path="home" element={<Home />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="reports" element={<Reports />} />
              <Route
                path="exchange-history"
                element={<ExchangeHistoryScreen />}
              />
              <Route
                path="deposit-history"
                element={<DepositHistoryScreen />}
              />
              <Route
                path="withdrawal-history"
                element={<WithdrawalHistoryScreen />}
              />
              <Route
                path="transfer-history"
                element={<TransferHistoryScreen />}
              />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/cards" element={<Cards />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="submitting">
                <Route path="assignment" element={<Assignment />} />
                <Route path="exchanges" element={<ExConfirmation />} />
                <Route path="transfers" element={<Transfers />} />
                <Route path="accounting" element={<Accounting />} />
              </Route>
              <Route path="user-management">
                <Route path="users" element={<Users />} />
                <Route path="admins" element={<Admins />} />
                <Route path="branches" element={<Branches />} />
              </Route>
              <Route path="currency">
                <Route path="singular" element={<Singular />} />
                <Route path="pair" element={<Pair />} />
              </Route>
              <Route path="more">
                <Route path="robots" element={<Robots />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
