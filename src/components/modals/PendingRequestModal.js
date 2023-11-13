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

export default function PendingRequestModal({ refreshPendingRequests, data }) {
  const lang = useLanguageState();
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

  console.log(data && data.document !== null && hasPreviewImage());

  return (
    <div className="flex flex-col">
      {data && data.type === "deposit" && (
        <span className="font-mine-regular text-green">{lang["deposit"]}</span>
      )}
      {data && data.type === "withdrawal" && (
        <span className="font-mine-regular text-red">{lang["withdrawal"]}</span>
      )}
      {data && data.type === "transfer" && (
        <span className="font-mine-regular text-blue">{lang["transfer"]}</span>
      )}
      <span className={`font-mine-regular text-xl text-${oppositeTheme}`}>
        {addComma(+data.amount) + " " + data.currency_abb}
      </span>
      <div className="w-72 mt-3">
        {data && data.status_title && data.document && hasPreviewImage() && (
          <CustomPreviewer2 imageUrl={data.document} />
        )}
        {data && data.status_title === "Upload Document" && (
          <CustomUploader setImage={setDocument} />
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
