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
  return (
    <>
      <div
        className={`bg-${theme}-back h-full rounded-3xl mb-0 mt-0 flex flex-col`}
        style={{ gridRow: assetIndex, gridColumn: 1 }}
      >
        <div className="w-full h-full bg-transparent grid grid-rows-1 grid-cols-10">
          <div
            className="h-full w-52 flex flex-col"
            style={{ gridRow: 1, gridColumn: 1 }}
          >
            <span
              className={`flex justify-end px-11 mt-4 text-${oppositeTheme} text-2xl`}
            >
              {assetData.currency_abb}
            </span>
            <span className="flex justify-end mt-1 px-3 text-gray">
              {walletTanks.length +
                " " +
                lang["cards-profile"] +
                "/" +
                numberOfBanks.length +
                " " +
                "Banks"}
            </span>
          </div>
          <div className="h-full w-20" style={{ gridRow: 1, gridColumn: 8 }}>
            <button
              onClick={handleShow}
              className="flex justify-end mt-7 ml-10"
              style={{ gridRow: 1, gridColumn: 2 }}
            >
              <img
                alt=""
                className="h-8 w-15"
                src={theme === "dark" ? arrowRightLight : arrowRightDark}
              />
            </button>{" "}
          </div>
        </div>

        {/* <div className="w-full grid grid-rows-1 grid-cols-2">
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
        </div> */}
      </div>
    </>
  );
};

export default SingleCardAssets;
