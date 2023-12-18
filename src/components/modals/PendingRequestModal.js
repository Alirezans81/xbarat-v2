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
          currency: data.currency_slug,
        },
        setReceiverTanks
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

  return (
    <div className="flex flex-col">
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
      <div className="w-72 mt-3">
        {data && data.status_title && data.document && hasPreviewImage() && (
          <CustomPreviewer2 imageUrl={data.document} />
        )}
        {data && data.status_title === "Upload Document" && (
          <div className="flex flex-col gap-y-2 mb-5">
            <span
              className={`text-${oppositeTheme} text-xl font-${font}-regular`}
            >
              {data && data.user_receiver_full_name
                ? data.user_receiver_full_name
                : ""}
            </span>
            <div className="w-full flex">
              <CustomDropdown
                label={
                  selectedWalletTank >= 0 &&
                  receiverTanks[selectedWalletTank] &&
                  receiverTanks[selectedWalletTank].bank_info
                    ? receiverTanks[selectedWalletTank].bank_info
                    : lang["card-number"]
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
            </div>
            <CustomUploader setImage={setDocument} />
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
            onClick={() => {
              if (data && data.url && document) {
                uploadRequestDocument(
                  data.url,
                  {
                    document,
                    wallet_tank_receiver: receiverTanks[selectedWalletTank]
                      ? receiverTanks[selectedWalletTank].url
                      : "",
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
