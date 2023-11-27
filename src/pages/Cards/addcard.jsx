import { useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import cross from "../../Images/pages/layout/Profile/cross.png";
import axios from "axios";
const Addcard = ({ addCard, setAddCard }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  const [title, setTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [shabaNumber, setShabaNumber] = useState("");

  const handleAddCards = async (e) => {
    e.preventDefault();
    setAddCard(false);
  };
  const discard = () => {
    setAddCard(false);
  };
  return (
    <>
      <div
        className={
          addCard
            ? `bg-${theme}-back w-11/12 h-1/2 ml-11 mb-0 rounded-lg p-2 absolute top-5 z-10`
            : "hidden"
        }
      >
        <button
          className={`bg-transparent rounded-lg w-2/5 absolute top-1 z-10 right-0`}
          onClick={discard}
          type="button"
        >
          <img className="w-5 absolute right-5 top-2" alt="" src={cross} />
        </button>
        <form onSubmit={handleAddCards}>
          <div className="flex flex-col">
            <span
              className={`text-${oppositeTheme} text-xl font-mine-bold mt-6`}
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
        </form>
      </div>
    </>
  );
};

export default Addcard;
