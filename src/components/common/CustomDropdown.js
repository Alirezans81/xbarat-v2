import { Dropdown } from "flowbite-react";
import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import { Formik } from "formik";
import { useLanguageState } from "../../Providers/LanguageProvider";

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

function CustomDropdown({ children, label, className, labelClassName, disabled, searchable }) {
  const theme = useThemeState();
  const lang = useLanguageState();
  const font = useFontState();
  const buttonStyle =
    theme === "dark"
      ? {
          backgroundColor: "#152831",
          color: "#fff",
          fontFamily: font === "Fa" ? "ModamFaNum-bold" : "manjari-bold",
          paddingBottom: font === "Fa" ? 2 : 0,
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
        }
      : {
          backgroundColor: "#EEEEEE",
          color: "#2A2B2E",
          fontFamily: font === "Fa" ? "ModamFaNum-bold" : "manjari-bold",
          paddingBottom: font === "Fa" ? 2 : 0,
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
        };

  return (
    <Dropdown
      theme={customTheme}
      color="dark"
      label={<span className={labelClassName + " -mb-6"}>{label}</span>}
      className={className + ` bg-${theme} rounded-xl hover:bg-${theme} z-20`}
      style={buttonStyle}
      disabled={disabled}
    >
      <div className="max-h-64 pr-1.5 py-1.5 scroll-horizental">
        <div dir="ltr" className="max-h-60 overflow-y-scroll">
          {searchable && (
            <div className="w-full pl-2 pt-1 pr-0.5 mb-2 flex relative">
              <Formik initialValues={{ search: "" }}>
                {({ handleChange, handleBlur, values, handleSubmit }) => (
                  <input
                    name="search"
                    placeholder={lang["search"]}
                    className={`flex-1 hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 font-${font}-regular outline-white rounded-lg w-0 pt-2 pb-1`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.search}
                  />
                )}
              </Formik>
            </div>
          )}
          {children}
        </div>
      </div>
    </Dropdown>
  );
}

function CustomItem({ children, className, onClick }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  return (
    <Dropdown.Item
      theme={customTheme}
      onClick={onClick}
      className={
        className +
        ` text-${oppositeTheme} bg-${theme} bg-${theme}-hover bg-${theme}-focus border-gray`
      }
    >
      <div
        className={`w-full font-${font}-regular pt-1.5 text-${oppositeTheme}`}
      >
        {children}
      </div>
    </Dropdown.Item>
  );
}

export { CustomDropdown, CustomItem };
