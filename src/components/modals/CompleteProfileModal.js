import React, { useEffect, useState } from "react";
import { useUserState } from "../../Providers/UserProvider";

export default function CompleteProfileModal() {
  const [step, setStep] = useState(0);

  const userInfo = useUserState();
  useEffect(() => {
    if (userInfo) {
      userInfo.first_name && userInfo.last_name && userInfo.phone && setStep(1) &&
      userInfo.nationality && userInfo.country && userInfo.city && setStep(2) &&
      (userInfo.nationality_number || userInfo.passport_number || userInfo.tazkare_number) && userInfo.document && setStep(3);
    }
  }, []);

  return <div>CompleteProfileModal</div>;
}
