import { Dropdown } from "flowbite-react";
import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";

const customTheme = {
  arrowIcon: "ml-2 h-4 w-4",
  content: "",
  floating: {
    animation: "transition-opacity",
    arrow: {
      base: "z-10 h-2 w-2 rotate-45",
      style: {
        dark: "bg-gray-900 dark:bg-gray-700",
        light: "bg-white",
        auto: "bg-white dark:bg-gray-700",
      },
      placement: "-20px",
    },
    base: "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
    content: "py-1 text-sm text-gray-700 dark:text-gray-200",
    divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
    header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
    hidden: "invisible opacity-0",
    item: {
      container: "",
      base: "flex items-center justify-center py-2 px-4 text-sm cursor-pointer w-full ",
      icon: "mr-2 h-4 w-4",
    },
    style: {
      dark: "bg-gray-900 text-white dark:bg-gray-700",
      light: "border border-gray-200 bg-white text-gray-900",
      auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
    },
    target: "w-fit",
  },
  inlineWrapper: "flex items-center",
};

function CustomDropdown2({ children, label, className }) {
  const theme = useThemeState();
  const buttonStyle =
    theme === "dark"
      ? {
          backgroundColor: "#171D20",
          color: "#fff",
          fontFamily: "manjari-bold",
          flex: 1,
          minWidth: 0,
        }
      : {
          backgroundColor: "#fff",
          color: "#2A2B2E",
          fontFamily: "manjari-bold",
          flex: 1,
          minWidth: 0,
        };

  return (
    <Dropdown
      theme={customTheme}
      color="dark"
      label={<span className={className + " -mb-6"}>{label}</span>}
      className={className + ` bg-${theme} rounded-xl hover:bg-${theme}`}
      style={buttonStyle}
    >
      <div className="max-h-40 pr-1.5 py-2">
        <div className="max-h-36 overflow-y-scroll">{children}</div>
      </div>
    </Dropdown>
  );
}

function CustomItem2({ children, className, onClick }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  return (
    <Dropdown.Item
      theme={customTheme}
      onClick={onClick}
      className={
        className +
        ` text-${oppositeTheme} bg-${theme} bg-${theme}-hover border-gray`
      }
    >
      <div className={`font-${font}-regular pt-1.5 text-${oppositeTheme}`}>
        {children}
      </div>
    </Dropdown.Item>
  );
}

export { CustomDropdown2, CustomItem2 };
