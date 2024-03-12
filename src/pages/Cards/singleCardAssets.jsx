import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import arrowRightLight from "../../Images/arrow-right-light-thin.png";
import arrowRightDark from "../../Images/arrow-right-dark-thin.png";
import { useFontState } from "../../Providers/FontProvider";
const SingleCardAssets = ({ assetData, assetIndex, updateShowState }) => {
  const wallet = useWalletState();
  const theme = useThemeState();
  const lang = useLanguageState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const walletTanks = wallet.walletTanks.filter(
    (data) =>
      data.currency_abb === assetData.currency_abb && data.is_deleted === false
  );
  const numberOfBanks = walletTanks.filter(
    (data) =>
      data.bank_name !== null && data.currency_abb === assetData.currency_abb
  );
  const handleShow = () => {
    updateShowState(assetData.currency_abb);
  };
  return (
    <>
      <div
        className={`bg-${theme}-back  rounded-3xl w-full h-fit flex flex-row pb-3 pt-3 m-3 font-${font} overflow-scroll`}
        style={{ gridRow: assetIndex, gridColumn: 1 }}
      >
        <div className="w-1/5"></div>
        <div className="flex flex-col items-center justify-center h-full w-3/5">
          <span className={`text-${oppositeTheme}  text-3xl`}>
            {assetData.currency_abb}
          </span>
          <span className="flex justify-end text-gray text-xl min-h-0">
            {walletTanks.length +
              " " +
              lang["cards-profile"] +
              " /" +
              numberOfBanks.length +
              " " +
              lang["banks"]}
          </span>
        </div>
        <div className="w-1/5 h-full bg-transparent">
          <button
            onClick={handleShow}
            className="flex justify-end items-center w-full h-full"
          >
            <img
              alt=""
              className="w-8 h-6 mr-3"
              src={theme === "light" ? arrowRightDark : arrowRightLight}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleCardAssets;
