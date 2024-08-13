import React from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
export default function ChatCard() {
  const theme = useThemeState();

  const oppositeTheme = theme === "dark" ? "light" : "dark";
  return (
    <div
      className={`flex flex-col text-${oppositeTheme} bg-${theme}-back max-h-44 max-w-74 rounded-2xl px-3 py-3 justify-between`}
    >
      <div>
        <div className="flex justify-between text-xl ">
          <span>Cancel Request</span>
          <img
            src={require("../../../../Images/pages/Tickets/open-ticket.png")}
            className=" h-5"
          />
        </div>
        <span className="text-blue text-xs">New Message</span>
        <div className="line-clamp-2 w-64">
          <span className=" text-xs text-gray ">
            You should check your wallet first and then try again Fugiat aute
            dolor tempor amet elit consequat fugiat eu. Non elit veniam in qui
            ullamco. Exercitation esse ut velit magna et velit duis laborum.
            Nulla veniam qui voluptate officia quis. Cillum id pariatur sint
            nostrud incididunt eiusmod cillum voluptate aliqua. Officia anim
            veniam qui cupidatat dolor Lorem in culpa consectetur eu.
          </span>
        </div>
      </div>
      <div>
        <span className="text-gray">2022 January </span>
      </div>
    </div>
  );
}
