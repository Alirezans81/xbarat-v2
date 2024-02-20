import { useThemeState } from "../../Providers/ThemeProvider";
import starChecked from "../../Images/pages/layout/Profile/starChecked.png";
import starUnChecked from "../../Images/pages/layout/Profile/starUnChecked.png";
import edit from "../../Images/pages/layout/Profile/editBlue.png";
import { useState, useEffect } from "react";
import { useEditWalletTanks } from "../../apis/common/wallet/hooks";
import EditCardModal from "../../components/modals/CardModals/EditCardModal";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useModalDataSetState } from "../../Providers/ModalDataProvider";
import { useNavigate } from "react-router-dom";
const SingleCardTank = ({ index, data, setToggle }) => {
  const setModalData = useModalDataSetState();
  const navigate = useNavigate();
  const openEditCardModal = (data) => {
    setModalData({
      data: data,
      children: <EditCardModal />,
      canClose: true,
      isOpen: true,
    });
  };
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const { editWalletTank, isLoading: editWalletTankIsLoading } =
    useEditWalletTanks();
  useEffect(() => {
    setIsLoadingSplashScreen(editWalletTankIsLoading);
  }, [editWalletTankIsLoading]);
  const [title, setTitle] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankInfo, setBankInfo] = useState("");
  const [bankName, setBankName] = useState("");
  const [walletTankType, setWalletTankType] = useState("");
  const [user, setUser] = useState("");
  const [isFavorite, setIsFavorite] = useState("");
  const [params, setParams] = useState({
    url: "",
    wallet_asset: "",
    wallet_tank_type_title: "",
    currency_abb: "",
    title: "",
    balance: 1,
    locked: 1,
    account_name: "",
    pending: 1,
    bank_name: "",
    is_deleted: false,
    bank_info: "",
    is_favorite: false,
  });
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    if (data) {
      setAccountName(data.account_name);
      setBankName(data.bank_name);
      setTitle(data.title);
      setBankInfo(data.bank_info);
      setWalletTankType(data.wallet_tank_type);
      setUser(data.user);
      setIsFavorite(data.is_favorite);
    }
  }, [data]);

  const handleCheckboxChange = () => {
    if (isFavorite) {
      const params = {
        is_favorite: false,
      };
      editWalletTank(data.url, params);
    } else {
      const params = {
        is_favorite: true,
      };
      editWalletTank(data.url, params);
    }
    setIsFavorite(!isFavorite);

    sleep(1000).then(() => {
      navigate("/profile/");
    });
    sleep(1000).then(() => {
      window.location.reload();
    });
  };

  const showBankInfoCorrect = (value) => {
    if (walletTankType.includes("card")) {
      const sanitizedValue = value.replace(/\D/g, "");
      const chunks = sanitizedValue.match(/.{1,4}/g);
      const result = chunks ? chunks.join(" ") : "";
      return result;
    }
    if (walletTankType.includes("shaba")) {
      return value;
    } else {
      return value;
    }
  };
  return (
    <>
      {/* This is for lg screen */}
      <div
        className={`xs:hidden lg:block bg-${theme}-back w-11/12 rounded-3xl ml-5 mt-5`}
        style={{
          height: "fit-content",
          gridColumn: index % 2 === 0 ? 1 : 2,
        }}
      >
        <div className="w-full h-full flex flex-col p-6 px-9">
          <div className="flex flex-row h-1/4 w-full ">
            <span className="text-blue text-3xl w-5/6 h-full flex justify-start min-w-0 ">
              {bankName}
            </span>
            <button
              onClick={() => {
                openEditCardModal(data);
              }}
              className="flex justify-end h-fit w-1/6 mt-1"
            >
              <img alt="" src={edit} style={{ width: "43%", height: "43%" }} />
            </button>
            <button
              onClick={handleCheckboxChange}
              className="flex justify-end h-fit w-1/6"
            >
              <img
                alt=""
                src={isFavorite ? starChecked : starUnChecked}
                style={{ width: "61%", height: "61%" }}
              />
            </button>
          </div>
          <div
            className="w-full h-1/2 flex justify-start flex-col"
            style={{ marginTop: "5%" }}
          >
            <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">
              Account Name
            </span>
            <span className={`text-${oppositeTheme} text-2xl min-w-0 `}>
              {accountName}
            </span>
          </div>
          <div
            className="w-full h-1/2 flex justify-start flex-col"
            style={{ marginTop: "1%" }}
          >
            <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">
              Bank Info
            </span>
            <span className={`text-${oppositeTheme} text-2xl min-w-0 `}>
              {showBankInfoCorrect(bankInfo)}
            </span>
          </div>
        </div>
      </div>
      {/* This is for md screen */}
      <div
        className={`xs:hidden md:block lg:hidden bg-${theme}-back w-11/12 rounded-3xl ml-5 mt-5`}
        style={{
          height: "fit-content",

          gridColumn: 1,
        }}
      >
        <div className="w-full h-full flex flex-col p-6 px-9">
          <div className="flex flex-row h-1/4 w-full">
            <span className="text-blue text-3xl w-5/6 h-full flex justify-start min-w-0 ">
              {bankName}
            </span>
            <button
              onClick={() => {
                openEditCardModal(data);
              }}
              className="flex justify-end  h-fit w-fit mt-1"
            >
              <img alt="" src={edit} style={{ width: "62%", height: "62%" }} />
            </button>
            <button
              onClick={handleCheckboxChange}
              className="flex justify-end w-fit h-fit"
            >
              <img
                alt=""
                src={isFavorite ? starChecked : starUnChecked}
                style={{ width: "70%", height: "70%" }}
              />
            </button>
          </div>
          <div
            className="w-full h-1/2 flex justify-start flex-col"
            style={{ marginTop: "5%" }}
          >
            <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">
              Account Name
            </span>
            <span className={`text-${oppositeTheme} text-2xl min-w-0 `}>
              {accountName}
            </span>
          </div>
          <div
            className="w-full h-1/2 flex justify-start flex-col"
            style={{ marginTop: "5%" }}
          >
            <span className="text-gray text-lg w-full h-1/2 min-w-0">
              Bank Info
            </span>
            <span className={`text-${oppositeTheme} text-xl min-w-0 `}>
              {showBankInfoCorrect(bankInfo)}
            </span>
          </div>
        </div>
      </div>
      {/* This is for xs and sm */}
      <div
        className={`xs:flex md:hidden bg-${theme}-back w-11/12 ml-1 rounded-3xl mt-7 `}
        style={{
          height: "fit-content",
          gridColumn: 1,
        }}
      >
        <div className="w-full h-full flex flex-col p-6 px-9">
          <div className="flex flex-row h-1/4 w-full">
            <span className="text-blue text-3xl w-5/6 h-full flex justify-start ">
              {bankName}
            </span>
            <button
              onClick={() => {
                openEditCardModal(data);
              }}
              className="flex justify-end h-fit w-fit mt-1"
            >
              <img alt="" src={edit} style={{ width: "62%", height: "62%" }} />
            </button>
            <button
              onClick={handleCheckboxChange}
              className="flex justify-end w-fit h-fit"
            >
              <img
                alt=""
                src={isFavorite ? starChecked : starUnChecked}
                style={{ width: "70%", height: "70%" }}
              />
            </button>
          </div>
          <div
            className="w-full h-1/2 flex justify-start flex-col"
            style={{ marginTop: "5%" }}
          >
            <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">
              Account Name
            </span>
            <span className={`text-${oppositeTheme} text-2xl min-w-0 `}>
              {accountName}
            </span>
          </div>
          <div
            className="w-full h-1/2 flex justify-start flex-col"
            style={{ marginTop: "5%" }}
          >
            <span className="text-gray text-lg w-full h-1/2 min-w-0">
              Bank Info
            </span>
            <span className={`text-${oppositeTheme} text-xl min-w-0 `}>
              {showBankInfoCorrect(bankInfo)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCardTank;
