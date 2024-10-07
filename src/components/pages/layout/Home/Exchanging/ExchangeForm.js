import { Formik } from "formik";
import SubmitModal from "../../../../modals/SubmitModal/SubmitModal";
import React, { useEffect, useRef, useState } from "react";
import { CustomDropdown, CustomItem } from "../../../../common/CustomDropdown";
import { useModalDataSetState } from "../../../../../Providers/ModalDataProvider";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import {
  roundDown,
  useAddComma,
  useCalculateNotReverseRate,
  useCalculateReverseRate,
  useRemoveComma,
} from "../../../../../hooks/useNumberFunctions";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";
import SubmitButton from "../../../../common/SubmitButton";
import { useUserState } from "../../../../../Providers/UserProvider";
import { useStatusesState } from "../../../../../Providers/StatusesProvider";
import { useExchange } from "../../../../../apis/pages/Home/hooks";
import { useFontState } from "../../../../../Providers/FontProvider";
import { useRefreshWallet } from "../../../../../hooks/useRefreshWallet";
import CompleteProfileModal from "../../../../modals/CompleteProfileModal";
import { useToastDataSetState } from "../../../../../Providers/ToastDataProvider";
import LoginSignupModal from "../../../../modals/LoginSignupModal";
import { useNavigate } from "react-router-dom";

