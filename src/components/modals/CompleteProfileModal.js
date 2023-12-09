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
} from "../../apis/modal/CompleteProfileModal/hooks";
import { Formik } from "formik";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import {
  useGetWalletAssets,
  useGetWalletTanks,
  useGetWallets,
  useCreateWalletAsset,
  useCreateWalletTank,
} from "../../apis/common/wallet/hooks";

export default function CompleteProfileModal() {
  const userInfo = useUserState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const [step, setStep] = useState(1);

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
      userInfo.first_name && userInfo.last_name && userInfo.phone && setStep(2);

      userInfo.nationality && userInfo.country && userInfo.city && setStep(3);

      userInfo.identity_type &&
        userInfo.identity_code &&
        userInfo.document &&
        setStep(4);
    }
  }, []);
  useEffect(() => {
    walletTanks[0] && setStep(5);
  }, [walletTanks]);

  const { createWalletAsset, isLoading: createWalletAssetIsLoading } =
    useCreateWalletAsset();
  useEffect(
    () => setIsLoadingSplashScreen(createWalletAssetIsLoading),
    [createWalletAssetIsLoading]
  );
  const { createWalletTank, isLoading: createWalletTankIsLoading } =
    useCreateWalletTank();
  useEffect(
    () => setIsLoadingSplashScreen(createWalletTankIsLoading),
    [createWalletTankIsLoading]
  );

  const { fetchStep1, isLoading: fetchStep1IsLoading } = useFetchStep1();
  const { fetchStep2, isLoading: fetchStep2IsLoading } = useFetchStep2();
  const { fetchStep3, isLoading: fetchStep3IsLoading } = useFetchStep3();
  const fetchStep4 = (values, customFunction) => {
    const createWalletAssetParams = {
      wallet: wallets[0] && wallets[0].url ? wallets[0].url : "",
      currency: values.wallet_asset_currency,
    };
    const createWalletTankParams = {
      title: values.title,
      wallet_tank_type: values.wallet_tank_type,
      bank_info: values.bank_info,
    };

    !walletAssets[0]
      ? createWalletAsset(createWalletAssetParams, (created_wallet_asset) => {
          createWalletTank(
            {
              wallet_asset:
                created_wallet_asset && created_wallet_asset.url
                  ? created_wallet_asset.url
                  : "",
              ...createWalletTankParams,
            },
            customFunction
          );
        })
      : createWalletTank(
          {
            wallet: wallets[0] && wallets[0].url ? wallets[0].url : "",
            ...createWalletTankParams,
          },
          customFunction
        );
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
  const nextStep = () => {
    if (step === 3) {
      userInfo &&
        userInfo.username &&
        getWallets({ user: userInfo.username }, setWallets);
    }
    step <= 4 && setStep(step + 1);
  };
  console.log(userInfo);

  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper step={step} />
      <div className="px-4 w-full mt-5">
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
              userInfo && userInfo.document && userInfo.document !== "undefined"
                ? userInfo.document
                : "",
            wallet_asset_currency: "",
            title: "",
            wallet_tank_type: "",
            bank_info: "",
          }}
          onSubmit={(values) => {
            step === 1 && fetchStep1(values, nextStep);
            step === 2 && fetchStep2(values, nextStep);
            step === 3 && fetchStep3(values, nextStep);
            step === 4 && fetchStep4(values, nextStep);
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
                  />
                  <Buttons step={step} nextFunction={handleSubmit} />
                </>
              );
            } else if (step === 2) {
              return (
                <>
                  <Step2 setFieldValue={setFieldValue} />
                  <Buttons step={step} nextFunction={handleSubmit} />
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
                  <Buttons step={step} nextFunction={handleSubmit} />
                </>
              );
            } else if (step === 4) {
              return (
                <>
                  <Step4
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    setFieldValue={setFieldValue}
                    walletAsset={walletAssets[0]}
                    walletTank={walletTanks[0]}
                  />
                  <Buttons step={step} nextFunction={handleSubmit} />
                </>
              );
            } else if (step === 5) {
              return <Step5 />;
            }
          }}
        </Formik>
      </div>
    </div>
  );
}
