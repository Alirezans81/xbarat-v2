import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useWalletState } from "../../Providers/WalletProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import { useUserState } from "../../Providers/UserProvider";
import Addcard from "./addcard";
import { useState} from "react";
import SingleCardAssets from "./singleCardAssets";
import SingleCardTank from "./singleCardTank";
import cross from "../../Images/pages/layout/Profile/crossCardsGray.png";

const Cards = () => {
  const wallet = useWalletState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [show, setShow] = useState([]);
  const [addCard, setAddCard] = useState(false);
  const updateShowState = (newState) => {
    setShow(newState);
  };
  function handleAddCard() {
    setAddCard(true);
  }
  function discard(){
    setShow("")
  }
  const Tanks = wallet.walletTanks.filter((data) => data.currency_abb === show);
  return (
    <div
      className="bg-transparent  font-bold"
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "manjari-bold",
      }}
    >
      {/* This is the Right div that exists on the right side of the screen when lg */}
      <div
        className={`bg-transparent md:w-5/12 lg:w-8/12`}
        style={{
          position:"absolute",
          right: "0%",
          top: "5%",
          height: "90%",
          borderTopLeftRadius: "50px",
          borderBottomLeftRadius: "50px",
        }}
      >
      
        <div className={`hidden md:block w-full h-full bg-${theme}`}
          style={{   
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px"}}
        >
            <Addcard addCard={addCard} setAddCard={setAddCard} show={show} />
            <div className="w-full h-full flex flex-col">
            <div className="w-full h-8 flex justify-end mt-5">
            <button
              onClick={handleAddCard}
              className={
                   "bg-blue-gradient text-white rounded-2xl w-36 mr-5 h-full items-center font-thin"
                }
            >
              <span className="mt-1 pb-0">Add</span>   
                <span className="ml-1">+</span>  
            </button>
            </div>
            <div className="xs:grid sm:grid md:grid lg:grid lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 pb-0 h-5/6 w-full ml-3 overflow-scroll">
              {Tanks.map((data, index) => (
                <SingleCardTank show={show} index={index} data={data} />
              ))}
            </div>
            </div>
        </div>
      </div>
      <div
        className={show.length===0?"hidden":`bg-transparent md:hidden xs:absolute`}
        style={{
          top: "5%",
          height: "90%",
          width:"100%",
        }}
      >
        <div className={`md:hidden xs:block w-11/12 ml-5 flex justify-center h-full bg-${theme} rounded-3xl`}
          
        >
            <Addcard addCard={addCard} setAddCard={setAddCard} show={show} />
            <div className="w-full h-full flex flex-col">
            <div className="w-full h-8 mt-5 flex flex-row">
            <button className="flex-1 justify-start w-1/2 h-fit" onClick={discard}><img className="ml-6 h-10" src={cross}/></button>
            <button
              onClick={handleAddCard}
              className={
                   "bg-blue-gradient text-white rounded-2xl w-36 mr-5 h-full items-center font-thin mt-1"
                }
            >
              <span className="mt-1 pb-0">Add</span>   
                <span className="ml-1">+</span>  
            </button>
            </div>
            <div className="grid grid-cols-1 gap-5 pb-0 h-5/6 w-full ml-3 overflow-scroll">
              {Tanks.map((data, index) => (
                <SingleCardTank show={show} index={index} data={data} />
              ))}
            </div>
            </div>
        </div>
      </div>
      {/* This is the Assets md and lg*/}
      <div
        className={`bg-${theme} xs:hidden md:block sm:ml-1 md:w-1/2 lg:w-1/4`}
        style={{
          position: "absolute",
          left: "3%",
          top: "5%",
          height: "90%",
          paddingRight: "3%",
          paddingLeft: "3%",
          paddingTop: "1%",
          paddingBottom: "1%",
          borderRadius: "50px",
        }}
      >
      
        <div className="w-full h-full flex flex-col">
        <div className="w-full flex flex-row xs:p-3">
          <div className="w-1/2 flex justify-start pt-2">
          <div
            className={`text-3xl text-${oppositeTheme} w-1/3`}
          >
            {lang["cards-profile"]}
          </div>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 grid-rows-4 gap-4 items-center justify-center mt-5`}
        style={{height:"60%"}}
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
      {/* This is the Assets sm and xs*/}
      <div className={show.length!==0?"hidden":"h-full w-full flex justify-center"}>
      <div
        className={`bg-${theme} xs:block rounded-3xl md:hidden sm:ml-1 xs:w-11/12 sm:w-11/12 h-full`}
      >
        <div className="w-full h-full flex flex-col">
        <div className="w-full flex flex-row xs:p-3">
          <div className="w-1/2 flex justify-start pt-2">
          <div
            className={`text-3xl text-${oppositeTheme} w-1/3`}
          >
            {lang["cards-profile"]}
          </div>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 grid-rows-4 gap-4 items-center justify-center mt-5 ml-5 w-11/12`}
        style={{height:"55%"}}
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
      
    </div>
  );
};

export default Cards;
