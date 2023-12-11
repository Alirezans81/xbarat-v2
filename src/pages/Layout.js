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
import { useUserSetState, useUserState } from "../Providers/UserProvider";
import {
  useWalletSetState,
  useGetWalletData,
} from "../Providers/WalletProvider";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useStatusesSetState } from "../Providers/StatusesProvider";
import { useCurrenciesSetState } from "../Providers/CurrenciesProvider";
import { useGetStatuses } from "../apis/common/status/hooks";
import {
  useGetCurrencies,
  useGetCurrencyPairs,
} from "../apis/common/currency/hooks";
import { useCurrencyPairsSetState } from "../Providers/CurrencyPairsProvider";
import { useGetLanguages } from "../apis/common/language/hooks";
import { useLanguageListSetState } from "../Providers/LanguageListProvider";
import CompleteProfileModal from "../components/modals/CompleteProfileModal";
import { useModalDataSetState } from "../Providers/ModalDataProvider";
import { useFontState } from "../Providers/FontProvider";
import MobileTopBar from "../components/pages/layout/MobileTopBar";

export default function Layout() {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const { three: direction, one: oneDirection } = useDirectionState();
  const token = useTokenState();
  const setToken = useTokenSetState();
  const setUser = useUserSetState();
  const user = useUserState();
  const setWallet = useWalletSetState();
  const setCurrencies = useCurrenciesSetState();
  const setCurrencyPairs = useCurrencyPairsSetState();
  const lang = useLanguageState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const setLanguageList = useLanguageListSetState();
  const setStatuses = useStatusesSetState();
  const { pathname: activeRoute } = useLocation();
  const [links, setLinks] = useState([]);

  const { pathname: currentRoute } = useLocation();
  const userInfo = useUserState();
  const setModalData = useModalDataSetState();
  const openCompleteProfileModal = () => {
    setModalData({
      title: "",
      children: <CompleteProfileModal />,
      canClose: false,
      isOpen: true,
    });
  };
  useEffect(() => {
    if (userInfo && !userInfo.is_verified && !(currentRoute === "/")) {
      openCompleteProfileModal();
    }
  }, []);

  const getWalletData = useGetWalletData();

  const { getStatuses, isLoading: getStatusesIsLoading } = useGetStatuses();
  useEffect(
    () => setIsLoadingSplashScreen(getStatusesIsLoading),
    [getStatusesIsLoading]
  );

  const { getCurrencyPairs, isLoading: getCurrencyPairsIsLoading } =
    useGetCurrencyPairs();
  useEffect(
    () => setIsLoadingSplashScreen(getCurrencyPairsIsLoading),
    [getCurrencyPairsIsLoading]
  );

  const { getCurrencies, isLoading: getCurrenciesIsLoading } =
    useGetCurrencies();
  useEffect(
    () => setIsLoadingSplashScreen(getCurrenciesIsLoading),
    [getCurrenciesIsLoading]
  );

  const { getLanguages, isLoading: getLanguagesIsLoading } = useGetLanguages();
  useEffect(
    () => setIsLoadingSplashScreen(getLanguagesIsLoading),
    [getLanguagesIsLoading]
  );

  useEffect(() => {
    getCurrencies(setCurrencies);
    getCurrencyPairs(null, setCurrencyPairs);

    const stringLanguages = window.localStorage.getItem("languageList");
    if (
      stringLanguages !== "undefined" &&
      stringLanguages !== "null" &&
      stringLanguages !== null
    ) {
      setLanguageList(JSON.parse(stringLanguages));
    } else {
      getLanguages(setLanguageList, null, (languageList) =>
        localStorage.setItem("languageList", JSON.stringify(languageList))
      );
    }

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

    if (!token || !user) {
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
    } else {
      user && user.username && getWalletData(user.username);
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
          <div className="hidden sm:block">
            <TopBar />
          </div>
          <div className="block sm:hidden">
            <MobileTopBar />
          </div>
          <div className="flex-1 flex h-5/6">
            <div className="hidden sm:flex">
              <Navbar links={links} />
            </div>
            <div
              className={`relative flex-1 bg-${theme}-back rounded-tl-5xl sm:p${oneDirection}-8 py-8 z-20`}
            >
              {activeRoute.replace("/", "") === "" || token ? (
                <Outlet />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <span
                    className={`font-${font}-thin text-3xl text-${oppositeTheme} text-center-important`}
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
