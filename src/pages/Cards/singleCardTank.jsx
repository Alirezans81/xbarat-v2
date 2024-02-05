import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import starChecked from "../../Images/pages/layout/Profile/starChecked.png";
import starUnChecked from "../../Images/pages/layout/Profile/starUnChecked.png";
import edit from "../../Images/pages/layout/Profile/editBlue.png"
import { useState,useEffect } from "react";
import { useEditWalletTanks } from "../../apis/common/wallet/hooks";
import { useTokenState } from "../../Providers/TokenProvider";

import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import EditCards from "./editcard";
import { useUserState } from "../../Providers/UserProvider";
const SingleCardTank = ({ show, index, data,refresh,editCards,setEditCards }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const token=useTokenState();
  const lang = useLanguageState();
  const userP=useUserState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const { editWalletTank, isLoading: editWalletTankIsLoading } =
      useEditWalletTanks();
  useEffect(() => {
    setIsLoadingSplashScreen(editWalletTankIsLoading);
  }, [editWalletTankIsLoading]);
  const [title,setTitle]=useState("");
  const [accountName,setAccountName]=useState("");
  const [bankInfo,setBankInfo]=useState("");
  const [bankName,setBankName]=useState("")
  const [walletTankType,setWalletTankType]=useState("");
  const [user,setUser]=useState("");
  const [isFavorite, setIsFavorite] = useState("");
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
    is_favorite:false,

  });
  useEffect(()=>{
    if(data){
      setAccountName(data.account_name);
      setBankName(data.bank_name);
      setTitle(data.title);
      setBankInfo(data.bank_info);
      setWalletTankType(data.wallet_tank_type);
      setUser(data.user);
      setIsFavorite(data.is_favorite);
      
    }
  },[data])
  useEffect(()=>{

    editWalletTank(data.url,params);
  },[params])



  const handleCheckboxChange = () => {
    setParams({
      is_favorite:!isFavorite
    });
    setIsFavorite(!isFavorite)

  };

 
  const handleEditCard=()=>{
    setEditCards(true);

  }
 

  
    return (
    <>
      <EditCards editCards={editCards} setEditCards={setEditCards} data={data}/>

      {/* This is for lg screen */}
      <div
        className={`xs:hidden lg:block bg-${theme}-back w-11/12 rounded-3xl ml-5 mt-5`}
        style={{
          height:"fit-content",
          gridColumn: index % 2 === 0 ? 1 : 2,
        }}
      >
        <div className="w-full h-full flex flex-col p-6 px-9">
          <div className="flex flex-row h-1/4 w-full">
            <span className="text-blue text-3xl w-5/6 h-full flex justify-start min-w-0 ">{bankName}</span>
            <button onClick={handleEditCard}className="flex justify-end w-1/12 h-fit w-fit mt-1"><img alt="" src={edit} style={{width:"62%",height:"62%"}}/></button>
            <button onClick={handleCheckboxChange} className="flex justify-end h-fit w-fit"><img alt="" src={isFavorite?starChecked:starUnChecked} style={{width:"70%",height:"70%"}}/></button>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">Account Name</span>
                  <span className={`text-${oppositeTheme} text-2xl min-w-0 `} >{accountName}</span>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"1%"}}>
                  <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">Bank Info</span>
                  <span className={`text-${oppositeTheme} text-2xl min-w-0 `} >{bankInfo}</span>
          </div>
         
        </div>
      </div>
      {/* This is for md screen */}
      <div
        className={`xs:hidden md:block lg:hidden bg-${theme}-back w-11/12 rounded-3xl ml-5 mt-5`}
        style={{
          height:"fit-content",
       
          gridColumn: 1
        }}
      > 
        <div className="w-full h-full flex flex-col p-6 px-9">
          <div className="flex flex-row h-1/4 w-full">
            <span className="text-blue text-3xl w-5/6 h-full flex justify-start min-w-0 ">{bankName}</span>
            <button onClick={handleEditCard} className="flex justify-end  h-fit w-fit mt-1"><img alt="" src={edit} style={{width:"62%",height:"62%"}}/></button>
            <button onClick={handleCheckboxChange} className="flex justify-end w-fit h-fit"><img alt="" src={isFavorite?starChecked:starUnChecked} style={{width:"70%",height:"70%"}}/></button>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">Account Name</span>
                  <span className={`text-${oppositeTheme} text-2xl min-w-0 `} >{accountName}</span>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-lg w-full h-1/2 min-w-0">Bank Info</span>
                  <span className={`text-${oppositeTheme} text-xl min-w-0 `} >{bankInfo}</span>
          </div>
          
     
        </div>
      </div>
      {/* This is for xs and sm */}
      <div
        className={`xs:block md:hidden bg-${theme}-back w-11/12 rounded-3xl mt-7`}
        style={{
          height:"fit-content",
          gridColumn: 1
        }}
      > 
        <div className="w-full h-full flex flex-col p-6 px-9">
          <div className="flex flex-row h-1/4 w-full">
            <span className="text-blue text-3xl w-5/6 h-full flex justify-start ">{bankName}</span>
            <button onClick={handleEditCard} className="flex justify-end h-fit w-fit mt-1"><img alt="" src={edit} style={{width:"62%",height:"62%"}}/></button>
            <button onClick={handleCheckboxChange} className="flex justify-end w-fit h-fit"><img alt="" src={isFavorite?starChecked:starUnChecked} style={{width:"70%",height:"70%"}}/></button>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">Account Name</span>
                  <span className={`text-${oppositeTheme} text-2xl min-w-0 `} >{accountName}</span>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-lg w-full h-1/2 min-w-0">Bank Info</span>
                  <span className={`text-${oppositeTheme} text-xl min-w-0 `} >{bankInfo}</span>
          </div>
     
        </div>
      </div>
    
    
    </>
  );
};

export default SingleCardTank;
