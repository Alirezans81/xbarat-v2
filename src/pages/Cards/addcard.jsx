import { useEffect, useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useCreateWalletTank } from "../../apis/common/wallet/hooks";
import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import cross from "../../Images/pages/layout/Profile/crossCardsGray.png";
import { useFontState } from "../../Providers/FontProvider";
import { useUserState } from "../../Providers/UserProvider";
import {
  CustomDropdown,
  CustomItem,
} from "../../components/common/CustomDropdown";
const Addcard = ({ addCard, setAddCard, show }) => {
  const currencies = useCurrenciesState();
  const user=useUserState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const wallet = useWalletState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const [title, setTitle] = useState("");
  const [bankName,setBankName]=useState("");
  const[accountName,setAccountName]=useState("")
  const [asset,setAsset]=useState("");
  const [type,setType]=useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [shabaNumber, setShabaNumber] = useState("");
  const[email,setEmail]=useState("");
  const [currency, setCurrency] = useState("");

  const [params, setParams] = useState({
    wallet_asset: "",
    wallet_tank_type: "",
    title: "",
    balance: 1,
    locked: 1,
    pending: 1,
    bank_info: "",
  });

  
  // useEffect(()=>{
  //   if(show.length!==0){
  //     let AlreadyPickedAsset=currencies.filter((data)=>data.abbreviation===show)
  //     setAsset((AlreadyPickedAsset[0]).url)
  //   }
  // },)
  const { createWalletTank, isLoading: createWalletTankIsLoading } =
    useCreateWalletTank();
  useEffect(() => {
    setIsLoadingSplashScreen(createWalletTankIsLoading);
  }, [createWalletTankIsLoading]);
  useEffect(() => {
    if (accountName && bankName && type && asset &&(cardNumber || shabaNumber || email)) {
      setParams({
        title:"title",
        bank_name:bankName,
        account_name:accountName,
        user:user.url,
        currency:asset[1],
        wallet_tank_type: type==="Card"
          ? "https://xbarat-back.pro/api/wallet/tank/type/card-number/"
          : "https://xbarat-back.pro/api/wallet/tank/type/shaba-number/",
        balance: 0,
        locked: 0,
        pending: 0,
        bank_info: type==="Card"?cardNumber:type==="Shaba"?shabaNumber:email,
      });
    }
  }, [bankName,accountName,type,asset,cardNumber,shabaNumber]);


  const handleAddCards = (e) => {
    e.preventDefault();
    setAddCard(false);
    createWalletTank(params);
    console.log(params);
  };

  const discard = () => {
    setAsset("")
    setType("")
    setAddCard(false);
  };

  const walletAsset=wallet.walletAssets

  let listCurrency = currencies.map((data) => [data.abbreviation,data.url]);
  let listAsset = walletAsset.map((data) => data.currency_abb);
  let AvailableNewAssets = listCurrency.filter(
    (data) => listAsset.includes(data[0]) === false
  );

  return (
    <>
      <div
        className={
          addCard
            ? `fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 `
            : "hidden"
        }
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        <div
          style={{ height: "fit-content" }}
          className={`bg-${theme} flex flex-col w-1/4 px-5 py-5 rounded-lg z-50`}
        >
          <button
            className="flex justify-end h-fit"
            onClick={discard}
          >
            <img className="w-6" src={cross} alt="" />
          </button>
          <form onSubmit={handleAddCards} className="w-full h-full flex justify-center flex-col">
          <div className={"flex-col w-11/12 px-2 py-5"}>
                  <span                       
                    className={`text-${oppositeTheme} text-xl font-${font}-bold mt-0`}>
                      {asset.length===0?lang["currency"]:asset[0]}
                    </span>
                  <CustomDropdown
                      className={"bg-transparent w-fit flex justify-center"}
                      label={currency.length === 0 ? lang["currency"] : currency}
                    >
                      {listCurrency.map((data) => (
                        <CustomItem
                          onClick={() => setAsset(data)}
                          className={"bg-transparent"}
                        >
                          {data[0]}
                        </CustomItem>
                      ))}
                    </CustomDropdown>
                 
                </div>
                <div className="flex flex-col">
                    
                    
                    <span                      
                      className={`text-${oppositeTheme} text-xl font-${font}-bold mt-0`}>
                        Bank Name
                    </span>
                    <div className="w-full">
                      <div className="w-full flex mt-0 px-2">
                        <input
                            onChange={(e)=>setBankName(e.target.value)}
                            required
                            className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                            placeholder="Bank Name"
                        />
                      </div>

                    </div>
                    <span                      
                      className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}>
                        Account Name
                    </span>
                    <div className="w-full">
                      <div className="w-full flex mt-0 px-2">
                        <input
                            onChange={(e)=>setAccountName(e.target.value)}
                            required
                            className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                            placeholder="Account Name"
                        />
                      </div>

                    </div>
                </div>

                
              
                <div className={type.length!==0?"hidden":"flex flex-col justify-center w-full px-2"}>
                  <span                       
                    className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}>
                      {type.length === 0 ? lang["wallet_tank_type_title_null_cards"] : type}
                    </span>
                      <CustomDropdown
                        className={"bg-transparent w-fit"}
                        label={type.length===0?"Card/Shaba":type}
                      >
                          <CustomItem onClick={()=>setType("Card")}>
                                Card Number                  
                          </CustomItem>
                          <CustomItem onClick={()=>setType("Shaba")}>
                                Shaba Number
                          </CustomItem>
                      </CustomDropdown>
                </div>

                <div className={type?"block":"hidden"}>
                    <div className={type==="Card"?"flex flex-col":"hidden"}>
                      <span
                        className={`text-${oppositeTheme} text-xl font-${font}-bold mt-1`}
                      >
                        Bank Information
                      </span>
                      <div className=" w-full">
                        <div className="w-full flex mt-0 px-2">
                          <input
                            onChange={(e) => setCardNumber(e.target.value)}
                            className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                            placeholder={lang["cards_card_number_placeholder"]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={type!=="Card"?"flex flex-col":"hidden"}>
                      <span
                        className={`text-${oppositeTheme} text-xl font-${font}-bold mt-1`}
                      >
                        {lang["cards_shaba_number"]}
                      </span>
                      <div className=" w-full">
                        <div className="w-full flex mt-0 px-2">
                          <input
                            onChange={(e) => setShabaNumber(e.target.value)}
                            className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                            placeholder={lang["cards_shaba_number_placeholder"]}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex justify-end"
                    >
                      <button className={type.length!==0?"bg-blue-gradient rounded-xl text-white w-1/4 h-1/3 pt-1 mt-5":"hidden"}>
                        {lang["submit"]}
                      </button>
                    </div>
                </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addcard;
