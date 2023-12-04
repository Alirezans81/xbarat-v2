import { useState, useEffect } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import cross from "../../Images/pages/layout/Profile/cross.png";
import {
  CustomDropdown,
  CustomItem,
} from "../../components/common/CustomDropdown";
import { useCreateWalletAsset } from "../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import { useWalletState } from "../../Providers/WalletProvider";
const Addasset = ({ addAsset, setAddAsset, walletAsset }) => {
  const wallet = useWalletState();
  const currencies = useCurrenciesState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [currency, setCurrency] = useState("");
  const [params, setParams] = useState({
    wallet: "",
    currency: "",
  });

  let listCurrency = currencies.map((data) => data.abbreviation);
  let listAsset = walletAsset.map((data) => data.currency_abb);
  let AvailableNewAssets = listCurrency.filter(
    (data) => listAsset.includes(data) === false
  );
  useEffect(() => {
    const list = currencies.filter((data) => data.abbreviation === currency);
    if (currency) {
      setParams({ wallet: wallet.wallets[0].url, currency: list[0].url });
    }
  }, [currency]);

  const handleAddAssets = (e) => {
    e.preventDefault();
    setAddAsset(false);
    createWalletAsset(params);
  };
  const discard = () => {
    setAddAsset(false);
  };

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const { createWalletAsset, isLoading: createWalletAssetIsLoading } =
    useCreateWalletAsset();
  useEffect(() => {
    setIsLoadingSplashScreen(createWalletAssetIsLoading);
  }, [createWalletAssetIsLoading]);

  return (
    <>
      <div
        className={
          addAsset
            ? `fixed top-0 left-0 w-full h-full flex items-center justify-center z-50`
            : "hidden"
        }
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div
          className={`bg-${theme}-back rounded-lg z-50 w-2/12 h-1/3 grid grid-rows-3 grid-cols-1 px-5 py-2`}
        >
          <button
            onClick={discard}
            style={{ gridRow: 1, gridColumn: 1 }}
            className="flex justify-end"
          >
            <img src={cross} />
          </button>
          <div style={{ gridRow: 2, gridColumn: 1 }}>
            <form className="flex justify-center w-full col-span-2">
              <CustomDropdown
                className={"bg-transparent"}
                label={currency.length === 0 ? lang["currency"] : currency}
              >
                {AvailableNewAssets.map((data) => (
                  <CustomItem
                    onClick={() => setCurrency(data)}
                    className={"bg-transparent"}
                  >
                    {data}
                  </CustomItem>
                ))}
              </CustomDropdown>
            </form>
          </div>
          <button
            style={{ gridRow: 3, gridColumn: 1 }}
            onClick={discard}
            className="bg-blue text-white p-2 rounded-lg mt-4"
          >
            {lang["submit"]}
          </button>
        </div>
      </div>
      {/* <div className="w-full h-full bg-transparent grid grid-rows-5 grid-cols-1 gap-10">
          <button
            className={`bg-transparent rounded-lg flex justify-end`}
            onClick={discard}
            type="button"
            style={{ gridRow: 1, gridColumn: 1 }}
          >
            <img alt="" src={cross} />
          </button>
          <span
            className={`text-${oppositeTheme}`}
            style={{ gridRow: 2, gridColumn: 1 }}
          >
            {lang["choose_add_currency_cards_add_asset"]}
          </span>
          <div style={{ gridRow: 3, gridColumn: 1 }}>
            <form className="flex justify-center h-80">
              <CustomDropdown
                className={"bg-transparent"}
                label={currency.length === 0 ? lang["currency"] : currency}
              >
                {AvailableNewAssets.map((data) => (
                  <CustomItem
                    onClick={() => setCurrency(data)}
                    className={"bg-transparent"}
                  >
                    {data}
                  </CustomItem>
                ))}
              </CustomDropdown>
            </form>
          </div>
          <button
            onClick={handleAddAssets}
            className={`bg-blue text-${oppositeTheme} h-10 rounded-lg w-full`}
            style={{ gridRow: 4, gridColumn: 1 }}
          >
            {lang["submit"]}
          </button>
        </div> */}
    </>
  );
};

export default Addasset;
