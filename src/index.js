import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import { ThemeProvider } from "./Providers/ThemeProvider";
import { DirectionProvider } from "./Providers/DirectionProvider";
import { LanguageProvider } from "./Providers/LanguageProvider";
import { UserProvider } from "./Providers/UserProvider";
import { IsPagesModalOpenProvider } from "./Providers/IsPagesModalOpenProvider";
import { TokenProvider } from "./Providers/TokenProvider";
import { MyQueryClientProvider } from "./Providers/QueryClientProvider";
import { WalletProvider } from "./Providers/WalletProvider";
import { IsLoadingSplashScreenProvider } from "./Providers/IsLoadingSplashScreenProvider";
import "react-tooltip/dist/react-tooltip.css";
import Wallet from "./pages/Wallet";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Cards from "./pages/Cards/Cards";
import OnLoad from "./pages/OnLoad";
import Tickets from "./pages/Tickets";
import Assignment from "./pages/Submitting/Assignment";
import ExConfirmation from "./pages/Submitting/Exchanges";
import Transfers from "./pages/Submitting/Transfers";
import Accounting from "./pages/Submitting/Accounting";
import Users from "./pages/User Mangement/Users";
import Admins from "./pages/User Mangement/Admins";
import Branches from "./pages/User Mangement/Branches";
import Singular from "./pages/Currency/Singular";
import Pair from "./pages/Currency/Pair";
import Robots from "./pages/More/Robots";
import { ToastDataProvider } from "./Providers/ToastDataProvider";
import { ModalDataProvider } from "./Providers/ModalDataProvider";
import ExchangeHistoryScreen from "./pages/Report/ExchangeHistoryScreen";
import DepositHistoryScreen from "./pages/Report/DepositHistoryScreen";
import WithdrawalHistoryScreen from "./pages/Report/WithdrawalHistoryScreen";
import TransferHistoryScreen from "./pages/Report/TransferHistoryScreen";
import Signup from "./pages/Signup";
import WaitLink from "./pages/WaitLink";
import { StatusesProvider } from "./Providers/StatusesProvider";
import { CurrenciesProvider } from "./Providers/CurrenciesProvider";
import { CurrencyPairsProvider } from "./Providers/CurrencyPairsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyQueryClientProvider>
    <IsPagesModalOpenProvider>
      <LanguageProvider>
        <ThemeProvider>
          <DirectionProvider>
            <ModalDataProvider>
              <ToastDataProvider>
                <IsLoadingSplashScreenProvider>
                  <StatusesProvider>
                    <CurrenciesProvider>
                      <CurrencyPairsProvider>
                        <TokenProvider>
                          <UserProvider>
                            <WalletProvider>
                              <BrowserRouter>
                                <Routes>
                                  <Route path="/login" element={<Login />} />
                                  <Route path="/signup" element={<Signup />} />
                                  <Route
                                    path="/wait-link"
                                    element={<WaitLink />}
                                  />
                                  <Route path="*" element={<NoPage />} />
                                  <Route path="/" element={<Layout />}>
                                    <Route index element={<OnLoad />} />
                                    <Route path="home" element={<Home />} />
                                    <Route path="wallet" element={<Wallet />} />
                                    <Route
                                      path="reports"
                                      element={<Reports />}
                                    />
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
                                    <Route
                                      path="profile"
                                      element={<Profile />}
                                    />
                                    <Route
                                      path="profile/cards"
                                      element={<Cards />}
                                    />
                                    <Route
                                      path="tickets"
                                      element={<Tickets />}
                                    />
                                    <Route path="submitting">
                                      <Route
                                        path="assignment"
                                        element={<Assignment />}
                                      />
                                      <Route
                                        path="exchanges"
                                        element={<ExConfirmation />}
                                      />
                                      <Route
                                        path="transfers"
                                        element={<Transfers />}
                                      />
                                      <Route
                                        path="accounting"
                                        element={<Accounting />}
                                      />
                                    </Route>
                                    <Route path="user-management">
                                      <Route path="users" element={<Users />} />
                                      <Route
                                        path="admins"
                                        element={<Admins />}
                                      />
                                      <Route
                                        path="branches"
                                        element={<Branches />}
                                      />
                                    </Route>
                                    <Route path="currency">
                                      <Route
                                        path="singular"
                                        element={<Singular />}
                                      />
                                      <Route path="pair" element={<Pair />} />
                                    </Route>
                                    <Route path="more">
                                      <Route
                                        path="robots"
                                        element={<Robots />}
                                      />
                                    </Route>
                                  </Route>
                                </Routes>
                              </BrowserRouter>
                            </WalletProvider>
                          </UserProvider>
                        </TokenProvider>
                      </CurrencyPairsProvider>
                    </CurrenciesProvider>
                  </StatusesProvider>
                </IsLoadingSplashScreenProvider>
              </ToastDataProvider>
            </ModalDataProvider>
          </DirectionProvider>
        </ThemeProvider>
      </LanguageProvider>
    </IsPagesModalOpenProvider>
  </MyQueryClientProvider>
);
