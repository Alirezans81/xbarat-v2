import React, { useEffect, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import Topics from "../../components/pages/layout/Tickets/Topics";
import Chats from "../../components/pages/layout/Tickets/Chats";
import { useGetChats, useGetTopics } from "../../apis/pages/Tickets/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import Chat from "../../components/pages/layout/Tickets/Chats/Chat";

export default function Tickets() {
  const theme = useThemeState();
  const setLoading = useIsLoadingSplashScreenSetState();

  const [mode, setMode] = useState("allChats");

  const [topics, setTopics] = useState([]);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1);
  const { getTopics, isLoading: getTopicsIsLoading } = useGetTopics();
  useEffect(() => setLoading(getTopicsIsLoading), [getTopicsIsLoading]);
  useEffect(() => {
    getTopics(setTopics);
  }, []);

  const [chats, setChats] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(-1);
  const { getChats, isLoading: getChatsIsLoading } = useGetChats();
  useEffect(() => setLoading(getChatsIsLoading), [getChatsIsLoading]);
  useEffect(() => {
    selectedTopicIndex >= 0 &&
      selectedTopicIndex < topics.length &&
      topics[selectedTopicIndex] &&
      topics[selectedTopicIndex].slug &&
      getChats(topics[selectedTopicIndex].slug, setChats);
  }, [selectedTopicIndex]);

  return (
    <div className="w-full h-full lg:grid grid-cols-11 grid-rows-1 md:gap-x-10 gap-y-6 flex flex-col overflow-y-auto px-7 md:px-0">
      <div className={`lg:col-span-3 bg-${theme} rounded-2xl`}>
        <Topics
          topics={topics}
          selectedTopicIndex={selectedTopicIndex}
          setSelectedTopicIndex={setSelectedTopicIndex}
        />
      </div>
      <div
        className={`lg:col-span-8 bg-${theme} rounded-2xl px-8 py-6 md:rounded-r-none`}
      >
        {mode === "allChats" ? (
          <Chats
            data={chats}
            topic={
              selectedTopicIndex >= 0 && selectedTopicIndex < topics.length
                ? topics[selectedTopicIndex]
                : null
            }
            setMode={setMode}
            setSelectedChatIndex={setSelectedChatIndex}
          />
        ) : (
          <Chat
            data={
              selectedChatIndex >= 0 && selectedChatIndex < chats.length
                ? chats[selectedChatIndex]
                : null
            }
            onBackClick={() => {
              setMode("allChats");
              setSelectedChatIndex(-1);
            }}
          />
        )}
      </div>
    </div>
  );
}
