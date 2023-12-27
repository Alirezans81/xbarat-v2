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
  const currencies = useCurrenciesState("");
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
    // createWalletAsset(params);
  };
  const discard = () => {
    setAddAsset(false);
  };

  // const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  // const { createWalletAsset, isLoading: createWalletAssetIsLoading } =
  //   useCreateWalletAsset();
  // useEffect(() => {
  //   setIsLoadingSplashScreen(createWalletAssetIsLoading);
  // }, [createWalletAssetIsLoading]);

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
          className={`bg-${theme}-back rounded-lg z-50 w-fit h-fit flex flex-col px-5 py-2`}
        >
          <button onClick={discard} className="flex justify-end">
            <img src={cross} />
          </button>
          <div>
            <form className="flex justify-center w-full mt-2">
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
            className="bg-blue text-white pt-1 rounded-lg mt-4 lg:text-lg md:text-base sm:text-sm text-xs"
          >
            {lang["submit"]}
          </button>
        </div>
      </div>
    </>
  );
};

export default Addasset;
