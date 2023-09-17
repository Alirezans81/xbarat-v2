import { Tooltip } from "flowbite-react";
import React from "react";

const customTheme = {
  target: "w-fit",
  animation: "transition-opacity",
  arrow: {
    base: "absolute z-10 h-2 w-2 rotate-45",
    style: {
      dark: "bg-[#393C42]",
      light: "bg-white",
      auto: "bg-white dark:bg-[#393C42]",
    },
    placement: "-4px",
  },
  base: "absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm",
  hidden: "invisible opacity-0",
  style: {
    dark: "bg-gray-900 text-white dark:bg-gray-700",
    light: "border border-gray-200 bg-white text-gray-900",
    auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
  },
  content: "relative z-20 font",
};

const CustomTooltip = ({ children, placement, className, content, style }) => {
  return (
    <Tooltip
      theme={customTheme}
      placement={placement}
      className={className}
      content={content}
      style={style}
    >
      {children}
    </Tooltip>
  );
};

export { CustomTooltip };
