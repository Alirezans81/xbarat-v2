import React, { useState } from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import ChatCard from "../Referral/ChatCard";
import CustomDateTimeInput from "../../../common/CustomDateTimePicker";
import { CustomDropdown, CustomItem } from "../../../common/CustomDropdown";
export default function Chats({ topic }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  const [chats, setChats] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1]);

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
        <div className=" w-full h-full overflow-y-scroll">
          <div className="flex content-center justify-between px-12 pt-5 ">
            <div>
              <div className="flex gap-x-3">
                <CustomDropdown label={"Status"} />
                <CustomDateTimeInput placeHolder={"From Date"} />
                <CustomDateTimeInput placeHolder={"From Date"} />
              </div>
            </div>
            <div>
              <img
                src={require("../../../../Images/pages/Tickets/Ticket sign.png")}
                className="w-6 h-6"
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-wrap px-12 py-5 gap-6 ">
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
          </div>
        </div>
      </>
    );
  }
}
