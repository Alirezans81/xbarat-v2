import React, { useEffect, useState } from "react";
import { useUserState } from "../../Providers/UserProvider";
import Stepper from "./CompleteProfileModal/Stepper";
import Step1 from "./CompleteProfileModal/Step1";
import Step2 from "./CompleteProfileModal/Step2";
import Step3 from "./CompleteProfileModal/Step3";
import Step4 from "./CompleteProfileModal/Step4";
import Step5 from "./CompleteProfileModal/Step5";
import Buttons from "./CompleteProfileModal/Buttons";
import {
  useFetchStep1,
  useFetchStep2,
  useFetchStep3,
  useFetchStep4,
} from "../../apis/modal/CompleteProfileModal/hooks";
import { Formik } from "formik";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import {
  useGetWalletAssets,
  useGetWalletTanks,
  useGetWallets,
  useCreateWalletTank,
} from "../../apis/common/wallet/hooks";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import UploadDocumentHint from "./CompleteProfileModal/UploadDocumentHint";
import { useGetUserInfo } from "../../apis/pages/Profile/hooks";
import { useToastDataSetState } from "../../Providers/ToastDataProvider";

export default function CompleteProfileModal() {
  const userInfo = useUserState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const lang = useLanguageState();
  const setToastData = useToastDataSetState();

  const openRejectionErrorToast = (message) => {
    setToastData({
      status: "failed",
      message,
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };

  const [step, setStep] = useState(1);

  const { getUserInfo, isLoading: getUserInfoIsLoading } = useGetUserInfo();
  useEffect(
    () => setIsLoadingSplashScreen(getUserInfoIsLoading),
    [getUserInfoIsLoading]
  );

  useEffect(() => {
    getUserInfo();
  }, []);

  const { getWallets, isLoading: getWalletsIsLoading } = useGetWallets();
  useEffect(
    () => setIsLoadingSplashScreen(getWalletsIsLoading),
    [getWalletsIsLoading]
  );
  const { getWalletAssets, isLoading: getWalletAssetsIsLoading } =
    useGetWalletAssets();
  useEffect(
    () => setIsLoadingSplashScreen(getWalletAssetsIsLoading),
    [getWalletAssetsIsLoading]
  );
  const { getWalletTanks, isLoading: getWalletTanksIsLoading } =
    useGetWalletTanks();
  useEffect(
    () => setIsLoadingSplashScreen(getWalletTanksIsLoading),
    [getWalletTanksIsLoading]
  );

  const currencies = useCurrenciesState();
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);

  const [wallets, setWallets] = useState([]);
  useEffect(() => {
    userInfo &&
      userInfo.username &&
      getWallets({ user: userInfo.username }, setWallets);
  }, []);
  const [walletAssets, setWalletAssets] = useState([]);
  useEffect(() => {
    wallets[0] &&
      wallets[0].url &&
      getWalletAssets({ wallet: wallets[0].url }, setWalletAssets);
  }, [wallets]);
  const [walletTanks, setWalletTanks] = useState([]);
  useEffect(() => {
    userInfo &&
      userInfo.username &&
      getWalletTanks({ user: userInfo.username }, setWalletTanks);
  }, [walletAssets]);

  useEffect(() => {
    if (userInfo) {
      if (
        userInfo.first_name &&
        userInfo.last_name &&
        userInfo.phone &&
        userInfo.address
      ) {
        if (
          userInfo.nationality &&
          userInfo.country &&
          (userInfo.city || userInfo.city_str)
        ) {
          if (
            userInfo.identity_type &&
            userInfo.identity_code &&
            userInfo.document
          ) {
            if (walletTanks[0]) setStep(5);
            else setStep(4);
          } else setStep(3);
        } else setStep(2);
      }

      userInfo.rejection_reason &&
        openRejectionErrorToast(userInfo.rejection_reason);
    }
  }, []);

  const { createWalletTank, isLoading: createWalletTankIsLoading } =
    useCreateWalletTank();
  useEffect(
    () => setIsLoadingSplashScreen(createWalletTankIsLoading),
    [createWalletTankIsLoading]
  );

  const [phoneError, setPhoneError] = useState();
  const validateFetchStep1 = (values) => {
    if (values.first_name && values.last_name && values.phone) {
      const phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (phoneRegex.test(values.phone.replace(/ /g, ""))) {
        return true;
      }

      setPhoneError(lang["wrong-phone-error"] || "Invalid phone");
      return false;
    }
    return false;
  };
  const validateFetchStep2 = (values) => {
    if (
      values.nationality &&
      values.country &&
      (values.city || values.city_str)
    ) {
      return true;
    }
    return false;
  };
  const validateFetchStep3 = (values) => {
    if (values.identity_type && values.identity_code && values.document) {
      return true;
    }

    return false;
  };
  const validateFetchStep4 = (values) => {
    if (
      values.wallet_asset_currency &&
      values.title &&
      values.wallet_tank_type &&
      values.bank_info
    ) {
      return true;
    }
    return false;
  };

  const { fetchStep1, isLoading: fetchStep1IsLoading } = useFetchStep1();
  const { fetchStep2, isLoading: fetchStep2IsLoading } = useFetchStep2();
  const { fetchStep3, isLoading: fetchStep3IsLoading } = useFetchStep3();
  const { fetchStep4: userFetchStep4, isLoading: fetchStep4IsLoading } =
    useFetchStep4();
  const fetchStep4 = (values, customFunction) => {
    userFetchStep4({
      main_currency:
        currencies[selectedCurrencyIndex] &&
        currencies[selectedCurrencyIndex].url
          ? currencies[selectedCurrencyIndex].url
          : "",
    });

    const createWalletTankParams = {
      user: userInfo && userInfo.url ? userInfo.url : "",
      currency:
        currencies[selectedCurrencyIndex] &&
        currencies[selectedCurrencyIndex].url
          ? currencies[selectedCurrencyIndex].url
          : "",
      title: values.title,
      account_name: values.title,
      wallet_tank_type: values.wallet_tank_type,
      bank_info: values.bank_info,
    };
    createWalletTank(createWalletTankParams, customFunction);
  };

  useEffect(
    () => setIsLoadingSplashScreen(fetchStep1IsLoading),
    [fetchStep1IsLoading]
  );
  useEffect(
    () => setIsLoadingSplashScreen(fetchStep2IsLoading),
    [fetchStep2IsLoading]
  );
  useEffect(
    () => setIsLoadingSplashScreen(fetchStep3IsLoading),
    [fetchStep3IsLoading]
  );
  useEffect(
    () => setIsLoadingSplashScreen(fetchStep4IsLoading),
    [fetchStep4IsLoading]
  );

  const nextStep = () => {
    step <= 4 && setStep(step + 1);
  };
  const previousStep = () => {
    step > 0 && setStep(step - 1);
  };

  return (
    <div className="flex flex-col px-4 justify-center items-center md:flex-row w-[90dvw] md:w-fit">
      <div className="w-full flex flex-col justify-center items-center">
        <Stepper step={step} />
        <div className="w-full mt-5 h-full flex flex-col justify-between">
          <Formik
            initialValues={{
              first_name:
                userInfo &&
                userInfo.first_name &&
                userInfo.first_name !== "undefined"
                  ? userInfo.first_name
                  : "",
              last_name:
                userInfo &&
                userInfo.last_name &&
                userInfo.last_name !== "undefined"
                  ? userInfo.last_name
                  : "",
              phone:
                userInfo && userInfo.phone && userInfo.phone !== "undefined"
                  ? userInfo.phone
                  : "",
              address:
                userInfo && userInfo.address && userInfo.address !== "undefined"
                  ? userInfo.address
                  : "",
              nationality:
                userInfo &&
                userInfo.nationality &&
                userInfo.nationality !== "undefined"
                  ? userInfo.nationality
                  : "",
              country:
                userInfo && userInfo.country && userInfo.country !== "undefined"
                  ? userInfo.country
                  : "",
              city:
                userInfo && userInfo.city && userInfo.city !== "undefined"
                  ? userInfo.city
                  : "",
              city_str:
                userInfo &&
                userInfo.city_str &&
                userInfo.city_str !== "undefined"
                  ? userInfo.city_str
                  : "",
              identity_type:
                userInfo &&
                userInfo.identity_type &&
                userInfo.identity_type !== "undefined"
                  ? userInfo.identity_type
                  : "",
              identity_code:
                userInfo &&
                userInfo.identity_code &&
                userInfo.identity_code !== "undefined"
                  ? userInfo.identity_code
                  : "",
              document:
                userInfo &&
                userInfo.document &&
                userInfo.document !== "undefined"
                  ? userInfo.document
                  : "",
              wallet_asset_currency: "",
              title: "",
              wallet_tank_type: "",
              bank_info: "",
            }}
            onSubmit={(values) => {
              step === 1 &&
                validateFetchStep1(values) &&
                fetchStep1(values, nextStep);
              step === 2 &&
                validateFetchStep2(values) &&
                fetchStep2(values, nextStep);
              step === 3 &&
                validateFetchStep3(values) &&
                fetchStep3(values, nextStep);
              if (step === 4) {
                validateFetchStep4(values)
                  ? fetchStep4(values, nextStep)
                  : nextStep();
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
              if (step === 1) {
                return (
                  <>
                    <Step1
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      phoneError={phoneError}
                      setPhoneError={setPhoneError}
                    />
                    <Buttons
                      step={step}
                      previousStep={previousStep}
                      nextFunction={handleSubmit}
                    />
                  </>
                );
              } else if (step === 2) {
                return (
                  <>
                    <Step2
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                    <Buttons
                      step={step}
                      previousStep={previousStep}
                      nextFunction={handleSubmit}
                    />
                  </>
                );
              } else if (step === 3) {
                return (
                  <>
                    <Step3
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                    <Buttons
                      step={step}
                      previousStep={previousStep}
                      nextFunction={handleSubmit}
                    />
                  </>
                );
              } else if (step === 4) {
                return (
                  <>
                    <Step4
                      currencies={currencies}
                      selectedCurrencyIndex={selectedCurrencyIndex}
                      setSelectedCurrencyIndex={setSelectedCurrencyIndex}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      setFieldValue={setFieldValue}
                      walletAsset={walletAssets[0]}
                      walletTank={walletTanks[0]}
                    />
                    <Buttons
                      step={step}
                      previousStep={previousStep}
                      nextFunction={handleSubmit}
                    />
                  </>
                );
              } else if (step === 5) {
                return <Step5 />;
              }
            }}
          </Formik>
        </div>
      </div>
      <div className="hidden md:block">
        {step === 3 && <UploadDocumentHint />}
      </div>
    </div>
  );
}
