import React from "react";

export default function ChatCard() {
  return (
    <div className="flex flex-col text-light bg-dark-back h-44 w-[79] rounded-2xl px-3 py-3 justify-between">
      <div>
        <div className="flex justify-between text-xl ">
          <span>Cancel Request</span>
          <img
            src={require("../../../../Images/pages/Tickets/Ticket sign.png")}
            className="w-7 h-7"
          />
        </div>
        <span className="text-blue text-xs">New Message</span>
        <div>
          <span className="text-xs text-gray">
            You should check your wallet first and then try again
          </span>
        </div>
      </div>
      <div>
        <span className="text-gray">2022 January </span>
      </div>
    </div>
  );
}
