import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import ArrowRight from "../../../../Images/arrow-right-light-thin.png";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useCurrencyPairsState } from "../../../../Providers/CurrencyPairsProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { CustomDropdown2, CustomItem2 } from "../../../common/CustomDropdown2";
import { useToastDataSetState } from "../../../../Providers/ToastDataProvider";
import {
  useAddComma,
  useRemoveComma,
  roundDown,
} from "../../../../hooks/useNumberFunctions";
import SubmitModal from "../../../modals/SubmitModal/SubmitModal";
import {
  useCalculateNotReverseRate,
  useCalculateReverseRate,
} from "../../../../hooks/useNumberFunctions";
import SubmitButton from "../../../common/SubmitButton";
import { useUserState } from "../../../../Providers/UserProvider";
import { useRefreshWallet } from "../../../../hooks/useRefreshWallet";
import { useModalDataSetState } from "../../../../Providers/ModalDataProvider";
import CompleteProfileModal from "../../../modals/CompleteProfileModal/CompleteProfileModal";
import Tutorial from "../../../modals/Tutorials/ExchangeTutorialModal/Tutorial";
import { useExchange } from "../../../../apis/pages/Home/hooks";
import LoginSignupModal from "../../../modals/LoginSignupModal";
import { useNavigate } from "react-router-dom";
import { useStatusesState } from "../../../../Providers/StatusesProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
const ExchangingSmallScreen = ({
  selectedCurrecnyPair,
  setSelectedCurrencnyPair,
  rateIsReversed,
  setRateIsReversed,
  refreshPendingExchange,
  formDefaultAmount,
  setFormDefaultAmount,
  formDefaultRate,
  setFormDefaultRate,
  selectedSourceIndex,
  setSelectedSourceIndex,
  availableTargets,
  selectedTargetIndex,
  setAvailableTargets,
  setSelectedTargetIndex,
  selectedCurrecnyWalletData,
  findCurrencyBalanceInWallet,
  amountInputRef,
  rateInputRef,
  focusOnInput,
  isDemo,
  setSource,
  setTarget,
}) => {
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const currencies = useCurrenciesState();
  const wallet = useWalletState();
  const all_statuses = useStatusesState();
  console.log(all_statuses);
  const userInfo = useUserState();
  const addComma = useAddComma();
  const calculateReverseRate = useCalculateReverseRate();
  const calculateNotReverseRate = useCalculateNotReverseRate();
  const removeComma = useRemoveComma();
  const setModalData = useModalDataSetState();
  const refreshWallet = useRefreshWallet();
  const currencyPairs = useCurrencyPairsState();
  const lang = useLanguageState();
  const walletBalance = selectedCurrecnyWalletData;
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const [submitButtonFunction, setSubmitButtonFunction] = useState("submit");
  const [errorMessage, setErrorMessage] = useState("");
  const [tip, setTip] = useState();
  const [hasError, setHasError] = useState(true);
  const navigate = useNavigate();

  const { exchange, isLoading: exchangeIsLoading } = useExchange();
  useEffect(
    () => setIsLoadingSplashScreen(exchangeIsLoading),
    [exchangeIsLoading]
  );

  useEffect(() => {
    if (errorMessage) setHasError(true);
    else setHasError(false);
  }, [errorMessage]);

  const [sourceLabel, setSourceLabel] = useState(lang["source"]);
  useEffect(() => {
    selectedSourceIndex >= 0 && currencies[selectedSourceIndex]
      ? setSourceLabel(currencies[selectedSourceIndex].abbreviation)
      : setSourceLabel(lang["source"]);
  }, [selectedSourceIndex]);
  const [targetLabel, setTargetLabel] = useState(lang["target"]);
  useEffect(() => {
    selectedTargetIndex >= 0 && availableTargets[selectedTargetIndex]
      ? setTargetLabel(availableTargets[selectedTargetIndex].abbreviation)
      : setTargetLabel(lang["target"]);
  }, [selectedTargetIndex]);

  const setToastData = useToastDataSetState();
  const openCompleteProfileMessageToast = () => {
    setToastData({
      status: "failed",
      message: lang["complete-profile-toast-message"] + ".",
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };

  const openCompleteProfileModal = () => {
    setModalData({
      title: "",
      children: <CompleteProfileModal />,
      canClose: false,
      isOpen: true,
    });
  };
  const openSubmitModal = (values, exchange) => {
    setModalData({
      title: lang["submit"],
      children: <SubmitModal data={values} exchange={exchange} />,
      canClose: true,
      isOpen: true,
    });
  };
  const OpenLoginSignupModal = () => {
    setModalData({
      title: lang["login-signup-modal-title"],
      children: <LoginSignupModal />,
      canClose: true,
      isOpen: true,
    });
  };
  const formikRef = useRef();
  useEffect(() => {
    !selectedCurrecnyPair && formikRef.current.resetForm();
  }, [selectedCurrecnyPair]);

  useEffect(() => {
    if (selectedCurrecnyPair) {
      const currentRate = formikRef.current.values.rate;
      const reversedRate = calculateReverseRate(
        removeComma(currentRate),
        +selectedCurrecnyPair.rate_multiplier,
        +selectedCurrecnyPair.floating_number
      );
      currentRate &&
        reversedRate &&
        formikRef.current.setFieldValue("rate", reversedRate);
    }
  }, [rateIsReversed]);

  useEffect(() => {
    formDefaultAmount &&
      formikRef.current.setFieldValue("amount", formDefaultAmount);
  }, [formDefaultRate]);
  useEffect(() => {
    formDefaultRate && formikRef.current.setFieldValue("rate", formDefaultRate);
  }, [formDefaultRate]);

  const computingTargetAmount = (amount, rate, multi) => {
    if (
      selectedCurrecnyPair &&
      selectedSourceIndex >= 0 &&
      selectedTargetIndex >= 0
    ) {
      const newAmount =
        +selectedCurrecnyPair.fee_percentage === 0 ||
        (userInfo && userInfo.free_exchange)
          ? amount
          : amount * ((100 - +selectedCurrecnyPair.fee_percentage) / 100);
      if (
        selectedCurrecnyPair.default_numerator ===
        currencies[selectedSourceIndex].url
      ) {
        if (!rateIsReversed) {
          return (newAmount * rate) / multi;
        } else {
          return (
            (newAmount *
              +calculateReverseRate(
                +rate,
                +selectedCurrecnyPair.rate_multiplier,
                +selectedCurrecnyPair.floating_number
              )) /
            multi
          );
        }
      } else {
        if (!rateIsReversed) {
          return (newAmount * multi) / rate;
        } else {
          return (
            (newAmount * multi) /
            +calculateReverseRate(
              +rate,
              +selectedCurrecnyPair.rate_multiplier,
              +selectedCurrecnyPair.floating_number
            )
          );
        }
      }
    }
  };

  const findError = (amount, rate) => {
    if (selectedCurrecnyPair && +amount !== 0 && +rate !== 0) {
      const min_amount =
        selectedCurrecnyPair.min_limit_amount_lot *
        currencies[selectedSourceIndex].lot;
      const max_amount =
        selectedCurrecnyPair.max_limit_amount_lot *
        currencies[selectedSourceIndex].lot;

      let min_rate = roundDown(
        selectedCurrecnyPair.rate +
          +selectedCurrecnyPair.rate_lot_user *
            +selectedCurrecnyPair.min_limit_rate_lot_user,
        selectedCurrecnyPair.floating_number
      );
      let max_rate = roundDown(
        selectedCurrecnyPair.rate +
          +selectedCurrecnyPair.rate_lot_user *
            +selectedCurrecnyPair.max_limit_rate_lot_user,
        selectedCurrecnyPair.floating_number
      );
      if (rateIsReversed) {
        let temp = min_rate;
        min_rate = roundDown(
          (1 / max_rate) * selectedCurrecnyPair.rate_multiplier,
          selectedCurrecnyPair.floating_number
        );
        max_rate = roundDown(
          (1 / temp) * selectedCurrecnyPair.rate_multiplier,
          selectedCurrecnyPair.floating_number
        );
      }

      if (+walletBalance < amount) {
        setSubmitButtonFunction("deposit");
        setErrorMessage(lang["not-enough-balance-error"] + ".");
        return false;
      } else if (amount < min_amount) {
        setErrorMessage(
          lang["low-amount-error"] + " " + addComma(min_amount) + "."
        );
        return false;
      } else if ((max_amount !== 0) & (amount > max_amount)) {
        setErrorMessage(
          lang["high-amount-error"] + " " + addComma(max_amount) + "."
        );
        return false;
      } else if (min_rate > rate || max_rate < rate) {
        setErrorMessage(
          lang["not-in-range-rate-error-1st"] +
            " " +
            addComma(min_rate) +
            " " +
            lang["not-in-range-rate-error-&"] +
            " " +
            addComma(max_rate) +
            (lang["not-in-range-rate-error-2nd"] === ""
              ? "."
              : " " + lang["not-in-range-rate-error-2nd"] + ".")
        );
        return false;
      } else {
        setSubmitButtonFunction("submit");
        setErrorMessage(null);
        return true;
      }
    }
  };

  return (
    <div
      className={` flex-1 w-full h-full bg-${theme}-back rounded-2xl font-${font}-regular`}
    >
      <div className="text-light w-full h-fit rounded-t-2xl bg-[linear-gradient(105deg,#E42F08_0%,#E42F08_50%,#0B9B08_50%,#0B9B08_100%)] flex flex-row justify-center items-center">
        <span className="w-2/5 font-bold flex justify-end items-center">
          {selectedCurrecnyPair
            ? selectedCurrecnyPair.currency_source_abb
            : lang["source"]}
        </span>
        <div className="w-1/5 flex justify-center items-center">
          <img src={ArrowRight} alt="" className="w-7 h-5" />
        </div>
        <span className="w-2/5 font-bold flex justify-start items-center">
          {selectedCurrecnyPair
            ? selectedCurrecnyPair.currency_destination_abb
            : lang["target"]}
        </span>
      </div>
      <div className="flex-1 w-full h-full ">
        <Formik
          innerRef={formikRef}
          initialValues={{
            amount: "",
            rate: "",
          }}
          onSubmit={(values, { resetForm }) => {
            if (userInfo && userInfo.is_verified) {
              const newAmount =
                +selectedCurrecnyPair.fee_percentage === 0
                  ? +removeComma(values.amount)
                  : +removeComma(values.amount) *
                    ((100 - +selectedCurrecnyPair.fee_percentage) / 100);

              const selectedRate = rateIsReversed
                ? calculateNotReverseRate(
                    +removeComma(values.rate),
                    +selectedCurrecnyPair.rate_multiplier,
                    +selectedCurrecnyPair.floating_number
                  )
                : +removeComma(values.rate);
              if (findError(newAmount, +removeComma(values.rate))) {
                const params = {
                  user: userInfo && userInfo.url ? userInfo.url : "",
                  currency_pair:
                    selectedCurrecnyPair && selectedCurrecnyPair.url
                      ? selectedCurrecnyPair.url
                      : "",
                  amount_source: +removeComma(values.amount),
                  rate: +selectedRate,
                  amount_destination:
                    selectedCurrecnyPair &&
                    selectedCurrecnyPair.rate_multiplier &&
                    availableTargets[selectedTargetIndex]
                      ? roundDown(
                          +computingTargetAmount(
                            +removeComma(values.amount),
                            +removeComma(values.rate),
                            selectedCurrecnyPair.rate_multiplier
                          ),
                          availableTargets[selectedTargetIndex].floating_number
                        )
                      : 0,
                  status:
                    all_statuses.find((status) => status.slug === "pending")
                      .url || "",
                };
                openSubmitModal(params, (customFunction) => {
                  exchange(params, () => {
                    customFunction && customFunction();
                    resetForm({
                      values: {
                        amount: "",
                        rate: "",
                      },
                    });
                    refreshWallet(null, {
                      asset: (data) => findCurrencyBalanceInWallet(data),
                    });
                    refreshPendingExchange();
                  });
                });
              }
            } else {
              openCompleteProfileMessageToast();
              openCompleteProfileModal();
            }
          }}
        >
          {({
            handleBlur,
            handleChange,
            values,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <form
                className={`w-full h-full grid grid-cols-3 gird-rows-2 p-3 pb-5 rounded-b-2xl gap-x-3 gap-y-2`}
              >
                <div className="col-span-1 row-span-1">
                  <span
                    className={`font-${font}-regular text-${oppositeTheme}`}
                  >
                    {lang["from"]}
                  </span>
                  <CustomDropdown2
                    className={`flex-1 font-${font}-regular`}
                    label={
                      <div className="">
                        {selectedSourceIndex >= 0 ? (
                          <img
                            alt=""
                            src={currencies[selectedSourceIndex].sym_pic_gray}
                          />
                        ) : (
                          ""
                        )}
                        <span>{sourceLabel}</span>
                      </div>
                    }
                  >
                    {currencies.map((currency, index) => {
                      if (currency && currency.abbreviation) {
                        if (index == 0) {
                          return (
                            <CustomItem2
                              key={index}
                              onClick={() => setSelectedSourceIndex(index)}
                              className={"rounded-t-xl"}
                            >
                              <div className="flex flex-row">
                                <img src={currency.sym_pic_gray} />
                                <span>{currency.abbreviation}</span>
                              </div>
                            </CustomItem2>
                          );
                        } else if (index === currencies.length - 1) {
                          return (
                            <CustomItem2
                              key={index}
                              onClick={() => setSelectedSourceIndex(index)}
                              className={"rounded-b-xl"}
                            >
                              <div className="flex flex-row">
                                <img src={currency.sym_pic_gray} />
                                <span>{currency.abbreviation}</span>
                              </div>
                            </CustomItem2>
                          );
                        } else {
                          return (
                            <CustomItem2
                              key={index}
                              onClick={() => setSelectedSourceIndex(index)}
                            >
                              <div className="flex flex-row">
                                <img src={currency.sym_pic_gray} />
                                <span>{currency.abbreviation}</span>
                              </div>
                            </CustomItem2>
                          );
                        }
                      } else {
                        return "";
                      }
                    })}
                  </CustomDropdown2>
                </div>

                <div className="col-span-1 row-span-1">
                  <span
                    className={`font-${font}-regular text-${oppositeTheme} `}
                  >
                    {lang["to"]}
                  </span>
                  <CustomDropdown2
                    className={`flex-1 font-${font}-regular`}
                    label={
                      <div>
                        {selectedTargetIndex >= 0 ? (
                          <img
                            alt=""
                            src={currencies[selectedTargetIndex].sym_pic_gray}
                          />
                        ) : (
                          ""
                        )}
                        <span>{targetLabel}</span>
                      </div>
                    }
                  >
                    {availableTargets.map((currency, index) => {
                      if (currency && currency.abbreviation) {
                        if (index === 0) {
                          return (
                            <CustomItem2
                              key={index}
                              onClick={() => setSelectedTargetIndex(index)}
                            >
                              <div className="flex flex-row">
                                <img src={currency.sym_pic_gray} />
                                <span>{currency.abbreviation}</span>
                              </div>
                            </CustomItem2>
                          );
                        } else if (index === currencies.length - 1) {
                          return (
                            <CustomItem2
                              key={index}
                              onClick={() => setSelectedTargetIndex(index)}
                            >
                              <div className="flex flex-row">
                                <img src={currency.sym_pic_gray} />
                                <span>{currency.abbreviation}</span>
                              </div>
                            </CustomItem2>
                          );
                        } else {
                          return (
                            <CustomItem2
                              key={index}
                              onClick={() => setSelectedTargetIndex(index)}
                            >
                              <div className="flex flex-row">
                                <img src={currency.sym_pic_gray} />
                                <span>{currency.abbreviation}</span>
                              </div>
                            </CustomItem2>
                          );
                        }
                      } else {
                        return "";
                      }
                    })}
                  </CustomDropdown2>
                </div>

                <div className="col-span-1 row-span-1 flex flex-col">
                  <span className={`w-full h-fit text-${oppositeTheme}`}>
                    {lang["amount"]}
                  </span>
                  <div className="flex-1">
                    <input
                      amountInputRef={amountInputRef}
                      className={`w-full h-[2.35rem] ${
                        values.amount || +walletBalance === 0
                          ? "text-center"
                          : "text-left"
                      } hide-input-arrows bg-${theme} text-${oppositeTheme} px-3 outline-1 outline-white rounded-lg  pt-2 pb-1`}
                      placeholder={lang["amount"]}
                      disabled={
                        selectedSourceIndex < 0 || selectedTargetIndex < 0
                      }
                      name="amount"
                      onFocus={() => {
                        const min_amount =
                          selectedCurrecnyPair.min_limit_amount_lot *
                          currencies[selectedSourceIndex].lot;
                        const max_amount =
                          selectedCurrecnyPair.max_limit_amount_lot *
                          currencies[selectedSourceIndex].lot;
                        !values.amount &&
                          !errorMessage &&
                          setTip(
                            lang["between"] +
                              " " +
                              addComma(min_amount) +
                              " " +
                              lang["and"] +
                              " " +
                              addComma(max_amount)
                          );
                      }}
                      onBlur={(e) => {
                        setTip("");
                        handleBlur(e);
                        if (!isDemo) {
                          findError(
                            removeComma(e.target.value),
                            removeComma(values.rate)
                          );
                        }
                      }}
                      onChange={(e) => {
                        (errorMessage || (e.target.value && values.rate)) &&
                          setTip("");
                        handleChange(e);
                        formDefaultAmount && setFormDefaultAmount(null);
                        if (!isDemo) {
                          findError(
                            removeComma(e.target.value),
                            removeComma(values.rate)
                          );
                        }
                      }}
                      value={addComma(values.amount, false)}
                    />
                  </div>
                  {(values.amount === 0 || values.amount === "") &&
                    selectedSourceIndex >= 0 &&
                    selectedTargetIndex >= 0 &&
                    +walletBalance !== 0 && (
                      <button
                        type="button"
                        className={`absolute top-2 right-3 hidden md:flex`}
                        onClick={() => {
                          if (+walletBalance !== 0) {
                            setFieldValue(
                              "amount",
                              addComma(+walletBalance, true)
                            );
                          } else {
                            findError();
                          }
                        }}
                      >
                        <span
                          className={`text-gray font-${font}-regular text-sm`}
                        >
                          {lang["amount-input-max-button-label"]}
                        </span>
                      </button>
                    )}
                </div>
                <div className="col-span-1 row-span-1 flex flex-col">
                  <span className={`w-full h-fit text-${oppositeTheme}`}>
                    {lang["rate"]}
                  </span>
                  <div className="flex-1">
                    <input
                      ref={rateInputRef}
                      className={`w-full h-[2.35rem] text-center hide-input-arrows bg-${theme} text-${oppositeTheme} px-3 outline-1  outline-white rounded-lg  pt-2 pb-1`}
                      placeholder={lang["rate"]}
                      disabled={
                        selectedSourceIndex < 0 || selectedTargetIndex < 0
                      }
                      name="rate"
                      onFocus={() => {
                        let min_rate = roundDown(
                          selectedCurrecnyPair.rate +
                            +selectedCurrecnyPair.rate_lot_user *
                              +selectedCurrecnyPair.min_limit_rate_lot_user,
                          selectedCurrecnyPair.floating_number
                        );
                        let max_rate = roundDown(
                          selectedCurrecnyPair.rate +
                            +selectedCurrecnyPair.rate_lot_user *
                              +selectedCurrecnyPair.max_limit_rate_lot_user,
                          selectedCurrecnyPair.floating_number
                        );
                        if (rateIsReversed) {
                          let temp = min_rate;
                          min_rate = roundDown(
                            (1 / max_rate) *
                              selectedCurrecnyPair.rate_multiplier,
                            selectedCurrecnyPair.floating_number
                          );
                          max_rate = roundDown(
                            (1 / temp) * selectedCurrecnyPair.rate_multiplier,
                            selectedCurrecnyPair.floating_number
                          );
                        }
                        !values.rate &&
                          !errorMessage &&
                          setTip(
                            lang["between"] +
                              " " +
                              addComma(min_rate) +
                              " " +
                              lang["and"] +
                              " " +
                              addComma(max_rate)
                          );
                      }}
                      onBlur={(e) => {
                        setTip("");
                        handleBlur(e);
                        if (!isDemo) {
                          findError(
                            removeComma(values.amount),
                            removeComma(e.target.value)
                          );
                        }
                      }}
                      onChange={(e) => {
                        (errorMessage || (values.amount && e.target.value)) &&
                          setTip("");
                        handleChange(e);
                        formDefaultRate && setFormDefaultRate(null);
                        if (!isDemo) {
                          findError(
                            removeComma(values.amount),
                            removeComma(e.target.value)
                          );
                        }
                      }}
                      value={addComma(values.rate, true)}
                    />
                    {tip &&
                      !(
                        values.amount &&
                        removeComma(values.amount) !== 0 &&
                        selectedCurrecnyPair &&
                        values.rate &&
                        removeComma(values.rate) !== 0
                      ) && (
                        <div className="-mb-7 mt-0.5">
                          <div className="-mt-0.5">
                            <span
                              className={`text-${oppositeTheme} font-${font}-regular`}
                            >
                              {tip}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                {values.amount &&
                  removeComma(values.amount) !== 0 &&
                  selectedCurrecnyPair &&
                  values.rate &&
                  removeComma(values.rate) !== 0 && (
                    <div className="mt-1 flex items-center">
                      {errorMessage && errorMessage !== "" ? (
                        <span
                          className={`text-red font-${font}-regular mt-0.5 text-sm`}
                        >
                          {errorMessage}
                        </span>
                      ) : (
                        <div className="w-full flex flex-col px-5 max-w-36 text-nowrap overflow-x-scroll overflow-y-hidden items-center justify-between">
                          <div className="flex items-center gap-x-1">
                            <img
                              className="w-5 h-5"
                              src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
                            />
                            <span
                              className={`text-${oppositeTheme} font-${font}-regular mt-0.5 text`}
                            >
                              {addComma(
                                roundDown(
                                  computingTargetAmount(
                                    removeComma(values.amount),
                                    removeComma(values.rate),
                                    selectedCurrecnyPair.rate_multiplier
                                  ),
                                  availableTargets[selectedTargetIndex]
                                    .floating_number
                                )
                              ) +
                                " " +
                                (availableTargets[selectedTargetIndex]
                                  ? availableTargets[selectedTargetIndex]
                                      .abbreviation
                                  : "")}
                            </span>
                          </div>
                          <span
                            className={`text-${oppositeTheme} font-${font}-regular -mb-0.5`}
                          >
                            {+selectedCurrecnyPair.fee_percentage
                              ? "-" +
                                addComma(
                                  (+removeComma(values.amount) *
                                    +selectedCurrecnyPair.fee_percentage) /
                                    100
                                ) +
                                " " +
                                currencies[selectedSourceIndex].abbreviation +
                                " " +
                                lang["fee"]
                              : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                {submitButtonFunction === "submit" ? (
                  <button
                    type={isDemo ? "button" : "submit"}
                    onClick={isDemo ? OpenLoginSignupModal : handleSubmit}
                    className={
                      values.amount &&
                      removeComma(values.amount) !== 0 &&
                      values.rate &&
                      removeComma(values.rate) !== 0
                        ? "flex justify-center mt-5 items-center w-full h-fit py-2 bg-green rounded-lg text-light"
                        : "flex justify-center mt-6 items-center w-full h-fit py-1.5 bg-green rounded-lg text-light"
                    }
                  >
                    {lang["submit"]}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/wallet", {
                        state: {
                          selectedCurrency: currencies[selectedSourceIndex],
                        },
                      })
                    }
                    className={
                      values.amount &&
                      removeComma(values.amount) !== 0 &&
                      values.rate &&
                      removeComma(values.rate) !== 0
                        ? `flex justify-center mt-0.5 items-center w-full pt-2 pb-1 rounded-lg bg-green font-${font}-bold text-light`
                        : `flex justify-center mt-7 items-center w-full pt-2 pb-1 rounded-lg bg-green font-${font}-bold text-light`
                    }
                  >
                    {lang["deposit"]}
                  </button>
                )}
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ExchangingSmallScreen;
