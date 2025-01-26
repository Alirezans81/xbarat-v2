import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import Topic from "./Topics/Topic";

export default function Topics({
  topics,
  selectedTopicIndex,
  setSelectedTopicIndex,
}) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useLanguageState();

  return (
    <div className="w-full h-full flex flex-col gap-y-4 px-5 pb-5 pt-4">
      <span className={`text-${oppositeTheme} font-${font}-bold text-2xl`}>
        {lang["topics"]}
      </span>
      <div className="w-full flex-1 overflow-y-auto">
        {topics.map((topic, index) => (
          <div key={index} className={index === 0 ? "" : "mt-3"}>
            <Topic
              key={index}
              data={topic}
              selected={selectedTopicIndex === index}
              onSelect={() => setSelectedTopicIndex(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
