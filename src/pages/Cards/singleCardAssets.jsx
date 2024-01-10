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
  console.log(lang);
  return (
    <>
      <div
        className={`bg-${theme}-back h-full rounded-3xl w-full flex flex-row`}
        style={{ gridRow: assetIndex, gridColumn: 1 }}
      >
        <div className="w-1/5 bg-transparent px-3 h-full">
          <div
            onClick={handleShow}
            className="flex justify-end items-center w-full h-full"
          ></div>
        </div>
        <div className="flex-1 flex-col items-center flex justify-center h-full w-3/5">
          <span
            className={`min-h-0 text-${oppositeTheme} lg:text-3xl md:text-3xl xs:text-3xl sm:text-3xl`}
          >
            {assetData.currency_abb}
          </span>
          <span className="flex justify-end text-gray lg:text-xl md:text-lg sm:text-2xl xs-2xl min-h-0">
            {walletTanks.length +
              " " +
              lang["cards-profile"] +
              " /" +
              numberOfBanks.length +
              " " +
              "Banks"}
          </span>
        </div>
        <div className="w-1/5 bg-transparent px-3">
          <button
            onClick={handleShow}
            className="flex justify-end items-center w-full h-full"
          >
            <img
              className="w-12 h-9"
              src={theme === "light" ? arrowRightDark : arrowRightLight}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleCardAssets;
