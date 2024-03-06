import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useWalletState } from "../../Providers/WalletProvider";
import { useEffect, useState } from "react";
import SingleCardAssets from "./singleCardAssets";
import SingleCardTank from "./singleCardTank";
import cross from "../../Images/pages/layout/Profile/crossCardsGray.png";
import { useUserState } from "../../Providers/UserProvider";
import { useTokenState } from "../../Providers/TokenProvider";
import { useGetWalletData } from "../../Providers/WalletProvider";
import AddCardModal from "../../components/modals/CardModals/AddCardModal";
import { useNavigate } from "react-router-dom";
import { useLanguageListState } from "../../Providers/LanguageListProvider";
import { useModalDataSetState } from "../../Providers/ModalDataProvider";
import { useFontState } from "../../Providers/FontProvider";
const Cards = () => {
  const wallet = useWalletState();
  const setModalData = useModalDataSetState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [show, setShow] = useState([]);
  const [Tanks, setTanks] = useState([]);
  const [toggle, setToggle] = useState(false);

  const updateShowState = (newState) => {
    setShow(newState);
  };

  function discard() {
    setShow("");
  }

  useEffect(() => {
    if (wallet) {
      setTanks(
        wallet.walletTanks.filter(
          (data) => data.currency_abb === show && data.is_deleted === false
        )
      );
    }
  }, [show]);
  const openAddCardModal = () => {
    setModalData({
      children: <AddCardModal />,
      canClose: true,
      isOpen: true,
    });
  };

  return (
    <div
      style={{ fontFamily: "manjari-bold" }}
      className="absolute  w-full h-full overflow-y-auto"
    >
      <div className="xs:hidden md:mt-0 md:grid grid-cols-12 md:gap-x-10 gap-y-7 pb-16 h-full">
        <div
          className={`col-span-12 md:col-span-3 bg-${theme} rounded-3xl flex  flex-col p-8`}
        >
          <span
            className={`w-full flex justify-start text-2xl text-${oppositeTheme}`}
          >
            {lang["cards-profile"]}
          </span>
          <div className="w-full h-full flex flex-col items-center">
            {wallet && wallet.walletAssets ? (
              wallet.walletAssets.map((assetData, assetIndex) => (
                <SingleCardAssets
                  assetIndex={assetIndex}
                  assetData={assetData}
                  updateShowState={updateShowState}
                />
              ))
            ) : (
              <div className="text-white">Loading...</div>
            )}
          </div>
        </div>
        <div
          className={`col-span-12 md:col-span-9 bg-${theme} rounded-3xl md:rounded-r-none flex flex-col p-5 overflow-y-scroll`}
        >
          <div className="w-full h-8 flex justify-end">
            <button
              onClick={openAddCardModal}
              className={
                "bg-blue-gradient text-white rounded-2xl w-36 mr-5 h-full items-center font-thin mt-1"
              }
            >
              <span className="mt-1 pb-0">{lang["add"]}</span>
              <span className="ml-1">+</span>
            </button>
          </div>
          <div className="w-full h-full grid xs:grid-cols-1 lg:grid-cols-2">
            {Tanks.map((data, index) => (
              <SingleCardTank index={index} data={data} setToggle={setToggle} />
            ))}
          </div>
        </div>
      </div>
      {/* xs and sm */}
      <div
        style={{ width: "100%", height: "92%" }}
        className={`md:hidden xs:flex p-5 bg-${theme} rounded-3xl`}
      >
        <div className={show ? "hidden" : "w-full h-full flex flex-col"}>
          <span
            className={`w-full flex justify-start text-2xl text-${oppositeTheme}`}
          >
            {lang["cards"]}
          </span>
          <div className="w-full h-fit flex flex-col items-center">
            {wallet && wallet.walletAssets ? (
              wallet.walletAssets.map((assetData, assetIndex) => (
                <SingleCardAssets
                  assetIndex={assetIndex}
                  assetData={assetData}
                  updateShowState={updateShowState}
                />
              ))
            ) : (
              <div className="text-white">Loading...</div>
            )}
          </div>
        </div>
        <div className={show ? "w-full h-full p-5" : "hidden"}>
          <div className="w-full flex flex-row h-8">
            <div className="w-1/2 h-full flex justify-start">
              <button
                className="flex justify-start w-fit h-full"
                onClick={discard}
              >
                <img className="h-full w-fit flex justify-end" src={cross} />
              </button>
            </div>
            <div className="w-1/2 h-full flex justify-end">
              <button
                onClick={openAddCardModal}
                className={
                  "bg-blue-gradient text-white rounded-2xl w-36 h-full items-center font-thin"
                }
              >
                <span className="mt-1 pb-0">Add</span>
                <span className="ml-1">+</span>
              </button>
            </div>
          </div>
          <div className="w-full h-full flex-col overflow-y-scroll flex items-center mt-5">
            {Tanks.map((data, index) => (
              <SingleCardTank index={index} data={data} setToggle={setToggle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
