import { useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { createWalletTank } from "../../apis/common/wallet/apis";
import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import cross from "../../Images/pages/layout/Profile/cross.png";
import axios from "axios";
const Addcard = ({ addCard, setAddCard, show }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const wallet = useWalletState();
  const [params, setParams] = useState({
    wallet_asset: "",
    wallet_tank_type: "",
    title: "",
    balance: "",
    locked: "",
    pending: "",
    bank_info: "",
  });

  const LinkedWalletAsset = wallet.walletAssets.filter(
    (data) => data.currency_abb === show
  );
  const [title, setTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [shabaNumber, setShabaNumber] = useState("");
  console.log(show);
  const handleAddCards = (e) => {
    e.preventDefault();
    setAddCard(false);
    // createWalletTank(params);
  };
  const discard = () => {
    setAddCard(false);
  };

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const { createWalletTank, isLoading: createWalletTankIsLoading } =
    useCreateWalletTank();
  useEffect(() => {
    setIsLoadingSplashScreen(createWalletTankIsLoading);
  }, [createWalletTankIsLoading]);
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
          className={`bg-${theme}-back rounded-lg z-50 w-1/2 h-1/3 px-5 py-2 grid grid-rows-5 grid-cols-1`}
        >
          <button
            className="flex justify-end"
            style={{ gridRow: 1, gridColumn: 1 }}
            onClick={discard}
            type="button"
          >
            <img className="" alt="" src={cross} />
          </button>
          <form onSubmit={handleAddCards}>
            <div className="flex flex-col">
              <span
                className={`text-${oppositeTheme} text-xl font-mine-bold mt-3`}
              >
                {lang["add_cards_title"]}
              </span>
              <div className=" w-full">
                <div className="w-full flex mt-0 px-2">
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                    placeholder={lang["add_cards_title"]}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-${oppositeTheme} text-xl font-mine-bold mt-1`}
              >
                {lang["cards_card_number"]}
              </span>
              <div className=" w-full">
                <div className="w-full flex mt-0 px-2">
                  <input
                    onChange={(e) => setCardNumber(e.target.value)}
                    className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                    placeholder={lang["cards_card_number_placeholder"]}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`bg-blue text-${theme} rounded-lg w-2/5 pt-1 mt-1`}
            >
              {lang["submit"]}
            </button>
          </form>
        </div>
      </div>
      {/* <div
        className={
          addCard
            ? `bg-${theme}-back w-11/12 h-1/2 ml-11 mb-0 rounded-lg p-2 absolute top-5 z-10`
            : "hidden"
        }
      > */}
      {/* <button
          className={`bg-transparent rounded-lg w-2/5 absolute top-1 z-10 right-0`}
          onClick={discard}
          type="button"
        >
          <img className="w-5 absolute right-5 top-1" alt="" src={cross} />
        </button>
        <form onSubmit={handleAddCards}>
          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-xl font-mine-bold mt-3`}
            >
              {lang["add_cards_title"]}
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0 px-2">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                  placeholder={lang["add_cards_title"]}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-xl font-mine-bold mt-1`}
            >
              {lang["cards_card_number"]}
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0 px-2">
                <input
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                  placeholder={lang["cards_card_number_placeholder"]}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-xl font-mine-bold mt-1`}
            >
              {lang["cards_shaba_number"]}
            </span>
            <div className=" w-full">
              <div className="w-full flex mt-0 px-2">
                <input
                  onChange={(e) => setShabaNumber(e.target.value)}
                  className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                  placeholder={lang["cards_shaba_number_placeholder"]}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`bg-blue text-${theme} rounded-lg w-2/5 pt-1 mt-1`}
          >
            {lang["submit"]}
          </button>
        </form> */}
    </>
  );
};

export default Addcard;
