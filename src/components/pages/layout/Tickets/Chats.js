import React, { useState } from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import ChatCard from "../Referral/ChatCard";
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
      <div className="w-full h-full flex flex-wrap gap-x-5 px-5 py-5">
        <ChatCard />
      </div>
    );
  }
}
