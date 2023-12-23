import { useEffect, useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useCreateWalletTank } from "../../apis/common/wallet/hooks";
import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import cross from "../../Images/pages/layout/Profile/crossCardsGray.png";
import axios from "axios";
import { useFontState } from "../../Providers/FontProvider";
const Addcard = ({ addCard, setAddCard, show }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const wallet = useWalletState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const [title, setTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [shabaNumber, setShabaNumber] = useState("");

  const [params, setParams] = useState({
    wallet_asset: "",
    wallet_tank_type: "",
    title: "",
    balance: 1,
    locked: 1,
    pending: 1,
    bank_info: "test",
  });

  const { createWalletTank, isLoading: createWalletTankIsLoading } =
    useCreateWalletTank();
  useEffect(() => {
    setIsLoadingSplashScreen(createWalletTankIsLoading);
  }, [createWalletTankIsLoading]);

  useEffect(() => {
    if (title && (cardNumber || shabaNumber)) {
      setParams({
        wallet_asset: LinkedWalletAsset[0].url,
        wallet_tank_type: cardNumber
          ? "https://smicln.ir/api/wallet/tank/type/card-number/"
          : "https://smicln.ir/api/wallet/tank/type/shaba-number/",
        title: title,
        balance: 0,
        locked: 0,
        pending: 0,
        bank_info: "test",
      });
    }
  }, [title, cardNumber, shabaNumber]);

  const LinkedWalletAsset = wallet.walletAssets.filter(
    (data) => data.currency_abb === show
  );

  const handleAddCards = (e) => {
    e.preventDefault();
    setAddCard(false);
    createWalletTank(params);
    console.log(params);
  };

  const discard = () => {
    setAddCard(false);
  };

  return (
    <>
      <div
        className={
          addCard
            ? `fixed top-0 left-0 w-full h-full flex items-center justify-center z-50`
            : "hidden"
        }
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        <div
          style={{ height: "36%" }}
          className={`bg-${theme} grid grid-cols-1 grid-rows-10 w-1/4 px-5 py-5 rounded-lg z-50`}
        >
          <button
            className="flex justify-end h-fit"
            onClick={discard}
            style={{ gridRow: 1, gridColumn: 1 }}
          >
            <img className="w-6" src={cross} alt="" />
          </button>
          <form onSubmit={handleAddCards}>
            <div className="flex flex-col">
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
                    className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                    placeholder={lang["add_cards_title"]}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-${oppositeTheme} text-xl font-${font}-bold mt-1`}
              >
                {lang["cards_card_number"]}
              </span>
              <div className=" w-full">
                <div className="w-full flex mt-0 px-2">
                  <input
                    onChange={(e) => setCardNumber(e.target.value)}
                    className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                    placeholder={lang["cards_card_number_placeholder"]}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-${oppositeTheme} text-xl font-${font}-bold mt-1`}
              >
                {lang["cards_shaba_number"]}
              </span>
              <div className=" w-full">
                <div className="w-full flex mt-0 px-2">
                  <input
                    onChange={(e) => setShabaNumber(e.target.value)}
                    className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                    placeholder={lang["cards_shaba_number_placeholder"]}
                  />
                </div>
              </div>
            </div>
            <div
              style={{ gridRow: 5, gridColumn: 1 }}
              className="flex justify-end"
            >
              <button className="bg-blue-gradient rounded-xl text-white w-1/4 h-1/3 pt-1 mt-5">
                {lang["submit"]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addcard;
