import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import starChecked from "../../Images/pages/layout/Profile/starChecked.png";
import starUnChecked from "../../Images/pages/layout/Profile/starUnChecked.png";
import edit from "../../Images/pages/layout/Profile/editBlue.png"
import { useState } from "react";
const SingleCardTank = ({ show, index, data }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const wallet = useWalletState();
  const lang = useLanguageState();

  const walletTanks = wallet.walletTanks.filter(
    (data) => data.currency_abb === show
  );

  console.log(walletTanks);
  const [isChecked, setIsChecked] = useState(walletTanks.is_favorite);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleIsActive() {
    console.log("s");
  }
  console.log(show)
  const temp = walletTanks.map((data, index) => index);
  console.log(temp);
  return (
    <>
      <div
        className={`md:hidden lg:block bg-${theme}-back w-11/12 rounded-3xl ml-5 mt-5`}
        style={{
          height:"fit-content",
        
          gridColumn: index % 2 === 0 ? 1 : 2,
        }}
      >
        <div className="w-full h-full flex flex-col p-6 px-9">
          <div className="flex flex-row h-1/4 w-full">
            <span className="text-blue text-3xl w-5/6 h-full flex justify-start min-w-0 ">{data.title}</span>
            <button className="flex justify-end w-1/12 h-full mt-1"><img alt="" src={edit} style={{width:"62%",height:"62%"}}/></button>
            <button className="flex justify-end w-1/12 h-full"><img alt="" src={starChecked} style={{width:"80%",height:"80%"}}/></button>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">{lang["bank_name_null_cards"]}</span>
                  <span className={`text-${oppositeTheme} text-2xl min-w-0 `} >{data.bank_info}</span>
          </div>
          <div className="flex justify-end w-full h-1/4 items-end">
            <div className="w-full flex justify-end">
              <form className="flex flex-row justify-end h-1/2 px-1 items-end">
                    <label className={`text-${oppositeTheme} text-2xl`}>Is Active</label>
                    <input type="checkbox"
                     onChange={handleIsActive}
                     className="bg-transparent border-2 border-solid border-blue rounded-sm focus:border-0 ml-1 mb-3"/>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* This is for md screen */}
      <div
        className={`md:block lg:hidden bg-${theme}-back w-11/12 rounded-3xl ml-5 mt-5`}
        style={{
          height:"fit-content",
       
          gridColumn: 1
        }}
      > 
        <div className="w-full h-full flex flex-col p-6 px-9">
          <div className="flex flex-row h-1/4 w-full">
            <span className="text-blue text-3xl w-5/6 h-full flex justify-start min-w-0 ">{data.title}</span>
            <button className="flex justify-end w-1/12 h-full mt-1"><img alt="" src={edit} style={{width:"62%",height:"62%"}}/></button>
            <button className="flex justify-end w-1/12 h-full"><img alt="" src={starChecked} style={{width:"80%",height:"80%"}}/></button>
          </div>
          <div className="w-full h-1/2 flex justify-start flex-col" style={{marginTop:"5%"}}>
                  <span className="text-gray text-lg w-full h-1/2 min-w-0">{lang["bank_name_null_cards"]}</span>
                  <span className={`text-${oppositeTheme} text-xl min-w-0 `} >{data.bank_info}</span>
          </div>
          <div className="flex justify-end w-full h-1/4 items-end">
            <div className="w-full flex justify-end">
              <form className="flex flex-row justify-end h-1/2 px-1 items-end">
                    <label className={`text-${oppositeTheme} text-2xl`}>Is Active</label>
                    <input type="checkbox"
                     onChange={handleIsActive}
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
