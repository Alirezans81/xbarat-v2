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
import CustomCropImageModal from "../components/common/CustomCropImageModal";
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
import CompleteProfileModal from "../components/modals/CompleteProfileModal/CompleteProfileModal";
import {
  useModalDataSetState,
  useModalDataState,
} from "../Providers/ModalDataProvider";
import { useFontState } from "../Providers/FontProvider";
import MobileTopBar from "../components/pages/layout/MobileTopBar";
import { useToastDataSetState } from "../Providers/ToastDataProvider";
import { useCheckCompletedProfile } from "../hooks/useCheckCompletedProfile";
import MobileBottomBar from "../components/pages/layout/MobileBottomBar";
import TutorialModal from "../components/modals/Tutorials/WalletTutorialModal/TutorialModal";
import AddToHomeScreenModal from "../components/modals/AddToHomeScreenModal";
import { useGetNews } from "../apis/pages/Layout/hooks";
import NewsModal from "../components/modals/NewsModal";
import FreeExchangeModal from "../components/modals/freeExchangeModal";
import { useLogout } from "../hooks/useAuth";
import Instagram from "../Images/pages/layout/Instagram.png";
import Whatsapp from "../Images/pages/layout/Whatsapp.png";
import Telegram from "../Images/pages/layout/Telegram.png";
import Email from "../Images/pages/layout/Email.png";
import X from "../Images/pages/layout/X.png";
import Facebook from "../Images/pages/layout/Facebook.png";
export default function Layout({ platform }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const { three: direction } = useDirectionState();
  const token = useTokenState();
  const setToken = useTokenSetState();
  const setUser = useUserSetState();
  const user = useUserState();
  const checkCompletedProfile = useCheckCompletedProfile();
  const setWallet = useWalletSetState();
  const setCurrencies = useCurrenciesSetState();
  const setCurrencyPairs = useCurrencyPairsSetState();
  const lang = useLanguageState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const setStatuses = useStatusesSetState();
  const { pathname: activeRoute } = useLocation();
  const { pathname: currentRoute } = useLocation();
  const userInfo = useUserState();

  const [links, setLinks] = useState([]);
  const [expandedSocial, setExpandedSocial] = useState(false);
  const [enter, setEnter] = useState("");
  const setToastData = useToastDataSetState();

  const logout = useLogout();

  const openCompleteProfileMessageToast = () => {
    setToastData({
      status: "warning",
      message: lang["complete-profile-toast-message"] + ".",
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };

  const openTutorialModal = () => {
    setModalData({
      title: "Tutorial",
      children: <TutorialModal />,
      canClose: true,
      isOpen: true,
    });
  };

  const modalData = useModalDataState();
  const setModalData = useModalDataSetState();
  const openCompleteProfileModal = () => {
    setModalData({
      title: "",
      children: <CompleteProfileModal />,
      canClose: false,
      isOpen: true,
    });
  };
  const openAddToHomeScreen = () => {
    setModalData({
      title: "",
      children: <AddToHomeScreenModal />,
      canClose: false,
      isOpen: true,
    });
  };
  const openNewsModal = (news, onClose) => {
    setModalData({
      title: news.title,
      children: <NewsModal {...news} />,
      canClose: true,
      isOpen: true,
      onClose,
    });
  };

  useEffect(() => {
    if (
      userInfo &&
      !userInfo.is_verified &&
      !(currentRoute === "/") &&
      !checkCompletedProfile()
    ) {
      openCompleteProfileMessageToast();
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
    if (platform === "ios") {
      getCurrencies((data) => {
        setCurrencies(
          data.filter((currency) => currency.abbreviation !== "IRR")
        );
      });
      getCurrencyPairs(null, (data) => {
        setCurrencyPairs(
          data.filter(
            (currencyPair) =>
              currencyPair.currency_source_abb !== "IRR" &&
              currencyPair.currency_destination_abb !== "IRR"
          )
        );
      });
    } else {
      getCurrencies(setCurrencies);
      getCurrencyPairs(null, setCurrencyPairs);
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
      const savedExpireTime = window.localStorage.getItem("expireTime");

      if (
        savedStringToken !== "undefined" &&
        savedStringToken !== "null" &&
        savedStringUser !== "undefined" &&
        savedStringUser !== "null" &&
        (savedExpireTime === "undefined" ||
          !savedExpireTime ||
          new Date(savedExpireTime) >= new Date())
      ) {
        const savedToken = JSON.parse(savedStringToken);
        const savedUser = JSON.parse(savedStringUser);
        setToken(savedToken);
        setUser(savedUser);

        savedUser &&
          savedUser.username &&
          getWalletData(savedUser.username, savedToken);
      } else {
        setToken(null);
        setUser(null);
        setWallet({ wallets: [], walletAssets: [], walletTanks: [] });
      }
    } else {
      user && user.username && getWalletData(user.username, token);
    }

    if (
      "standalone" in navigator &&
      !navigator.standalone &&
      /iphone|ipod|ipad/gi.test(navigator.platform) &&
      /Safari/i.test(navigator.appVersion)
    ) {
      openAddToHomeScreen();
    }
  }, []);

  const isPagesModalOpen = useIsPagesModalOpenState();
  const togglePagesModal = useTogglePagesModal();

  const isLoadingSplashScreen = useIsLoadingSplashScreenState();

  const [isBlur, setBlur] = useState(false);
  const switchBlur = () => {
    setBlur(!isBlur);
  };

  const { getNews, isLoading: getNewsIsLoading } = useGetNews();
  useEffect(
    () => setIsLoadingSplashScreen(getNewsIsLoading),
    [getNewsIsLoading]
  );
  const [news, setNews] = useState([]);
  const newsIsSaved = (slug) => {
    const savedNews = JSON.parse(window.localStorage.getItem("news")) || [];

    let result = false;
    savedNews.map((news) => {
      if (news.slug === slug) result = true;
    });

    return result;
  };
  const [newOpenNumber, setNewsOpenNumber] = useState(0);
  useEffect(() => {
    getNews(setNews);
  }, []);
  useEffect(() => {
    if (
      news &&
      modalData &&
      news.length > 0 &&
      Date(news[0].end_date) <= Date() &&
      (!newsIsSaved(news[0].slug) || news[0].important)
    ) {
      openNewsModal(news[newOpenNumber], () => {
        let savedNews = JSON.parse(window.localStorage.getItem("news")) || [];
        savedNews.push(news[newOpenNumber]);
        localStorage.setItem("news", JSON.stringify(savedNews));

        setNewsOpenNumber((prev) => prev + 1);
      });
    }
  }, [news]);
  useEffect(() => {
    if (
      news &&
      modalData &&
      news[newOpenNumber] &&
      Date(news[newOpenNumber].end_date) <= Date() &&
      (!newsIsSaved(news[newOpenNumber].slug) || news[newOpenNumber].important)
    ) {
      openNewsModal(news[newOpenNumber], () => {
        let savedNews = JSON.parse(window.localStorage.getItem("news"));
        savedNews.push(news[newOpenNumber]);
        localStorage.setItem("news", JSON.stringify(savedNews));

        setNewsOpenNumber((prev) => prev + 1);
      });
    }
  }, [newOpenNumber]);
  const freeExchangeModal = () => {
    setModalData({
      title: "🥳",
      children: <FreeExchangeModal />,
      canClose: true,
      isOpen: true,
    });
  };
  useEffect(() => {
    if (
      user &&
      user.free_exchange &&
      !localStorage.getItem("freeExchangeShown")
    )
      freeExchangeModal();
  }, [user]);

  return (
    <>
      <button
        className={`z-[50] absolute ${
          platform === "ios"
            ? "bottom-[110px] md:bottom-[20px]"
            : "bottom-[170px] md:bottom-[90px]"
        } right-[19px] w-[60px] h-[${
          expandedSocial ? "512px" : "60px"
        }] text-3xl bg-${theme}-back shadow-dark shadow-sm-light rounded-full text-${oppositeTheme}`}
        onClick={() => setExpandedSocial(!expandedSocial)}
      >
        <span
          className={`text-4xl justify-center items-center rounded-full ${
            expandedSocial ? "hidden" : "flex"
          }`}
        >
          !
        </span>
        <div
          className={`${
            expandedSocial ? "flex" : "hidden"
          } text-base w-full h-full justify-center gap-y-3 items-center flex-col`}
        >
          <a
            onMouseEnter={() => setEnter("Instagram")}
            onMouseLeave={() => setEnter("")}
            className="p-2"
            href="https://www.instagram.com/xbarat.team?igsh=MXEzZTRucjBybmx5Zw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8" src={Instagram} alt="Instagram" />
          </a>
          <a
            onMouseEnter={() => setEnter("Telegram")}
            onMouseLeave={() => setEnter("")}
            className="p-2"
            href="https://t.me/xbaratteam_rate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8" src={Telegram} alt="Telegram" />
          </a>
          <a
            onMouseEnter={() => setEnter("Email")}
            onMouseLeave={() => setEnter("")}
            className="p-2"
            href="https://github.com/sinabook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8" src={Email} alt="Email" />
          </a>
          <a
            onMouseEnter={() => setEnter("Whatsapp")}
            onMouseLeave={() => setEnter("")}
            className="p-2"
            href="https://wa.me/989360758639"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8" src={Whatsapp} alt="Whatsapp" />
          </a>
          <a
            onMouseEnter={() => setEnter("Facebook")}
            onMouseLeave={() => setEnter("")}
            className="p-2"
            href="https://www.facebook.com/xbarat.team?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8" src={Facebook} alt="Facebook" />
          </a>
          <a
            onMouseEnter={() => setEnter("X")}
            onMouseLeave={() => setEnter("")}
            className="p-2"
            href="https://x.com/xbaratteam?t=KcuxFsnaTcYGAeKeSBg9EA&s=09"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8" src={X} alt="X" />
          </a>
        </div>
      </button>
      <CustomToast />
      <CustomModal />
      <CustomCropImageModal />
      <LoadingSplashScreen isLoading={isLoadingSplashScreen} />
      <div
        dir={direction}
        className={`w-browser h-browser flex flex-col bg-${theme} transition- duration-300`}
      >
        <NavbarSetting setLinks={setLinks} />
        <div
          onClick={isPagesModalOpen ? togglePagesModal : () => {}}
          className="w-browser h-browser flex flex-col"
        >
          <div className="hidden md:block">
            <TopBar />
          </div>
          <div className="block md:hidden">
            <MobileBottomBar links={links} isBlur={isBlur} />
          </div>
          <div className="block md:hidden">
            <MobileTopBar
              links={links}
              isBlur={isBlur}
              switchBlur={switchBlur}
            />
          </div>
          <div className="flex-1 flex h-5/6">
            <div className="hidden md:flex">
              <Navbar links={links} />
            </div>
            <div
              className={`relative flex-1 bg-${theme}-back rounded-tl-5xl md:pl-8 py-8 z-20 ${
                !isBlur ? "blur" : ""
              }`}
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
                    onClick={logout}
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
