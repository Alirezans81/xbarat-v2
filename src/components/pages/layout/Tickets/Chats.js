import React, { useRef } from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import ChatCard from "../Referral/ChatCard";
import CustomDateTimeInput from "../../../common/CustomDateTimePicker";
import { CustomDropdown2 } from "../../../common/CustomDropdown2";
import { useModalDataSetState } from "../../../../Providers/ModalDataProvider";
import NewTicketModal from "../../../modals/NewTicketModal";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
export default function Chats({
  data,
  topic,
  setMode,
  setSelectedChatIndex,
  lastTicketButtonRef,
  refreshChats,
  setOnLoadSendMessage,
  setOnLoadMessage,
  setOnLoadFile,
}) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const setModalData = useModalDataSetState();

  const openNewTicketModal = () => {
    setModalData({
      title: "",
      children: (
        <NewTicketModal
          category={topic}
          refreshChats={refreshChats}
          lastTicketButtonRef={lastTicketButtonRef}
          setOnLoadSendMessage={setOnLoadSendMessage}
          setOnLoadMessage={setOnLoadMessage}
          setOnLoadFile={setOnLoadFile}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

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
              <button
                onClick={openNewTicketModal}
                className="bg-blue rounded-full p-3"
              >
                <img
                  alt=""
                  src={require("../../../../Images/pages/Tickets/new-ticket.png")}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
          {data && data.length > 0 ? (
            <div className="w-full h-full flex flex-wrap gap-6 overflow-y-scroll">
              {data.map((chat, index) => (
                <ChatCard
                  key={index}
                  data={chat}
                  onSelect={() => {
                    setMode("chat");
                    setSelectedChatIndex(index);
                  }}
                  lastTicketButtonRef={index === 0 ? lastTicketButtonRef : null}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <span className="text-5xl -mt-5">{lang["no-data"]}</span>
            </div>
          )}
        </div>
      </>
    );
  }
}
