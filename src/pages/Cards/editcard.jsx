import { useEffect, useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useEditWalletTanks } from "../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import cross from "../../Images/pages/layout/Profile/crossCardsGray.png";
import { useFontState } from "../../Providers/FontProvider";
import { useUserState } from "../../Providers/UserProvider";

const EditCards = ({ editCards, setEditCards, data }) => {
  const currencies = useCurrenciesState();
  const user = useUserState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const tempCurrency = currencies.filter(
    (data) => data.currency_abb === data.abbreviation
  );
  const [title, setTitle] = useState(data.title);
  const [asset, setAsset] = useState(tempCurrency.url);
  const [type, setType] = useState(data.type);
  const [bankInfo, setBankInfo] = useState(data.bank_info);
  const [params, setParams] = useState({
    wallet_asset: "",
    wallet_tank_type: "",
    title: "",
    balance: 1,
    locked: 1,
    pending: 1,
    bank_info: "",
  });

  const { editWalletTank, isLoading: editWalletTankIsLoading } =
    useEditWalletTanks();
  useEffect(() => {
    setIsLoadingSplashScreen(editWalletTankIsLoading);
  }, [editWalletTankIsLoading]);

  useEffect(() => {
    if (title && type && asset && bankInfo) {
      setParams({
        user: user.url,
        currency: asset,
        wallet_tank_type:
          type === "Card"
            ? "https://xbarat-back.pro/api/wallet/tank/type/card-number/"
            : "https://xbarat-back.pro/api/wallet/tank/type/shaba-number/",
        title: title,
        balance: 0,
        locked: 0,
        pending: 0,
        bank_info: bankInfo,
      });
    }
  }, [title, type, asset, bankInfo]);
  const handleEditCards = (e) => {
    e.preventDefault();
    console.log("SSSS");
    console.log(params);
    setEditCards(false);
    editWalletTank(data.url, params);
    console.log(params);
  };
  const discard = () => {
    setEditCards(false);
  };
  return (
    <>
      <div
        className={
          editCards
            ? `fixed top-0 left-0 w-browser h-browser flex items-center justify-center z-20 `
            : "hidden"
        }
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        <div
          style={{ height: "fit-content" }}
          className={`bg-${theme} flex flex-col w-1/4 px-5 py-5 rounded-lg z-50`}
        >
          <button className="flex justify-end h-fit" onClick={discard}>
            <img className="w-6" src={cross} alt="" />
          </button>
          <form
            onSubmit={handleEditCards}
            className="w-full h-full flex justify-center flex-col"
          >
            <span
              className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
            >
              {lang["add_cards_title"]}
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0 px-2">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  value={title}
                  className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                  placeholder={lang["add_cards_title"]}
                />
              </div>
            </div>
            <span
              className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
            >
              {type === "Card"
                ? lang["cards_card_number"]
                : lang["cards_shaba_number"]}
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0 px-2">
                <input
                  onChange={(e) => setBankInfo(e.target.value)}
                  required
                  value={bankInfo}
                  className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                  placeholder={lang["add_cards_title"]}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className={
                  "bg-blue-gradient rounded-xl text-white w-1/4 h-1/3 pt-1 mt-5"
                }
              >
                {lang["submit"]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditCards;
