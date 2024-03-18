import { useThemeState } from "../../Providers/ThemeProvider";
import starChecked from "../../Images/pages/layout/Profile/starChecked.png";
import { useLanguageState } from "../../Providers/LanguageProvider";
import starUnChecked from "../../Images/pages/layout/Profile/starUnChecked.png";
import edit from "../../Images/pages/layout/Profile/editBlue.png";
import { useState, useEffect } from "react";
import { useEditWalletTanks } from "../../apis/common/wallet/hooks";
import EditCardModal from "../../components/modals/CardModals/EditCardModal";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useModalDataSetState } from "../../Providers/ModalDataProvider";
import { useNavigate } from "react-router-dom";
const SingleCardTank = ({ index, data }) => {
  const setModalData = useModalDataSetState();
  const lang = useLanguageState();
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
  const [accountName, setAccountName] = useState("");
  const [bankInfo, setBankInfo] = useState("");
  const [bankName, setBankName] = useState("");
  const [walletTankType, setWalletTankType] = useState("");
  const [user, setUser] = useState("");
  const [isFavorite, setIsFavorite] = useState("");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    if (data) {
      setAccountName(data.account_name);
      setBankName(data.bank_name);
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
    if (walletTankType && walletTankType.includes("card")) {
      const sanitizedValue = value.replace(/\D/g, "");
      const chunks = sanitizedValue.match(/.{1,4}/g);
      const result = chunks ? chunks.join(" ") : "";
      return result;
    }
    if (walletTankType && walletTankType.includes("shaba")) {
      const sanitizedValue = value;

      return sanitizedValue;
    } else {
      return value;
    }
  };
  return (
    <>
      <div
        className={`block bg-${theme}-back xs:w-full md:w-11/12 rounded-3xl ml-5 mt-5 lg:grid-cols-${
          index % 2 === 0 ? 1 : 2
        } xs:grid-cols-1`}
        style={{
          height: "fit-content",
        }}
      >
        <div
          className={
            bankName
              ? `w-full h-full flex flex-col px-9 p-6`
              : `w-full h-full flex flex-col px-9 p-3`
          }
        >
          <div className={bankName ? "flex flex-row h-fit w-full " : "hidden"}>
            <div className="w-1/2 h-full">
              <span className="text-blue text-3xl w-full h-full flex justify-start ">
                {bankName}
              </span>
            </div>
            <div className="w-1/2 h-full flex flex-row justify-end  ">
              <button
                onClick={() => {
                  openEditCardModal(data);
                }}
                className="flex justify-end w-1/3 items-center"
              >
                <img alt="" src={edit} className="xs:w-1/2 md:w-1/3 h-5/6" />
              </button>
              <button
                onClick={handleCheckboxChange}
                className="flex justify-end h-full w-1/3"
              >
                <img
                  className="w-1/2 h-full"
                  alt=""
                  src={isFavorite ? starChecked : starUnChecked}
                />
              </button>
            </div>
          </div>
          <div
            className={
              bankName
                ? "w-full h-fit flex justify-start flex-col"
                : "w-full h-1/2 flex justify-start flex-col"
            }
            style={{ marginTop: "5%" }}
          >
            <div className="text-gray text-2xl w-full h-1/2 min-w-0 flex flex-row">
              <span className={"text-gray text-2xl w-1/2 h-full"}>
                {lang["Account_Name"]}
              </span>
              <div
                className={
                  bankName
                    ? "hidden"
                    : "w-1/2 h-full flex flex-row justify-end "
                }
              >
                <button
                  onClick={() => {
                    openEditCardModal(data);
                  }}
                  className="flex justify-end h-full  w-1/6 mr-1"
                >
                  <img className="w-2/3 h-2/3" alt="" src={edit} />
                </button>
                <button
                  onClick={handleCheckboxChange}
                  className="flex justify-end h-full w-1/6"
                >
                  <img
                    className="w-full h-3/4"
                    alt=""
                    src={isFavorite ? starChecked : starUnChecked}
                  />
                </button>
              </div>
            </div>
            <span
              className={`text-${oppositeTheme} text-2xl min-w-0 h-1/2 w-full py-1`}
            >
              {accountName}
            </span>
          </div>
          <div
            className={
              bankName
                ? "w-full h-fit flex justify-start flex-col overflow-x-scroll"
                : "w-full h-1/2 flex justify-start flex-col overflow-x-scroll"
            }
            style={{ marginTop: "1%" }}
          >
            <span className="text-gray text-2xl w-full h-1/2 min-w-0 ">
              {lang["Bank_Info"]}
            </span>
            <span className={`text-${oppositeTheme} text-2xl min-w-0 py-1`}>
              {showBankInfoCorrect(bankInfo)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCardTank;
