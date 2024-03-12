import { Tooltip } from "flowbite-react";
import React from "react";

const customTheme = {
  target: "w-fit",
  animation: "transition-opacity",
  arrow: {
    base: "absolute z-10 h-2 w-2 rotate-45",
    style: {
      dark: "bg-[#171D20] text-white",
      light: "bg-white text-[#171D20]",
      auto: "bg-white text-[#171D20] dark:bg-[#171D20] dark:text-white",
    },
    placement: "-4px",
  },
  base: "absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm",
  hidden: "invisible opacity-0",
  style: {
    dark: "bg-[#171D20] text-white",
    light: "bg-white text-[#171D20]",
    auto: "bg-white text-[#171D20] dark:bg-[#171D20] dark:text-white",
  },
  content: "relative z-20 font",
};

const CustomTooltip = ({
  trigger,
  children,
  placement,
  className,
  content,
  style,
}) => {
  return (
    <Tooltip
      trigger={trigger}
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
