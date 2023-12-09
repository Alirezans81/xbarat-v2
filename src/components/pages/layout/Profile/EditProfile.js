import React from "react";
import Topbar from "./EditProfile/Topbar";
import Personalnfo from "./EditProfile/Personalnfo";
import { useUserState } from "../../../../Providers/UserProvider";
import NationalInfo from "./EditProfile/NationalInfo";
import DocumentInfo from "./EditProfile/DocumentInfo";
import CompleteProfileMessage from "./EditProfile/CompleteProfileMessage";

export default function EditProfile() {
  const userInfo = useUserState();

  return (
    <div className="h-full w-full flex flex-col justify-between py-5 px-7">
      <Topbar userInfo={userInfo} />
      {userInfo && userInfo["is_verified"] ? (
        <div className="h-full mt-5 flex flex-col gap-5">
          <Personalnfo userInfo={userInfo} />
          <NationalInfo userInfo={userInfo} />
          <DocumentInfo userInfo={userInfo} />
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <CompleteProfileMessage />
        </div>
      )}
    </div>
  );
}
