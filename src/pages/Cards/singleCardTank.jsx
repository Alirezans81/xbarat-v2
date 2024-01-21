import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import starChecked from "../../Images/pages/layout/Profile/starChecked.png";
import starUnChecked from "../../Images/pages/layout/Profile/starUnChecked.png";
import edit from "../../Images/pages/layout/Profile/editBlue.png"
import { useState,useEffect } from "react";
import { useEditWalletTanks } from "../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import EditCards from "./editcard";
const SingleCardTank = ({ show, index, data }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  console.log(data)
  const { editWalletTank, isLoading: editWalletTankIsLoading } =
      useEditWalletTanks();
  useEffect(() => {
    setIsLoadingSplashScreen(editWalletTankIsLoading);
  }, [editWalletTankIsLoading]);
  const [title,setTitle]=useState("")  
  const [bankInfo,setBankInfo]=useState("");
  const [bankName,setBankName]=useState("")
  const [walletTankType,setWalletTankType]=useState("");
  const [user,setUser]=useState("");
  const [isChecked, setIsChecked] = useState("");
  const [isActive,setIsActive]=useState("");
  const [editCards,setEditCards]=useState(false)
  useEffect(()=>{
    if(data){
      setBankName(data.bank_name)
      setTitle(data.title)
      setBankInfo(data.bank_info)
      setWalletTankType(data.wallet_tank_type)
      setUser(data.user)
      setIsChecked(data.is_favorite)
      setIsActive(!data.is_deleted) 
    }
  },[data])
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleIsActive() {
    setIsActive(!isActive)
  }
  const handleEditCard=()=>{
    setEditCards(true);
    console.log(editCards)

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
            <button onClick={handleEditCard}className="flex justify-end w-1/12 h-full mt-1"><img alt="" src={edit} style={{width:"62%",height:"62%"}}/></button>
            <button onClick={handleCheckboxChange} className="flex justify-end w-1/12 h-full"><img alt="" src={isChecked?starChecked:starUnChecked} style={{width:"80%",height:"80%"}}/></button>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">{lang["bank_name_null_cards"]}</span>
                  <span className={`text-${oppositeTheme} text-2xl min-w-0 `} >{bankInfo}</span>
          </div>
          <div className="flex justify-end w-full h-1/4 items-end">
            <div className="w-full flex justify-end">
              <form className="flex flex-row justify-end h-1/2 px-1 items-end">
                    <label className={`text-${oppositeTheme} text-2xl`}>Is Active</label>
                    <input type="checkbox"
                     onChange={handleIsActive}
                     value={isActive}
                     className="bg-transparent border-2 border-solid border-blue rounded-sm focus:border-0 ml-1 mb-3"/>
              </form>
            </div>
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
            <button onClick={handleEditCard} className="flex justify-end w-1/12 h-full mt-1"><img alt="" src={edit} style={{width:"62%",height:"62%"}}/></button>
            <button onClick={handleCheckboxChange} className="flex justify-end w-1/12 h-full"><img alt="" src={isChecked?starChecked:starUnChecked} style={{width:"80%",height:"80%"}}/></button>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-lg w-full h-1/2 min-w-0">{lang["bank_name_null_cards"]}</span>
                  <span className={`text-${oppositeTheme} text-xl min-w-0 `} >{bankInfo}</span>
          </div>
          <div className="flex justify-end w-full h-1/4 items-end">
            <div className="w-full flex justify-end">
              <form className="flex flex-row justify-end h-1/2 px-1 items-end">
                    <label className={`text-${oppositeTheme} text-2xl`}>Is Active</label>
                    <input type="checkbox"
                     onChange={handleIsActive}
                     value={isActive}

                     className="bg-transparent border-2 border-solid border-blue rounded-sm focus:border-0 ml-1 mb-3"/>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* This is for xs and sm */}
      <div
        className={`xs:block md:hidden bg-${theme}-back w-11/12 rounded-3xl ml-5 mt-7`}
        style={{
          height:"fit-content",
          gridColumn: 1
        }}
      > 
        <div className="w-full h-full flex flex-col p-6 px-9">
          <div className="flex flex-row h-1/4 w-full">
            <span className="text-blue text-3xl w-5/6 h-full flex justify-start min-w-0 ">{bankName}</span>
            <button onClick={handleEditCard} className="flex justify-end w-1/12 h-full mt-1"><img alt="" src={edit} style={{width:"62%",height:"62%"}}/></button>
            <button onClick={handleCheckboxChange} className="flex justify-end w-1/12 h-full"><img alt="" src={isChecked?starChecked:starUnChecked} style={{width:"80%",height:"80%"}}/></button>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-lg w-full h-1/2 min-w-0">{lang["bank_name_null_cards"]}</span>
                  <span className={`text-${oppositeTheme} text-xl min-w-0 `} >{bankInfo}</span>
          </div>
          <div className="flex justify-end w-full h-1/4 items-end">
            <div className="w-full flex justify-end">
              <form className="flex flex-row justify-end h-1/2 px-1 items-end">
                    <label className={`text-${oppositeTheme} text-2xl`}>Is Active</label>
                    <input type="checkbox"
                     onChange={handleIsActive}
                     value={isActive}
                     className="bg-transparent border-2 border-solid border-blue rounded-sm focus:border-0 ml-1 mb-3"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    
    </>
  );
};

export default SingleCardTank;
