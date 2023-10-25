import React, { useEffect, useState } from "react";
import { useUserState } from "../../Providers/UserProvider";
import Stepper from "./CompleteProfileModal/Stepper";

export default function CompleteProfileModal() {
  const [step, setStep] = useState(1);

  const userInfo = useUserState();
  useEffect(() => {
    if (userInfo) {
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

  return (
    <div className="flex justify-center items-center">
      <Stepper step={step} />
    </div>
  );
}
