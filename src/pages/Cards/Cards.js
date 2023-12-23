import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useWalletState } from "../../Providers/WalletProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import { useUserState } from "../../Providers/UserProvider";
import Addcard from "./addcard";
import Addasset from "./addasset";
import { useState, useEffect } from "react";
import SingleCardAssets from "./singleCardAssets";
import SingleCardTank from "./singleCardTank";
// border-2 border-solid border-white
const Cards = () => {
  const currencies = useCurrenciesState();
  const wallet = useWalletState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [show, setShow] = useState([]);
  const [addCard, setAddCard] = useState(false);
  const [addAsset, setAddAsset] = useState(false);
  const user=useUserState();
  console.log(user);
  const updateShowState = (newState) => {
    setShow(newState);
  };
  function handleAddCard() {
    setAddCard(true);
  }
  function handleAddAsset() {
    setAddAsset(true);
  }
  const Tanks = wallet.walletTanks.filter((data) => data.currency_abb === show);
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
          top: "5%",
          width: "67%",
          height: "90%",
          borderTopLeftRadius: "50px",
          borderBottomLeftRadius: "50px",
        }}
      >
        <Addcard addCard={addCard} setAddCard={setAddCard} show={show} />
        <div className="w-full h-full flex flex-col">
        <div className="w-full h-fit flex justify-end mt-5">
        <button
          onClick={handleAddCard}
          className={
            show.length === 0 || addCard
              ? "hidden"
              :  "bg-blue-gradient text-white rounded-lg w-20 mr-5 h-full items-center"
            }
          
        >
          <span className="mt-1 pb-0">Add</span>   
            <span className="ml-1">+</span>  
        </button>
        </div>
        <div className="grid grid-rows-3 grid-cols-2 gap-5 items-center pb-0 h-5/6 w-full ml-3 overflow-scroll">
          {Tanks.map((data, index) => (
            <SingleCardTank show={show} index={index} data={data} />
          ))}
        </div>
        </div>
      </div>
      <div
        className={`bg-${theme}`}
        style={{
          position: "absolute",
          left: "3%",
          top: "5%",
          width: "28%",
          height: "90%",
          paddingRight: "3%",
          paddingLeft: "3%",
          paddingTop: "1%",
          paddingBottom: "1%",
          borderRadius: "50px",
        }}
      ><div className="">
      <Addasset
        addAsset={addAsset}
        setAddAsset={setAddAsset}
        show={show}
        walletAsset={wallet.walletAssets}
      />
    </div>
        <div className="w-full h-full flex flex-col">
        <div className="w-full flex flex-row ">
          <div className="w-1/2 flex justify-start pt-2">
          <div
            className={`text-3xl text-${oppositeTheme} w-1/3`}
          >
            {lang["cards-profile"]}
          </div>
          </div>
          <div className="w-1/2 flex justify-end items-center pb-1">
          <button
            onClick={handleAddAsset}
            className={
              wallet.walletAssets.length !== currencies.length
                ? `text-base bg-blue-gradient rounded-lg text-white flex justify-center w-1/3 items-center h-2/3`
                : "hidden"
            }
          >
            <span className="pt-1">Add</span>   
            <span className="ml-1">+</span>              
           

          </button>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 grid-rows-4 gap-4 items-center justify-center mt-5`}
        style={{height:"53%"}}
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
    </div>
  );
};

export default Cards;
