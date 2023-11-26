import { useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import cross from "../../Images/pages/layout/Profile/cross.png";
import { CustomDropdown } from "../../components/common/CustomDropdown";
import axios from "axios";
const Addcard = ({ addAsset, setAddAsset }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  const [title, setTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [shabaNumber, setShabaNumber] = useState("");

  const handleAddAssets = async (e) => {
    e.preventDefault();
    setAddAsset(false);
  };
  const discard = () => {
    setAddAsset(false);
  };
  return (
    <>
      <div
        className={
          addAsset
            ? `bg-${theme}-back w-10/12 h-1/2 ml-8 mb-0 rounded-lg p-2 absolute left-0 z-10`
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
        <form onSubmit={handleAddAssets}></form>
      </div>
    </>
  );
};

export default Addcard;
