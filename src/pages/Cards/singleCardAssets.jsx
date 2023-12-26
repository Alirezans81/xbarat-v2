import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import arrowRightLight from "../../Images/arrow-right-light-thin.png";
import arrowRightDark from "../../Images/arrow-right-dark-thin.png";
const SingleCardAssets = ({ assetData, assetIndex, updateShowState }) => {
  const wallet = useWalletState();
  const theme = useThemeState();
  const lang = useLanguageState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const numberOfBanks = wallet.walletTanks.filter(
    (data) =>
      data.bank_name !== null && data.currency_abb === assetData.currency_abb
  );
  const walletTanks = wallet.walletTanks.filter(
    (data) => data.currency_abb === assetData.currency_abb
  );
  function handleShow() {
    
    updateShowState(assetData.currency_abb);
  }
  // border-2 border-solid border-white
  console.log(lang)
  return (
    <>
      <div
        className={`bg-${theme}-back h-full rounded-3xl w-full flex flex-row`}
        style={{ gridRow: assetIndex, gridColumn: 1 }}
      >
          <div
            className="h-full lg:w-76 md:w-72 xs:w-3/4 pt-1 sm:px-5 md:px-3"
          >
            <span
              className={`min-h-0 overflow-scroll flex justify-end mt-4 text-${oppositeTheme} lg:text-3xl md:text-3xl sm:ml-3 md:ml-5 xs:text-2xl sm:text-3xl sm:mr-24 md:mr-11 xs:mr-20`}
            >
              {assetData.currency_abb}
            </span>
            <span className="flex justify-end text-gray md:mr-0 lg:text-xl md:text-lg md:ml-6 sm:text-2xl sm:ml-3 min-h-0 sm:mr-5 xs:mr-9">
              {walletTanks.length +
                " " +
                lang["cards-profile"] +
                " /" +
                numberOfBanks.length +
                " " +
                "Banks"}
            </span>
          </div>
          <div className="lg:w-24 w-fit xs:w-1/4">
              <button 
              onClick={handleShow}
              className="flex justify-end items-center w-full h-full">
                <img className="w-12 h-9" src={theme==="light"?arrowRightDark:arrowRightLight}/>
              </button>
          </div>
          
      </div> 
   
    </>
  );
};

export default SingleCardAssets;
