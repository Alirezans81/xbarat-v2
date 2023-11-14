import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import { useTokenState, useTokenSetState } from "../Providers/TokenProvider";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useTogglePagesModal } from "../Providers/IsPagesModalOpenProvider";
import { useIsPagesModalOpenState } from "../Providers/IsPagesModalOpenProvider";
import { useIsLoadingSplashScreenState } from "../Providers/IsLoadingSplashScreenProvider";
import Navbar from "../components/pages/layout/Navbar";
import TopBar from "../components/pages/layout/TopBar";
import NavbarSetting from "../components/pages/layout/NavbarSetting";
import LoadingSplashScreen from "../components/common/LoadingSplashScreen";
import CustomToast from "../components/common/CustomToast";
import CustomModal from "../components/common/CustomModal";
import { useUserSetState } from "../Providers/UserProvider";
import { useWalletSetState, useWalletState } from "../Providers/WalletProvider";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useStatusesSetState } from "../Providers/StatusesProvider";
import { useCurrenciesSetState } from "../Providers/CurrenciesProvider";
import { useGetStatuses } from "../apis/common/status/hooks";
import {
  useGetWalletAssets,
  useGetWalletTanks,
  useGetWallets,
} from "../apis/common/wallet/hooks";
import { useGetCurrencies } from "../apis/common/currency/hooks";

export default function Layout() {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const { three: direction, one: oneDirection } = useDirectionState();
  const token = useTokenState();
  const setToken = useTokenSetState();
  const setUser = useUserSetState();
  const wallet = useWalletState();
  const setWallet = useWalletSetState();
  const setCurrencies = useCurrenciesSetState();
  const lang = useLanguageState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const setStatuses = useStatusesSetState();
  const { pathname: activeRoute } = useLocation();
  const [links, setLinks] = useState([]);

  const { getStatuses, isLoading: getStatusesIsLoading } = useGetStatuses();
  useEffect(
    () => setIsLoadingSplashScreen(getStatusesIsLoading),
    [getStatusesIsLoading]
  );

  const { getCurrencies, isLoading: getCurrenciesIsLoading } =
    useGetCurrencies();
  useEffect(
    () => setIsLoadingSplashScreen(getCurrenciesIsLoading),
    [getCurrenciesIsLoading]
  );

  const { getWallets, isLoading: getWalletsIsLoading } = useGetWallets();
  useEffect(() => {
    setIsLoadingSplashScreen(getWalletsIsLoading);
  }, [getWalletsIsLoading]);
  const { getWalletAssets, isLoading: getWalletAssetsIsLoading } =
    useGetWalletAssets();
  useEffect(() => {
    setIsLoadingSplashScreen(getWalletAssetsIsLoading);
  }, [getWalletAssetsIsLoading]);
  const { getWalletTanks, isLoading: getWalletTanksIsLoading } =
    useGetWalletTanks();
  useEffect(() => {
    setIsLoadingSplashScreen(getWalletTanksIsLoading);
  }, [getWalletTanksIsLoading]);

  const setWallets = (data) => {
    if (wallet && data) {
      let temp = wallet;
      temp.wallets = data;
      setWallet(temp);
    }
  };
  const setWalletAssets = (data) => {
    if (wallet && data) {
      let temp = wallet;
      temp.walletAssets = data;
      setWallet(temp);
    }
  };
  const setWalletTanks = (data) => {
    if (wallet && data) {
      let temp = wallet;
      temp.walletTanks = data;
      setWallet(temp);
    }
  };

  const getWalletData = (username) => {
    const userFilter = {
      user: username,
    };

    getWallets(userFilter, setWallets);
    getWalletAssets(userFilter, setWalletAssets);
    getWalletTanks(userFilter, setWalletTanks);
  };

  useEffect(() => {
    getCurrencies(setCurrencies);

    const stringStatuses = window.localStorage.getItem("statues");
    if (
      stringStatuses !== "undefined" &&
      stringStatuses !== "null" &&
      stringStatuses !== null
    ) {
      setStatuses(JSON.parse(stringStatuses));
    } else {
      getStatuses(setStatuses, null, (statuses) =>
        localStorage.setItem("statuses", JSON.stringify(statuses))
      );
    }

    const savedStringToken = window.localStorage.getItem("authToken");
    const savedStringUser = window.localStorage.getItem("userInfo");
    if (
      savedStringToken !== "undefined" &&
      savedStringToken !== "null" &&
      savedStringUser !== "undefined" &&
      savedStringUser !== "null"
    ) {
      const savedToken = JSON.parse(savedStringToken);
      const savedUser = JSON.parse(savedStringUser);
      setToken(savedToken);
      setUser(savedUser);
      savedUser && savedUser.username && getWalletData(savedUser.username);
    } else {
      setToken(null);
      setUser(null);
      setWallet({ wallets: [], walletAssets: [], walletTanks: [] });
    }
  }, []);

  const isPagesModalOpen = useIsPagesModalOpenState();
  const togglePagesModal = useTogglePagesModal();

  const isLoadingSplashScreen = useIsLoadingSplashScreenState();

  return (
    <>
      <CustomToast />
      <CustomModal />
      <LoadingSplashScreen isLoading={isLoadingSplashScreen} />
      <div
        dir={direction}
        className={`w-screen h-screen flex flex-col bg-${theme} transition- duration-300`}
      >
        <NavbarSetting setLinks={setLinks} />
        <div
          onClick={isPagesModalOpen ? togglePagesModal : () => {}}
          className="w-screen h-screen flex flex-col"
        >
          <TopBar />
          <div className="flex-1 flex h-5/6">
            <Navbar links={links} />
            <div
              className={`flex-1 max-h-full bg-${theme}-back rounded-t${oneDirection}-5xl p${oneDirection}-8 py-8 z-20`}
            >
              {activeRoute.replace("/", "") === "" || token ? (
                <Outlet />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <span
                    className={`font-mine-thin text-3xl text-${oppositeTheme} text-center`}
                  >
                    {lang["not-logged-in-error"] + "."}
                  </span>
                  <Link
                    onClick={() => {
                      setToken(null);
                    }}
                    to="/login"
                    className="button mt-3 w-28 flex justify-center"
                  >
                    <span className="">{lang["log-in"]}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
