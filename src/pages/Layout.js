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

export default function Layout() {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const { three: direction, one: oneDirection } = useDirectionState();
  const token = useTokenState();
  const setToken = useTokenSetState();
  const setUser = useUserSetState();
  const lang = useLanguageState();
  const { pathname: activeRoute } = useLocation();
  const [links, setLinks] = useState([]);

  useEffect(() => {
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
    } else {
      setToken(null);
      setUser(null);
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
