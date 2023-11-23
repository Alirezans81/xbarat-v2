import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useWalletState } from "../../Providers/WalletProvider";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useGetWallets } from "../../apis/common/wallet/hooks";
import { useState, useEffect } from "react";
import SingleCardAssets from "./singleCardAssets";
import SingleCardTank from "./singleCardTank";
const Cards = () => {
  const wallet = useWalletState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [show, setShow] = useState([]);
  const updateShowState = (newState) => {
    setShow(newState);
  };
  return (
    <div
      className="bg-transparent  font-bold "
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "manjari-bold",
      }}
    >
      <div
        className={`bg-${theme} grid grid-rows-3 grid-cols-2 gap-4 items-center justify-center overflow-y-scroll`}
        style={{
          position: "absolute",
          right: "0%",
          top: "17%",
          width: "67%",
          height: "80%",
          borderTopLeftRadius: "50px",
          borderBottomLeftRadius: "50px",
        }}
      >
        <SingleCardTank show={show} />
      </div>

      <div
        className={`bg-${theme}`}
        style={{
          position: "absolute",
          left: "6.4%",
          top: "17%",
          width: "23.6%",
          height: "80%",
          paddingRight: "3%",
          paddingLeft: "3%",
          paddingTop: "1%",
          paddingBottom: "1%",
          borderRadius: "50px",
        }}
      >
        <div>
          <span
            className={`text-xl text-${oppositeTheme}`}
            style={{ position: "absolute", top: "5%", left: "13%" }}
          >
            {lang["cards-profile"]}
          </span>
          <button
            className={`text-base bg-blue-gradient rounded-lg px-5 py-1 text-white`}
            style={{ position: "absolute", top: "4.5%", right: "13%" }}
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-1 grid-rows-4 gap-4 items-center justify-center mt-16 h-96">
          {wallet && wallet.walletAssets ? (
            wallet.walletAssets.map((assetData, assetIndex) => (
              <SingleCardAssets
                assetIndex={assetIndex}
                assetData={assetData}
                updateShowState={updateShowState}
              />
            ))
          ) : (
            <div className="text-white">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
