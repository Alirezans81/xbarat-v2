import React from "react";

const ExchangeFormTutorialComponent = ({ data }) => {
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
              <span className={`-m${oneDirection}-0.5`}>{sourceLabel}</span>
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
              (errorMessage || (e.target.value && values.rate)) && setTip("");
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
                    setFieldValue("amount", addComma(+walletBalance, true));
                  } else {
                    findError();
                  }
                }}
              >
                <span className={`text-gray font-${font}-regular text-sm`}>
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
              (errorMessage || (values.amount && e.target.value)) && setTip("");
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
            <span className={`text-${oppositeTheme} font-${font}-regular`}>
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
              <span className={`text-red font-${font}-regular mt-0.5 text-sm`}>
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
                        availableTargets[selectedTargetIndex].floating_number
                      )
                    ) +
                      " " +
                      (availableTargets[selectedTargetIndex]
                        ? availableTargets[selectedTargetIndex].abbreviation
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
};

export default ExchangeFormTutorialComponent;
