import React, { useEffect } from "react";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useThemeState } from "../Providers/ThemeProvider";
import { useFontState } from "../Providers/FontProvider";
import { useUserSetState, useUserState } from "../Providers/UserProvider";
import { useTokenSetState, useTokenState } from "../Providers/TokenProvider";
import {
  useGetWalletData,
  useWalletSetState,
} from "../Providers/WalletProvider";
import { useNavigate } from "react-router-dom";

export default function OnLoad({ children }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const user = useUserState();
  const setUser = useUserSetState();
  const token = useTokenState();
  const setToken = useTokenSetState();

  const navigate = useNavigate();

  const getWalletData = useGetWalletData();
  const setWallet = useWalletSetState();

  useEffect(() => {
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

      navigate("/home");
    } else {
      user && user.username && getWalletData(user.username, token);
    }
  }, []);

  if (children) {
    return <div>{children}</div>;
  } else {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <span className={`text-${oppositeTheme} font-${font}-thin text-3xl`}>
          {lang["loading"]}
        </span>
      </div>
    );
  }
}
