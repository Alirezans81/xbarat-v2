import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import arrowRightLight from "../../Images/arrow-right-light.png";
import arrowRightDark from "../../Images/arrow-right-dark.png";
const SingleCardAssets = ({ assetData, assetIndex, updateShowState }) => {
  const wallet = useWalletState();
  const theme = useThemeState();
  const lang = useLanguageState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const walletTanks = wallet.walletTanks.filter(
    (data) => data.currency_abb === assetData.currency_abb
  );
  function handleShow() {
    updateShowState(assetData.currency_abb);
  }
  return (
    <>
      <div
        className={`bg-${theme}-back h-full rounded-lg mb-0 mt-0`}
        style={{ gridRow: assetIndex, gridColumn: 1 }}
      >
        <span
          className={`text-${oppositeTheme} text-2xl flex justify-center mt-3 col-span-2`}
          style={{ gridRow: 1, gridColumn: 1 }}
        >
          {assetData.currency_abb}
        </span>

        <div className="w-full grid grid-rows-1 grid-cols-2">
          <span
            className={`text-gray ml-5 flex items-center`}
            style={{ gridRow: 1, gridColumn: 1 }}
          >
            {walletTanks.length + " " + lang["cards-profile"]}
          </span>

          <button
            onClick={handleShow}
            className="flex justify-end"
            style={{ gridRow: 1, gridColumn: 2 }}
          >
            <img
              alt=""
              className="h-10"
              src={theme === "dark" ? arrowRightLight : arrowRightDark}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleCardAssets;