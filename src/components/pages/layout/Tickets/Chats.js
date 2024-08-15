import React from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import ChatCard from "../Referral/ChatCard";
import CustomDateTimeInput from "../../../common/CustomDateTimePicker";
import { CustomDropdown2 } from "../../../common/CustomDropdown2";
export default function Chats({ data, topic, setMode, setSelectedChatIndex }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  if (!topic) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className={`text-${oppositeTheme} font-${font}-thin text-5xl`}>
          Select a topic!
        </span>
      </div>
    );
  } else {
    return (
      <>
        <div
          className={` w-full h-full text-${oppositeTheme} font-${font}-thin flex flex-col gap-y-4`}
        >
          <div className="flex content-center justify-between">
            <div className="content-center">
              <div className="flex gap-x-3">
                <CustomDropdown2 theme={theme} label={"Status"} />
                <CustomDateTimeInput placeHolder={"From Date"} />
                <CustomDateTimeInput placeHolder={"From Date"} />
              </div>
            </div>
            <div>
              <button className="bg-blue rounded-full p-3">
                <img
                  alt=""
                  src={require("../../../../Images/pages/Tickets/new-ticket.png")}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
          <div className="w-full h-full flex flex-wrap gap-6 overflow-y-scroll">
            {data.map((chat, index) => (
              <ChatCard
                key={index}
                data={chat}
                onSelect={() => {
                  setMode("chat");
                  setSelectedChatIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
