import { useEffect, useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useEditWalletTanks } from "../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import cross from "../../Images/pages/layout/Profile/crossCardsGray.png";
import { useFontState } from "../../Providers/FontProvider";
import { useUserState } from "../../Providers/UserProvider";

const EditCards = ({ editCards, setEditCards, data }) => {
  const currencies = useCurrenciesState();
  const user = useUserState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const tempCurrency = currencies.filter(
    (dat) => dat.abbreviation === data.currency_abb
  );
  const [asset, setAsset] = useState((tempCurrency[0]).url);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [bankInfo, setBankInfo] = useState("");
  const [bankName,setBankName]=useState("");
  const [accountName,setAccountName]=useState("");
  const [isChecked, setIsChecked] = useState("");
  const [isDeleted,setIsDeleted]=useState("");

  useEffect(()=>{
    if(data){
      setAccountName(data.account_name);
      setType(data.wallet_tank_type);
      setBankName(data.bank_name);
      setTitle(data.title);
      setBankInfo(data.bank_info);
      setIsChecked(data.is_favorite);
      setIsDeleted(data.is_deleted);
    }
  },[data])

  const [params, setParams] = useState({
    url:"",
    wallet_asset: "",
    wallet_tank_type_title: "",
    currency_abb:"",
    title: "",
    balance: 1,
    locked: 1,
    account_name:"",
    pending: 1,
    bank_name:"",
    is_deleted:false,
    bank_info: "",
  });

  const { editWalletTank, isLoading: editWalletTankIsLoading } =
    useEditWalletTanks();
  useEffect(() => {
    setIsLoadingSplashScreen(editWalletTankIsLoading);
  }, [editWalletTankIsLoading]);
  useEffect(() => {
      setParams({
        url: data.url,
        account_name:accountName,
        currency_abb: asset,
        wallet_tank_type: type,
        title: title,
        balance: 0,
        locked: 0,
        pending: 0,
        bank_name: bankName,
        bank_info: bankInfo,
        is_deleted:isDeleted
      });
    
  }, [type,asset,bankInfo,bankName,type,isDeleted,accountName]);
  const handleEditCards = (e) => {
    e.preventDefault();
    setEditCards(false);
    editWalletTank(data.url,params);
  };
  const discard = () => {
    const a ={
        is_deleted: true
    }
    editWalletTank(data.url,a);
    setEditCards(false);
    editWalletTank(data.url,a);



  };
  const deleteCard=()=>{
    setIsDeleted(true);
    editWalletTank(data.url,params);
  }
  return (
    <>
      <div
        className={
          editCards
            ? `fixed top-0 left-0 w-browser h-browser flex items-center justify-center z-20 `
            : "hidden"
        }
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        <div
          style={{ height: "fit-content" }}
          className={`bg-${theme} flex flex-col w-1/4 px-5 py-5 rounded-lg z-50`}
        >
          <button className="flex justify-end h-fit" onClick={discard}>
            <img className="w-6" src={cross} alt="" />
          </button>
          <form
            onSubmit={handleEditCards}
            className="w-full h-full flex justify-center flex-col"
          >
      
            <span
              className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
            >
              Bank Name
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0 px-2">
                <input
                  onChange={(e) => setBankName(e.target.value)}
                  
                  value={bankName}
                  className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                  placeholder="Bank Name"
                />
              </div>
            </div>
            <span
              className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
            >
              Account Name
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0 px-2">
                <input
                  onChange={(e) => setAccountName(e.target.value)}
                  
                  value={accountName}
                  className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                  placeholder="Bank Name"
                />
              </div>
            </div>
            <span
              className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
            >
              Bank Info
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0 px-2">
                <input
                  onChange={(e) => setBankInfo(e.target.value)}
                  
                  value={bankInfo}
                  className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                  placeholder={lang["add_cards_title"]}
                />
              </div>
            </div>
            <div className="flex flex-row h-full w-full">
            <div className="w-1/2 flex justify-start">
                <button
                  onClick={deleteCard}
                  className={
                    "bg-red rounded-xl text-white w-1/2 h-1/2 pt-1 mt-5"
                  }
                >
                  Delete
                </button>
              </div>
              <div className="w-1/2 flex justify-end">
                <button
                  className={
                    "bg-blue-gradient rounded-xl text-white w-1/2 h-1/2 pt-1 mt-5"
                  }
                >
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
export default EditCards;
