import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import { useUpdateWalletTank } from "../../../../apis/pages/Cards/hooks";
import { useRefreshWallet } from "../../../../hooks/useRefreshWallet";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import {
  useModalDataClose,
  useModalDataSetState,
} from "../../../../Providers/ModalDataProvider";
import AreYouSureModal from "../../../modals/AreYouSureModal";

const Card = ({
  data,
  toggleIsActive,
  toggleisFavorite,
  deleteWalletTank,
  openEditAddCardModal,
}) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const lang = useLanguageState();

  const getBankInfoClass = (type) => {
    if (type === "Card Number") {
      return "text-xl md:text-2xl";
    } else if (type === "Shaba Number") {
      return "text-xl lg:text-base xlg:text-xl xl:text-2xl";
    } else if (type === "Paypal Email") {
      return "text-xl md:text-2xl";
    } else {
      return "";
    }
  };

  const giveSpaceBetween = (x) => {
    var parts = x.split(" ");
    parts[0] = parts[0].replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    return parts.join(" ");
  };

  const getBankImageSrc = (type) => {
    if (type === "Card Number" || type === "Shaba Number") {
      return require("../../../../Images/pages/layout/Cards/shetab.png");
    } else if (type === "Paypal Email") {
      return require("../../../../Images/pages/layout/Cards/paypal.png");
    } else {
      return require("../../../../Images/pages/NoPage/image.png");
    }
  };

  return (
    <div
      className={`mx-auto bg-${theme}-back pt-3 pb-5 px-6 flex flex-col justify-between rounded-2xl h-[13rem] md:h-[14.5rem] lg:h-[12.5rem] w-[98%] lg:w-[48%]`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className={`flex gap-x-3 mt-1 items-center`}>
          <div className={`bg-${theme} rounded-full p-3`}>
            <img
              className="w-6 h-6 md:w-7 md:h-7"
              src={getBankImageSrc(data.wallet_tank_type_title)}
            />
          </div>
          <span
            className={`hidden xs:block text-xl text-${oppositeTheme} font-${font}-regular pt-1.5`}
          >
            {data.bank_name}
          </span>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-x-2 pt-1">
            <button type="button" onClick={toggleisFavorite} className="">
              <img
                className="w-6 h-6"
                src={require(`../../../../Images/pages/layout/Navbar/setting/star-shown-${data.is_favorite}.png`)}
              />
            </button>
            <button
              type="button"
              onClick={() => openEditAddCardModal("edit", data)}
              className=""
            >
              <img
                className="w-5 h-5"
                src={require(`../../../../Images/pages/layout/Profile/edit.png`)}
              />
            </button>
            <button type="button" onClick={deleteWalletTank} className="">
              <img
                className="w-6 h-6"
                src={require(`../../../../Images/multiplication.png`)}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:mt-2">
        <span
          className={`${getBankInfoClass(
            data.wallet_tank_type_title
          )} font-${font}-regular text-blue pt-2.5`}
        >
          {giveSpaceBetween(data.bank_info)}
        </span>
        <span className={`text-xl text-gray font-${font}-regular -mt-0.5`}>
          {data.account_name}
        </span>
      </div>
      <div className="w-full flex justify-end items-center mt-1">
        <div className="flex gap-x-2 items-center">
          <span
            className={`text-sm md:text-base text-${oppositeTheme} font-${font}-regular pt-1`}
          >
            Is Active
          </span>
          <button
            type="button"
            onClick={toggleIsActive}
            className={`border-2 border-blue w-5 h-5 rounded-md ${
              data.is_active ? "bg-blue" : ""
            }`}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default function WalletTankCard({
  data,
  selectedCurrencyIndex,
  setDeletCardCount,
  openEditAddCardModal,
}) {
  const lang = useLanguageState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const setModalData = useModalDataSetState();
  const closeModal = useModalDataClose();

  const [changedData, setChangedData] = useState();
  useEffect(() => {
    setChangedData(null);
  }, [selectedCurrencyIndex]);

  const { updateWalletTank, isLoading: updateWalletTankIsLoading } =
    useUpdateWalletTank();
  useEffect(
    () => setLoading(updateWalletTankIsLoading),
    [updateWalletTankIsLoading]
  );

  const refreshWallet = useRefreshWallet();

  const toggleisFavorite = () => {
    updateWalletTank(
      data.url,
      {
        is_favorite: changedData ? !changedData.is_favorite : !data.is_favorite,
      },
      (data) => {
        refreshWallet();
        setChangedData(data);
      }
    );
  };
  const toggleIsActive = () => {
    updateWalletTank(
      data.url,
      { is_active: changedData ? !changedData.is_active : !data.is_active },
      (data) => {
        refreshWallet();
        setChangedData(data);
      }
    );
  };
  const openCancelAreYouSureModal = () => {
    setModalData({
      title: lang["are-you-sure-modal-title"] + "?",
      children: (
        <AreYouSureModal
          onClick={() => {
            updateWalletTank(data.url, { is_deleted: true }, (data) => {
              refreshWallet();
              setChangedData(data);
              setDeletCardCount((prev) => !prev);
              closeModal();
            });
          }}
          message={lang["delete-wallet-tank-modal-message"] + "?"}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  if (!changedData || !changedData.is_deleted) {
    if (changedData) {
      return (
        <Card
          data={changedData}
          toggleisFavorite={toggleisFavorite}
          toggleIsActive={toggleIsActive}
          deleteWalletTank={openCancelAreYouSureModal}
          openEditAddCardModal={openEditAddCardModal}
        />
      );
    } else if (data) {
      return (
        <Card
          data={data}
          toggleisFavorite={toggleisFavorite}
          toggleIsActive={toggleIsActive}
          deleteWalletTank={openCancelAreYouSureModal}
          openEditAddCardModal={openEditAddCardModal}
        />
      );
    }
  }
}
