import React, { useEffect, useState } from "react";
import { useUserState } from "../../Providers/UserProvider";
import Stepper from "./CompleteProfileModal/Stepper";
import Step1 from "./CompleteProfileModal/Step1";
import Step2 from "./CompleteProfileModal/Step2";
import Step3 from "./CompleteProfileModal/Step3";
import Step4 from "./CompleteProfileModal/Step4";
import Buttons from "./CompleteProfileModal/Buttons";
import {
  useFetchStep1,
  useFetchStep2,
  useFetchStep3,
  useFetchStep4,
} from "../../apis/modal/CompleteProfileModal/hooks";
import { Formik } from "formik";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";

export default function CompleteProfileModal() {
  const [step, setStep] = useState(1);

  const userInfo = useUserState();
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.first_name, userInfo.last_name, userInfo.phone);
      userInfo.first_name &&
        userInfo.last_name &&
        userInfo.phone &&
        setStep(2) &&
        userInfo.nationality &&
        userInfo.country &&
        userInfo.city &&
        setStep(3) &&
        (userInfo.nationality_number ||
          userInfo.passport_number ||
          userInfo.tazkare_number) &&
        userInfo.document &&
        setStep(4);
    }
  }, []);

  const { fetchStep1, isLoading: fetchStep1IsLoading } = useFetchStep1();
  const { fetchStep2, isLoading: fetchStep2IsLoading } = useFetchStep2();
  const { fetchStep3, isLoading: fetchStep3IsLoading } = useFetchStep3();
  const { fetchStep4, isLoading: fetchStep4IsLoading } = useFetchStep4();

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
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
    step < 4 && setStep(step + 1);
  };

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
          }}
          onSubmit={(values) => {
            step === 1 && fetchStep1(values, nextStep);
            step === 2 && fetchStep2(values, nextStep);
            step === 3 && fetchStep3(values, nextStep);
            step === 4 && fetchStep4(values, nextStep);
          }}
        >
          {({ handleBlur, handleChange, values, handleSubmit }) => {
            if (step === 1) {
              return (
                <>
                  <Step1
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                  />
                  <Buttons nextFunction={handleSubmit} />
                </>
              );
            } else if (step === 2) {
              return (
                <>
                  <Step2
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                  />
                  <Buttons nextFunction={handleSubmit} />
                </>
              );
            } else if (step === 3) {
              return (
                <>
                  <Step3
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                  />
                  <Buttons nextFunction={handleSubmit} />
                </>
              );
            } else if (step === 4) {
              return (
                <Step4
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  values={values}
                />
              );
            }
          }}
        </Formik>
      </div>
    </div>
  );
}
