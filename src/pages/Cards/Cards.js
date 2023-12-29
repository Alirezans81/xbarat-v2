import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useWalletState } from "../../Providers/WalletProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import { useUserState } from "../../Providers/UserProvider";
import Addcard from "./addcard";
import { useState} from "react";
import SingleCardAssets from "./singleCardAssets";
import SingleCardTank from "./singleCardTank";
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
  function discard(){
    setShow("")
  }
  const Tanks = wallet.walletTanks.filter((data) => data.currency_abb === show);
  return (
    <div
      className="bg-transparent  font-bold flex flex-row"
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
        {/* <div className={show.length!==0?"w-screen h-full px-5":"hidden"}>
          <div className={`w-full h-full bg-${theme} flex flex-col justify-center`} style={{borderRadius:"50px"}}>
              <button className="" onClick={discard}>Back</button>

              <div className="grid grid-cols-1 w-full h-full overflow-scroll">
              {Tanks.map((data, index) => (
                <SingleCardTank show={show} index={index} data={data} />
              ))}
              </div>
          </div>
        </div> */}
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
            <div className="lg:grid md:grid lg:grid-cols-2 md:grid-cols-1 gap-5 pb-0 h-5/6 w-full ml-3 overflow-scroll">
              {Tanks.map((data, index) => (
                <SingleCardTank show={show} index={index} data={data} />
              ))}
            </div>
            </div>
        </div>
      </div>
      {/* This is the Assets */}
      <div
        className={`bg-${theme} xs:w-11/12 sm:w-11/12 sm:ml-1 md:w-1/2 lg:w-1/4`}
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
      
    </div>
  );
};

export default Cards;
