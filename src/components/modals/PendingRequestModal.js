import React, { useEffect, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useAddComma } from "../../hooks/useNumberFunctions";
import PendingRequestModalStatus from "./PendingRequestModal/PendingRequestModalStatus";
import CustomUploader from "../../components/common/CustomUploader";
import CustomPreviewer2 from "../../components/common/CustomPreviewer2";
import SubmitButton from "../common/SubmitButton";
import { useUploadRequestDocument } from "../../apis/pages/Wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useStatusesState } from "../../Providers/StatusesProvider";
import { useModalDataClose } from "../../Providers/ModalDataProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useGetWalletTanks } from "../../apis/common/wallet/hooks";
import { CustomDropdown, CustomItem } from "../common/CustomDropdown";
import Stepper from "./PendingRequestModal/Stepper";
import CopyText from "../common/CopyText";

export default function PendingRequestModal({ refreshPendingRequests, data }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();
  const setLoading = useIsLoadingSplashScreenSetState();
  const statuses = useStatusesState();
  const closeModal = useModalDataClose();

  const [document, setDocument] = useState();
  useEffect(() => {
    setLoading(false);
  }, [document]);

  const { uploadRequestDocument, isLoading: uploadRequestDocumentIsLoading } =
    useUploadRequestDocument();
  useEffect(
    () => setLoading(uploadRequestDocumentIsLoading),
    [uploadRequestDocumentIsLoading]
  );

  const [receiverTanks, setReceiverTanks] = useState([]);
  const [selectedWalletTank, setSelectedWalletTank] = useState(-1);
  const { getWalletTanks, isLoading: getWalletTanksIsLoading } =
    useGetWalletTanks();
  useEffect(
    () => setLoading(getWalletTanksIsLoading),
    [getWalletTanksIsLoading]
  );

  useEffect(() => {
    if (data && data.user_receiver_username && data.currency_slug) {
      getWalletTanks(
        {
          user: data.user_receiver_username,
          currency_slug: data.currency_slug,
        },
        (walletTanks) => {
          if (data.currency_abb === "IRR") {
            if (+data.amount <= 100000000) {
              const temp = walletTanks.filter(
                (d) =>
                  d.show_order &&
                  d.is_active &&
                  d.bank_info &&
                  d.wallet_tank_type_title === "Card Number"
              );
              setReceiverTanks(temp);
            } else {
              const temp = walletTanks.filter(
                (d) =>
                  d.show_order &&
                  d.is_active &&
                  d.bank_info &&
                  d.wallet_tank_type_title === "Shaba Number"
              );
              setReceiverTanks(temp);
            }
          } else {
            const temp = walletTanks.filter(
              (d) => d.show_order && d.is_active && d.bank_info
            );
            setReceiverTanks(temp);
          }
        }
      );
    }
  }, []);

  const hasPreviewImage = () => {
    if (
      data.status_title === "Admin Approve" ||
      data.status_title === "Accept" ||
      data.status_title === "Reject"
    ) {
      return true;
    }
    return false;
  };

  const findStep = () => {
    const type = data && data.type ? data.type : "";
    const status = data && data.status_title ? data.status_title : "";

    if (data) {
      if (type === "deposit" || type === "withdrawal") {
        if (status === "Admin Assign") return 1;
        if (status === "Upload Document") return 2;
        if (status === "Admin Approve") return 3;
        if (status === "Accept" || status === "Reject") return 4;
      } else if (type === "transfer") {
        if (status === "Admin Approve") return 1;
        if (status === "Accept" || status === "Reject") return 2;
      }
    }
  };

  useEffect(() => {
    receiverTanks.length === 1 && setSelectedWalletTank(0);
  }, [receiverTanks]);

  return (
    <div className="flex flex-col w-80">
      <div className="w-full mb-1">
        <Stepper type={data && data.type ? data.type : ""} step={findStep()} />
      </div>
      {data && data.type === "deposit" && (
        <span className={`font-${font}-regular text-green`}>
          {lang["deposit"]}
        </span>
      )}
      {data && data.type === "withdrawal" && (
        <span className={`font-${font}-regular text-red`}>
          {lang["withdrawal"]}
        </span>
      )}
      {data && data.type === "transfer" && (
        <span className={`font-${font}-regular text-blue`}>
          {lang["transfer"]}
        </span>
      )}
      <span className={`font-${font}-regular text-xl text-${oppositeTheme}`}>
        {addComma(+data.amount) + " " + data.currency_abb}
      </span>
      <div className="w-80 mt-3">
        {data && data.status_title && data.document && hasPreviewImage() && (
          <CustomPreviewer2 imageUrl={data.document} />
        )}
        {data && data.status_title === "Upload Document" && (
          <div className="flex flex-col gap-y-2 mb-5">
            <span
              className={`text-yellow text-xl font-${font}-regular text-center`}
            >
              {receiverTanks &&
              receiverTanks[selectedWalletTank] &&
              receiverTanks[selectedWalletTank].account_name
                ? receiverTanks[selectedWalletTank].account_name
                : ""}
            </span>
            <div className="w-full flex relative">
              <CustomDropdown
                label={
                  selectedWalletTank >= 0 &&
                  receiverTanks[selectedWalletTank] &&
                  receiverTanks[selectedWalletTank].bank_info
                    ? receiverTanks[selectedWalletTank].bank_info
                    : lang["card-number-or-paypal-email"]
                }
                labelClassName={
                  selectedWalletTank >= 0 &&
                  receiverTanks[selectedWalletTank] &&
                  receiverTanks[selectedWalletTank].bank_info
                    ? "ml-20 w-[55%] line-clamp-1"
                    : ""
                }
              >
                {receiverTanks.map((receiverTank, index) => {
                  if (index === 0 && index === receiverTanks.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-xl"
                        onClick={() => setSelectedWalletTank(index)}
                      >
                        {receiverTank && receiverTank.bank_info
                          ? receiverTank.bank_info
                          : "error"}
                      </CustomItem>
                    );
                  } else if (index === 0) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-t-xl"
                        onClick={() => setSelectedWalletTank(index)}
                      >
                        {receiverTank && receiverTank.bank_info
                          ? receiverTank.bank_info
                          : "error"}
                      </CustomItem>
                    );
                  } else if (index === receiverTanks.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-b-xl"
                        onClick={() => setSelectedWalletTank(index)}
                      >
                        {receiverTank && receiverTank.bank_info
                          ? receiverTank.bank_info
                          : "error"}
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        key={index}
                        onClick={() => setSelectedWalletTank(index)}
                      >
                        {receiverTank && receiverTank.bank_info
                          ? receiverTank.bank_info
                          : "error"}
                      </CustomItem>
                    );
                  }
                })}
              </CustomDropdown>
              {receiverTanks &&
                receiverTanks[selectedWalletTank] &&
                receiverTanks[selectedWalletTank].bank_info && (
                  <div className="absolute right-2.5 top-2.5 z-10">
                    <CopyText
                      text={receiverTanks[selectedWalletTank].bank_info}
                    />
                  </div>
                )}
            </div>
            {receiverTanks[selectedWalletTank] &&
              receiverTanks[selectedWalletTank].description &&
              lang[receiverTanks[selectedWalletTank].description] && (
                <span
                  class={`bg-dark-back rounded-md px-3 pt-2.5 pb-1.5 text-gray font-${font}-regular`}
                >
                  {lang[receiverTanks[selectedWalletTank].description] + "."}
                </span>
              )}
            <CustomUploader setImage={setDocument} />
            {receiverTanks[selectedWalletTank] &&
              receiverTanks[selectedWalletTank].bank_info_image && (
                <img
                  className="mx-auto w-5/12 object-contain rounded-xl"
                  src={receiverTanks[selectedWalletTank].bank_info_image}
                />
              )}
          </div>
        )}

        <div className="my-1.5">
          <PendingRequestModalStatus
            status={data.status_title}
            rejectReason={
              data && data.reject_description ? data.reject_description : ""
            }
          />
        </div>
        {data && data.status_title === "Upload Document" && (
          <SubmitButton
            disabled={
              !(
                data &&
                data.url &&
                document &&
                receiverTanks[selectedWalletTank]
              )
            }
            onClick={() => {
              if (
                data &&
                data.url &&
                document &&
                receiverTanks[selectedWalletTank]
              ) {
                uploadRequestDocument(
                  data.url,
                  {
                    document,
                    wallet_tank_receiver: receiverTanks[selectedWalletTank].url,
                    status: statuses
                      ? statuses.find(
                          (status) => status.title === "Admin Approve"
                        ).url
                      : "",
                  },
                  () => {
                    refreshPendingRequests();
                    closeModal();
                  }
                );
              }
            }}
            className="w-full mt-5 mb-1.5 text-lg"
            rounded="lg"
          >
            {lang["submit"]}
          </SubmitButton>
        )}
      </div>
    </div>
  );
}
