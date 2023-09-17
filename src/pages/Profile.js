import React from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import EditProfile from "../components/pages/layout/Profile/EditProfile";
import LastTickets from "../components/pages/layout/Profile/LastTickets";

export default function Profile() {
  const theme = useThemeState();
  const { one: oneDirection } = useDirectionState();

  return (
    <div className="grid grid-cols-12 grid-rows-2 gap-8 h-full w-full">
      <div className={`col-span-5 row-span-2 bg-${theme} rounded-3xl`}>
        <EditProfile />
      </div>
      <div
        className={`col-span-7 row-span-1 bg-${theme} rounded-${oneDirection}-3xl`}
      ></div>
      <div
        className={`col-span-7 row-span-1 bg-${theme} rounded-${oneDirection}-3xl`}
      >
        <LastTickets />
      </div>
    </div>
  );
}
