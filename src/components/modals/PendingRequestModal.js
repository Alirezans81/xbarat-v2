/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
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
import DirectionSetter from "../../functions/DirectionSetter";
import { CustomDropdown, CustomItem } from "../common/CustomDropdown";
import { combineImagesWithGrid } from "../../functions/combineImages";
import Stepper from "./PendingRequestModal/Stepper";
import CopyText from "../common/CopyText";
import { useDepositBackToAdminAssign } from "../../apis/pages/Wallet/hooks";
export default function PendingRequestModal({ refreshPendingRequests, data }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();
  const setLoading = useIsLoadingSplashScreenSetState();
  const statuses = useStatusesState();
  const closeModal = useModalDataClose();
  const dir = DirectionSetter(font);
  const [transaction, setTransaction] = useState(data);
  const [document, setDocument] = useState();
  const [singleImage, setSingleImage] = useState([]);

  const layouts = {
    1: [{ row: 0, col: 0, rowSpan: 2, colSpan: 2 }],
    2: [
      { row: 0, col: 0, rowSpan: 2, colSpan: 1 },
      { row: 0, col: 1, rowSpan: 2, colSpan: 1 },
    ],
    3: [
      { row: 0, col: 0, rowSpan: 2, colSpan: 1 },
      { row: 0, col: 1, rowSpan: 2, colSpan: 1 },
      { row: 2, col: 0, rowSpan: 1, colSpan: 2 },
    ],
    4: [
      { row: 0, col: 0, rowSpan: 1, colSpan: 1 },
      { row: 0, col: 1, rowSpan: 1, colSpan: 1 },
      { row: 1, col: 0, rowSpan: 1, colSpan: 1 },
      { row: 1, col: 1, rowSpan: 1, colSpan: 1 },
    ],
  };
  function generateDefaultLayout(count) {
    const layout = [];
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      layout.push({ row, col, rowSpan: 1, colSpan: 1 });
    }
    return layout;
  }
  const handleLayoutDocument = async () => {
    const count = singleImage.length;
    const layout = layouts[count] || generateDefaultLayout(count);
    setLoading(true);
    const blob = await combineImagesWithGrid(singleImage, layout);
    setDocument(blob);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
  }, [document]);

  const {
    depositBackToAdminAssign,
    isLoading: depositBackToAdminAssignIsLoading,
  } = useDepositBackToAdminAssign();
  useEffect(() => {
    setLoading(depositBackToAdminAssignIsLoading);
  }, [depositBackToAdminAssignIsLoading]);

  const { uploadRequestDocument, isLoading: uploadRequestDocumentIsLoading } =
    useUploadRequestDocument();
  useEffect(
    () => setLoading(uploadRequestDocumentIsLoading),
    [uploadRequestDocumentIsLoading]
  );
  const [matchUsers, setMatchUsers] = useState([]);
  const method = transaction.method;

  let timeout;
  const tempTimeOut = 1440;

  if (method === "user") {
    timeout = new Date(transaction.datetime_assign);
    timeout.setMinutes(
      timeout.getMinutes() +
        (transaction.assign_exp_window
          ? transaction.assign_exp_window
          : tempTimeOut)
    );
  }
  const [timeTillClose, setTimeTillClose] = useState();

  const hasTriggeredRef = useRef(false);

  const countdownInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = timeout - now;

    if (timeLeft <= 0 && !hasTriggeredRef.current) {
      clearInterval(countdownInterval);
      returnToAdminAssign();
    } else {
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeLeft - hours * 60 * 60 * 1000) / (1000 * 60)
      );
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setTimeTillClose([hours, minutes, seconds]);
    }
  }, 1000);

  function returnToAdminAssign() {
    if (
      transaction.status_title === "Upload Document" &&
      transaction.type === "deposit" &&
      !hasTriggeredRef.current &&
      !uploadRequestDocumentIsLoading
    ) {
      depositBackToAdminAssign(transaction.url, setTransaction);
      hasTriggeredRef.current = true;
    }
  }
  const temporaryRecieverAddress = transaction.temporary_receiver_address;
  const [receiverTanks, setReceiverTanks] = useState([]);
  const [selectedWalletTank, setSelectedWalletTank] = useState(-1);
  const { getWalletTanks, isLoading: getWalletTanksIsLoading } =
    useGetWalletTanks();
  useEffect(
    () => setLoading(getWalletTanksIsLoading),
    [getWalletTanksIsLoading]
  );

  useEffect(() => {
    if (
      transaction &&
      transaction.user_receiver_username &&
      transaction.currency_slug
    ) {
      getWalletTanks(
        {
          user: transaction.user_receiver_username,
          currency: transaction.currency_slug,
        },
        (walletTanks) => {
          if (method === "user") {
            const temp = temporaryRecieverAddress.split(",").map((entry) => {
              const [bank_info, amount, account_name, bank_name] =
                entry.split(":");
              return {
                bank_info,
                amount: Number(amount),
                account_name,
                bank_name,
              };
            });
            setMatchUsers(temp);
          }
          if (transaction.currency_abb === "IRR") {
            if (+transaction.amount <= 100000000) {
              const temp = walletTanks.filter(
                (d) =>
                  d.is_active &&
                  d.bank_info &&
                  d.wallet_tank_type_title === "Card Number"
              );
              setReceiverTanks(temp);
            } else {
              const temp = walletTanks.filter(
                (d) =>
                  d.is_active &&
                  d.bank_info &&
                  d.wallet_tank_type_title === "Shaba Number"
              );
              setReceiverTanks(temp);
            }
          } else {
            const temp = walletTanks.filter((d) => d.is_active && d.bank_info);
            setReceiverTanks(temp);
          }
        }
      );
    }
  }, []);

  const hasPreviewImage = () => {
    if (
      transaction.status_title === "Admin Approve" ||
      transaction.status_title === "Accept" ||
      transaction.status_title === "Reject"
    ) {
      return true;
    }
    return false;
  };

  const findStep = () => {
    const type = transaction && transaction.type ? transaction.type : "";
    const status =
      transaction && transaction.status_title ? transaction.status_title : "";

    if (transaction) {
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

  useEffect(() => {
    if (singleImage.length === temporaryRecieverAddress.split(",").length) {
      handleLayoutDocument();
    }
  }, [singleImage]);
  return (
    <div
      className={`flex flex-col ${
        transaction.type === "deposit" &&
        transaction.status_title === "Upload Document"
          ? `w-full ${method === "user" ? "md:w-[35rem]" : "md:w-[20rem]"}`
          : "w-80"
      }`}
    >
      <div className="w-full mb-1">
        <Stepper
          type={transaction && transaction.type ? transaction.type : ""}
          step={findStep()}
        />
      </div>
      {transaction && transaction.type === "deposit" && (
        <span
          className={`w-full flex ${
            dir === "rtl" ? "justify-end" : "justify-start"
          } font-${font}-regular text-green`}
        >
          {lang["deposit"]}
        </span>
      )}
      {transaction && transaction.type === "withdrawal" && (
        <span className={`font-${font}-regular text-red`}>
          {lang["withdrawal"]}
        </span>
      )}
      {transaction && transaction.type === "transfer" && (
        <span className={`font-${font}-regular text-blue`}>
          {lang["transfer"]}
        </span>
      )}
      <span
        className={`w-full flex font-${font}-regular text-xl text-${oppositeTheme} ${
          dir === "rtl" ? "justify-end" : "justify-start"
        }`}
      >
        {addComma(+transaction.amount) + " " + transaction.currency_abb}
      </span>
      <div
        className={`${
          transaction.type === "deposit" &&
          transaction.status_title === "Upload Document"
            ? "w-full"
            : "w-80"
        } mt-3`}
      >
        {transaction &&
          transaction.status_title &&
          transaction.document &&
          hasPreviewImage() && (
            <CustomPreviewer2 imageUrl={transaction.document} />
          )}
        {transaction && transaction.status_title === "Upload Document" && (
          <div className="flex flex-col gap-y-2 mb-5">
            <span
              className={
                method === "xbarat"
                  ? `text-yellow text-xl font-${font}-regular text-center`
                  : "hidden"
              }
            >
              {receiverTanks &&
              receiverTanks[selectedWalletTank] &&
              receiverTanks[selectedWalletTank].wallet_tank_account_name
                ? receiverTanks[selectedWalletTank].wallet_tank_account_name
                : ""}
            </span>
            <div
              dir={dir}
              className={`flex flex-col bg-${theme}-back rounded-md py-2.5 px-3 font-${font}-regular text-${oppositeTheme}`}
            >
              <div
                dir={dir}
                className="w-full flex justify-between pb-3 border-b border-gray"
              >
                <span className="-mb-1">
                  {lang["deposit-secret-code"] + ":"}
                </span>
                <div className="flex items-center gap-x-1">
                  <span className="-mb-1">{transaction.secret_code}</span>
                  <CopyText text={transaction.secret_code} />
                </div>
              </div>
              <span
                dir={dir}
                className={`w-full text-start pt-2  ${
                  dir === "rtl" ? "pb-2.5" : "-mb-1"
                }`}
              >
                {lang["deposit-secret-code-message"]}
                <span>.</span>
              </span>
            </div>
            <div
              className={
                method === "xbarat" ? "w-full flex relative" : "hidden"
              }
            >
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
                  receiverTanks[selectedWalletTank].bank_info &&
                  receiverTanks[selectedWalletTank].currency_abb === "USDT"
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
            <div
              className={
                method === "xbarat"
                  ? "hidden"
                  : `w-fit h-fit flex flex-col md:flex-row p-2 gap-x-3 bg-${theme}-back rounded-2xl`
              }
            >
              <div
                className={`flex flex-col bg-${theme} w-full md:w-60 h-full rounded-2xl p-2 gap-y-3`}
              >
                <span
                  dir={dir}
                  className={`w-full h-fit flex justify-center text-yellow text-base font-${font}`}
                >
                  {lang["Time_Till_Matches_Valid"]}
                </span>
                <span
                  dir={dir}
                  className={`text-xs text-${oppositeTheme} bg-${theme}-back p-3 rounded-2xl`}
                >
                  {lang["Note_Time_Valid"]}
                </span>
                <div
                  dir={dir}
                  className={`w-full h-fit flex flex-col justify-center items-center text-${oppositeTheme} font-bold gap-x-1`}
                >
                  <span
                    className={`w-fit h-full flex justify-center items-center mt-1 font-${font} font-light`}
                  >
                    {lang["Time_Remaining"]}
                  </span>
                  <span
                    dir="ltr"
                    className={`w-fit h-full flex justify-center items-center text-${oppositeTheme} p-1 font-bold`}
                  >
                    {timeTillClose &&
                    timeTillClose[0] !== undefined &&
                    timeTillClose[1] !== undefined &&
                    timeTillClose[2] !== undefined &&
                    timeTillClose[0] >= 0 &&
                    timeTillClose[1] >= 0 &&
                    timeTillClose[2] >= 0
                      ? (timeTillClose[0] < 10
                          ? "0" + timeTillClose[0]
                          : timeTillClose[0]) +
                        " : " +
                        (timeTillClose[1] < 10
                          ? "0" + timeTillClose[1]
                          : timeTillClose[1]) +
                        " : " +
                        (timeTillClose[2] < 10
                          ? "0" + timeTillClose[2]
                          : timeTillClose[2])
                      : ""}
                  </span>
                </div>
              </div>
              <div
                className={`w-fit flex flex-col justify-start items-center bg-${theme}-back rounded-2xl md:p-3 mt-3 md:mt-0 gap-y-3 max-h-56 overflow-y-scroll`}
              >
                {matchUsers.map((tank, ind) => (
                  <div
                    key={ind}
                    className={`w-fit h-fit flex flex-col bg-${theme} rounded-xl font-${font}-regular text-${oppositeTheme} gap-y-3 py-5 px-8`}
                  >
                    <div className="flex flex-col">
                      <span className="w-full flex text-base text-yellow justify-center">
                        {lang["address"]}
                      </span>
                      <span className="w-full flex h-full justify-center">
                        {tank.bank_info}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="w-full flex text-base text-yellow justify-center">
                        {lang["amount"]}
                      </span>
                      <span className="w-full flex h-full justify-center">
                        {addComma(tank.amount) + " " + transaction.currency_abb}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="w-full flex text-base text-yellow justify-center">
                        {lang["Account_Name"]}
                      </span>
                      <span className="w-full flex h-full justify-center">
                        {tank.account_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="w-full flex text-base text-yellow justify-center">
                        {lang["Bank_Name"]}
                      </span>
                      <span className="w-full flex h-full justify-center">
                        {tank.bank_name}
                      </span>
                    </div>
                    <div className="w-52 flex justify-center">
                      <CustomUploader
                        Crop={false}
                        setImage={(img) =>
                          setSingleImage((prev) => [...prev, img])
                        }
                      />
                    </div>
                  </div>
                ))}
                {/* <button
                onClick={handleLayoutDocument}
                className={`bg-blue text-center font-${font}-regular rounded-2xl text-lg py-3 text-light w-full`}
              >
                Concat Reciepts
              </button> */}
              </div>
            </div>

            {method === "xbarat" &&
              receiverTanks[selectedWalletTank] &&
              receiverTanks[selectedWalletTank].description &&
              lang[receiverTanks[selectedWalletTank].description] && (
                <span
                  class={`bg-dark-back rounded-md px-3 pt-2.5 pb-1.5 text-gray font-${font}-regular`}
                >
                  {lang[receiverTanks[selectedWalletTank].description] + "."}
                </span>
              )}

            {method === "xbarat" && <CustomUploader setImage={setDocument} />}
            {method === "xbarat" &&
              receiverTanks[selectedWalletTank] &&
              receiverTanks[selectedWalletTank]
                .wallet_tank_bank_info_image_url && (
                <img
                  alt=""
                  className="mx-auto w-5/12 object-contain rounded-xl"
                  src={
                    receiverTanks[selectedWalletTank]
                      .wallet_tank_bank_info_image_url
                  }
                />
              )}
          </div>
        )}

        {transaction &&
          transaction.secret_code &&
          transaction.status_title === "Admin Approve" && (
            <div
              dir={font === "Fa" || font === "Ar" ? "rtl" : "ltr"}
              className={`flex flex-col bg-${theme}-back rounded-md py-2.5 px-3 font-${font}-regular text-${oppositeTheme} mt-1.5`}
            >
              <div
                className={`w-full flex justify-between ${
                  font === "Fa" || font === "Ar" ? "pb-2.5" : "pb-0.5"
                }`}
              >
                <span className="-mb-1">
                  {lang["deposit-secret-code"] + ":"}
                </span>
                <div className="flex items-center gap-x-1">
                  <span className="-mb-1">{transaction.secret_code}</span>
                  <CopyText text={transaction.secret_code} />
                </div>
              </div>
            </div>
          )}
        <div className="my-1.5">
          <PendingRequestModalStatus
            status={transaction.status_title}
            rejectReason={
              transaction && transaction.reject_description
                ? transaction.reject_description
                : ""
            }
          />
        </div>
        {transaction && transaction.status_title === "Upload Document" && (
          <SubmitButton
            disabled={
              !(transaction && transaction.url && document && method === "user"
                ? receiverTanks[0]
                : receiverTanks[selectedWalletTank])
            }
            onClick={() => {
              if (
                transaction && transaction.url && document && method === "user"
                  ? receiverTanks[0]
                  : receiverTanks[selectedWalletTank]
              ) {
                uploadRequestDocument(
                  transaction.url,
                  {
                    document,
                    wallet_tank_receiver:
                      method === "user"
                        ? receiverTanks[0].url
                        : receiverTanks[selectedWalletTank].url,
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