export default function ExchangeForm({
  walletBalance,
  selectedCurrecnyPair,
  currencies,
  selectedSourceIndex,
  setSelectedSourceIndex,
  sourceLabel,
  availableTargets,
  selectedTargetIndex,
  setSelectedTargetIndex,
  rateIsReversed,
  targetLabel,
  formDefaultAmount,
  setFormDefaultAmount,
  formDefaultRate,
  setFormDefaultRate,
  refreshPendingExchange,
  findCurrencyBalanceInWallet,
  amountInputRef,
  rateInputRef,
  isDemo,
}) {
  const setModalData = useModalDataSetState();
  const userInfo = useUserState();
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();
  const refreshWallet = useRefreshWallet();

  const [hasError, setHasError] = useState(true);

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const user = useUserState();
  const statuses = useStatusesState();
  const addComma = useAddComma();
  const removeComma = useRemoveComma();
  const calculateReverseRate = useCalculateReverseRate();
  const calculateNotReverseRate = useCalculateNotReverseRate();
  const navigate = useNavigate();

  const { exchange, isLoading: exchangeIsLoading } = useExchange();
  useEffect(
    () => setIsLoadingSplashScreen(exchangeIsLoading),
    [exchangeIsLoading]
  );

  const [tip, setTip] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (errorMessage) setHasError(true);
    else setHasError(false);
  }, [errorMessage]);
  const [submitButtonFunction, setSubmitButtonFunction] = useState("submit");

  const [targetSlug, setTargetSlug] = useState();

  const findSource = (currency_slug) => {
    let result = -1;
    result = currencies.findIndex(
      (currency) => currency.slug === currency_slug
    );
    result >= 0 && setSelectedSourceIndex(result);
  };

  const openSubmitModal = (values, exchange) => {
    setModalData({
      title: lang["submit"],
      children: <SubmitModal data={values} exchange={exchange} />,
      canClose: true,
      isOpen: true,
    });
  };

  const findTarget = (currency_slug) => {
    let result = -1;
    result = availableTargets.findIndex(
      (currency) => currency.slug === currency_slug
    );
    result >= 0 && setSelectedTargetIndex(result);
  };

  useEffect(() => {
    if (availableTargets.length > 0 && targetSlug) {
      findTarget(targetSlug);
    }
  }, [availableTargets, targetSlug]);

  const switchSourceAndTarget = () => {
    const newTargetSlug = currencies[selectedSourceIndex].slug;
    setTargetSlug(newTargetSlug);
    findSource(availableTargets[selectedTargetIndex].slug);
  };

  const computingTargetAmount = (amount, rate, multi) => {
    if (
      selectedCurrecnyPair &&
      selectedSourceIndex >= 0 &&
      selectedTargetIndex >= 0
    ) {
      const newAmount =
        +selectedCurrecnyPair.fee_percentage === 0 ||
        (user && user.free_exchange)
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

  const OpenLoginSignupModal = () => {
    setModalData({
      title: lang["login-signup-modal-title"],
      children: <LoginSignupModal />,
      canClose: true,
      isOpen: true,
    });
  };

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

  return (
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
              user: user && user.url ? user.url : "",
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
                statuses.find((status) => status.title === "Pending").url || "",
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
      {({ handleBlur, handleChange, values, handleSubmit, setFieldValue }) => {
        return (
          <form className="mt-2 h-full">
            <div className="flex items-center gap-1">
              <CustomDropdown
                className={`flex-1 font-${font}-regular`}
                label={
                  <div className="flex">
                    {selectedSourceIndex >= 0 && (
                      <img
                        className={`w-7 h-7 -mt-1.5 -m${oneDirection}-1`}
                        src={
                          currencies[selectedSourceIndex]
                            ? currencies[selectedSourceIndex].sym_pic_gray
                            : ""
                        }
                      />
                    )}
                    <span className={`-m${oneDirection}-0.5`}>
                      {sourceLabel}
                    </span>
                  </div>
                }
                searchable
              >
                {currencies.map((currency, index) => {
                  if (currency && currency.abbreviation) {
                    if (index === 0) {
                      if (index === currencies.length - 1) {
                        return (
                          <CustomItem
                            onClick={() => setSelectedSourceIndex(index)}
                            className="rounded-xl"
                            key={index}
                          >
                            <div className="flex pl-4">
                              <img
                                className="w-7 h-7 -mt-1.5 mx-0.5"
                                src={currency.sym_pic_gray}
                              />
                              <span>{currency.abbreviation}</span>
                            </div>
                          </CustomItem>
                        );
                      } else {
                        return (
                          <CustomItem
                            onClick={() => setSelectedSourceIndex(index)}
                            className="rounded-t-xl"
                            key={index}
                          >
                            <div className="flex pl-4">
                              <img
                                className="w-7 h-7 -mt-1.5 mx-0.5"
                                src={currency.sym_pic_gray}
                              />
                              <span>{currency.abbreviation}</span>
                            </div>
                          </CustomItem>
                        );
                      }
                    } else if (index === currencies.length - 1) {
                      return (
                        <CustomItem
                          onClick={() => setSelectedSourceIndex(index)}
                          className="rounded-b-xl"
                          key={index}
                        >
                          <div className="flex pl-4">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.sym_pic_gray}
                            />
                            <span>{currency.abbreviation}</span>
                          </div>
                        </CustomItem>
                      );
                    } else {
                      return (
                        <CustomItem
                          onClick={() => setSelectedSourceIndex(index)}
                          key={index}
                        >
                          <div className="flex pl-4">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.sym_pic_gray}
                            />
                            <span>{currency.abbreviation}</span>
                          </div>
                        </CustomItem>
                      );
                    }
                  }
                })}
              </CustomDropdown>
              <button
                disabled={!selectedCurrecnyPair}
                onClick={switchSourceAndTarget}
                type="button"
              >
                <img
                  className="w-5 h-5"
                  src={require("../../../../../Images/pages/layout/Home/exchange-arrow.png")}
                />
              </button>
              <CustomDropdown
                className={`flex-1 font-${font}-regular`}
                label={
                  <div className="flex">
                    {selectedTargetIndex >= 0 && (
                      <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={
                          availableTargets[selectedTargetIndex]
                            ? availableTargets[selectedTargetIndex].sym_pic_gray
                            : ""
                        }
                      />
                    )}
                    <span>{targetLabel}</span>
                  </div>
                }
                searchable
              >
                {availableTargets.map((currency, index) => {
                  if (index === 0) {
                    if (index === availableTargets.length - 1) {
                      return (
                        <CustomItem
                          onClick={() => setSelectedTargetIndex(index)}
                          className="rounded-xl"
                          key={index}
                        >
                          <div className="flex pl-4">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.sym_pic_gray}
                            />
                            <span>{currency.abbreviation}</span>
                          </div>
                        </CustomItem>
                      );
                    } else {
                      return (
                        <CustomItem
                          onClick={() => setSelectedTargetIndex(index)}
                          className="rounded-t-xl"
                          key={index}
                        >
                          <div className="flex pl-4">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.sym_pic_gray}
                            />
                            <span>{currency.abbreviation}</span>
                          </div>
                        </CustomItem>
                      );
                    }
                  } else if (index === availableTargets.length - 1) {
                    return (
                      <CustomItem
                        onClick={() => setSelectedTargetIndex(index)}
                        className="rounded-b-xl"
                        key={index}
                      >
                        <div className="flex pl-4">
                          <img
                            className="w-7 h-7 -mt-1.5 mx-0.5"
                            src={currency.sym_pic_gray}
                          />
                          <span>{currency.abbreviation}</span>
                        </div>
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        onClick={() => setSelectedTargetIndex(index)}
                        key={index}
                      >
                        <div className="flex pl-4">
                          <img
                            className="w-7 h-7 -mt-1.5 mx-0.5"
                            src={currency.sym_pic_gray}
                          />
                          <span>{currency.abbreviation}</span>
                        </div>
                      </CustomItem>
                    );
                  }
                })}
              </CustomDropdown>
            </div>
            <div
              className={`flex flex-row ${
                font === "Fa" && "-reverse"
              } items-center w-full gap-7 text-${oppositeTheme} font-${font}-regular mt-2`}
            >
              <div className="flex-1 flex relative">
                <input
                  amountInputRef={amountInputRef}
                  className={`flex-1 ${
                    values.amount || +walletBalance === 0
                      ? "text-center"
                      : "text-left"
                  } hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  placeholder={lang["amount"]}
                  disabled={selectedSourceIndex < 0 || selectedTargetIndex < 0}
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
                {(values.amount === 0 || values.amount === "") &&
                  selectedSourceIndex >= 0 &&
                  selectedTargetIndex >= 0 &&
                  +walletBalance !== 0 && (
                    <button
                      type="button"
                      className="absolute top-2 right-3"
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

              <div className="flex-1 flex">
                <input
                  ref={rateInputRef}
                  className={`flex-1 text-center hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  placeholder={lang["rate"]}
                  disabled={selectedSourceIndex < 0 || selectedTargetIndex < 0}
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
                        (1 / max_rate) * selectedCurrecnyPair.rate_multiplier,
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
              </div>
            </div>
            {tip && (
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
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-x-1">
                        <img
                          className="w-5 h-5"
                          src={require(`../../../../../Images/arrow-right-${oppositeTheme}.png`)}
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
              <SubmitButton
                type={isDemo ? "button" : "submit"}
                onClick={isDemo ? OpenLoginSignupModal : handleSubmit}
                className={
                  values.amount &&
                  removeComma(values.amount) !== 0 &&
                  values.rate &&
                  removeComma(values.rate) !== 0
                    ? "flex justify-center mt-0.5 items-center w-full py-0.5"
                    : "flex justify-center mt-7 items-center w-full py-0.5"
                }
                rounded="lg"
                disabled={hasError}
              >
                {lang["submit"]}
              </SubmitButton>
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
  );
}
