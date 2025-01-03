import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import Updating from "./pages/Updating";
import Startup from "./pages/Startup";
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
import ExchangeHistoryScreen from "./pages/Reports/ExchangeHistoryScreen";
import DepositHistoryScreen from "./pages/Reports/DepositHistoryScreen";
import WithdrawalHistoryScreen from "./pages/Reports/WithdrawalHistoryScreen";
import TransferHistoryScreen from "./pages/Reports/TransferHistoryScreen";
import Profile from "./pages/Profile";
import Tickets from "./pages/Profile/Tickets";
import Cards from "./pages/Profile/Cards";
import Referral from "./pages/Profile/Referral";
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
import GiftCard from "./pages/Profile/GiftCard";

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

  const [platform, setPlatform] = useState();
  useEffect(() => {
    const savedPlatform = localStorage.getItem("platform");

    if (!savedPlatform) {
      const queryParameters = new URLSearchParams(window.location.search);
      const initPlatform = queryParameters.get("platform");
      setPlatform(initPlatform);
      localStorage.setItem("platform", initPlatform);
    } else {
      setPlatform(savedPlatform);
    }
  }, []);

  useEffect(() => {
    getLanguages(
      (data) => {
        if (data && data.length > 0) {
          if (platform === "ios") {
            setLanguageList(data.filter((e) => e.symbol !== "Fa"));
          } else {
            setLanguageList(data);
          }
        }
      },
      null,
      null,
      () => setLang("")
    );
  }, []);

  const { getLanguageFile, isLoading: getLanguageFileIsLoading } =
    useGetLanguageFile();
  useEffect(
    () => setLoading(getLanguageFileIsLoading),
    [getLanguageFileIsLoading]
  );

  useEffect(() => {
    if (languageList && languageList.length > 0) {
      const savedLanguageIndex = +localStorage.getItem("selectedLanguageIndex");
      if (savedLanguageIndex >= 0 && languageList[savedLanguageIndex]) {
        setFont(languageList[savedLanguageIndex].symbol);
        getLanguageFile(
          languageList[savedLanguageIndex].file,
          null,
          null,
          setLang,
          () => {
            setLang(require("./languages/En.json"));
          }
        );
      } else {
        setFont(languageList[0].symbol);
        getLanguageFile(languageList[0].file, null, null, setLang, () => {
          localStorage.removeItem("selectedLanguageIndex");
          setLang(require("./languages/En.json"));
        });
      }
    } else {
      setLang("");
    }
  }, [languageList]);

  if (lang === "") {
    return <Updating />;
  } else if (lang) {
    return (
      <>
        <LoadingSplashScreen isLoading={isLoading} />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login platform={platform} />} />
            <Route path="/signup" element={<Signup platform={platform} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/wait-link" element={<WaitLink />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/" element={<Layout platform={platform} />}>
              <Route
                index
                element={
                  <OnLoad>
                    <Home platform={platform} isDemo />
                  </OnLoad>
                }
              />
              <Route path="home" element={<Home platform={platform} />} />
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
              <Route path="profile">
                <Route index element={<Profile />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="cards" element={<Cards />} />
                <Route path="referral" element={<Referral />} />
                <Route path="gift-card" element={<GiftCard />} />
              </Route>
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
  } else return <Startup />;
}
