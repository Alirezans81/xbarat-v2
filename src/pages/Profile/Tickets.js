import React, { useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import Topics from "../../components/pages/layout/Tickets/Topics";
import Chats from "../../components/pages/layout/Tickets/Chats";

export default function Tickets() {
  const theme = useThemeState();

  const [topics, setTopics] = useState([1, 1, 1, 1]);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1);

  return (
    <div className="w-full h-full grid grid-cols-11 grid-rows-1 md:gap-x-10">
      <div className={`col-span-3 bg-${theme} rounded-2xl`}>
        <Topics
          topics={topics}
          selectedTopicIndex={selectedTopicIndex}
          setSelectedTopicIndex={setSelectedTopicIndex}
        />
      </div>
      <div className={`col-span-8 bg-${theme} rounded-2xl md:rounded-r-none`}>
        <Chats
          topic={
            selectedTopicIndex >= 0 && selectedTopicIndex < topics.length
              ? topics[selectedTopicIndex]
              : null
          }
        />
        
        </div>
      </div>
    
  );
}
