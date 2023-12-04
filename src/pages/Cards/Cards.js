import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useWalletState } from "../../Providers/WalletProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";

import Addcard from "./addcard";
import Addasset from "./addasset";
import { useState, useEffect } from "react";
import SingleCardAssets from "./singleCardAssets";
import SingleCardTank from "./singleCardTank";
import edit from "../../Images/pages/layout/Profile/editBlue.png";
const Cards = () => {
  const currencies = useCurrenciesState();
  const wallet = useWalletState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [show, setShow] = useState([]);
  const [addCard, setAddCard] = useState(false);
  const [addAsset, setAddAsset] = useState(false);
  const updateShowState = (newState) => {
    setShow(newState);
  };
  function handleAddCard() {
    setAddCard(true);
  }
  function handleAddAsset() {
    setAddAsset(true);
  }
  const walletAssetNumber = wallet.walletAssets.length;
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
        className={`bg-${theme}`}
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
        <button
          onClick={handleAddCard}
          className={
            show.length === 0 || addCard
              ? "hidden"
              : "bg-blue text-white mt-3 w-20 rounded-lg mr-5 ml-20 absolute right-0"
          }
        >
          +
        </button>

        <Addcard addCard={addCard} setAddCard={setAddCard} show={show} />
        <div className="grid grid-rows-3 grid-cols-2 gap-4 items-center mt-10 pb-0 h-full w-full">
          <div className="flex justify-center w-full h-full">
            <SingleCardTank show={show} />
          </div>
        </div>
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
        <div className="">
          <Addasset
            addAsset={addAsset}
            setAddAsset={setAddAsset}
            show={show}
            walletAsset={wallet.walletAssets}
          />
        </div>
        <div className="w-full">
          <span
            className={`text-xl text-${oppositeTheme}`}
            style={{ position: "absolute", top: "5%", left: "13%" }}
          >
            {lang["cards-profile"]}
          </span>
          <button
            onClick={handleAddAsset}
            className={
              wallet.walletAssets.length !== currencies.length
                ? `text-base bg-blue-gradient rounded-lg px-5 py-1 text-white`
                : "hidden"
            }
            style={{ position: "absolute", top: "4.5%", right: "13%" }}
          >
            +
          </button>
        </div>

        <div
          className={`grid grid-cols-1 grid-rows-4 gap-4 items-center justify-center mt-16 h-96`}
        >
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
