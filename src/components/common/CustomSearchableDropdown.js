import React, { useEffect, useState } from "react";
import { CustomDropdown, CustomItem } from "./CustomDropdown";
import { CustomDropdown2, CustomItem2 } from "./CustomDropdown2";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { Formik } from "formik";

export default function CustomSearchableDropdown({
  typeNumber,
  list,
  onSelectItem,
  label,
  dropdownClassName,
  itemClassName,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const lang = useLanguageState();

  const [filteredList, setFilteredList] = useState(list || []);

  useEffect(() => {
    list && list.length && setFilteredList(list);
  }, [list]);

  const search = (values) => {};

  if (typeNumber === 1) {
    return (
      <Formik initialValues={{ search: "" }} onSubmit={search}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <CustomDropdown className={dropdownClassName} label={label}>
            <form
              className="w-full relative pl-4 pr-1 py-1"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                name="search"
                className={`w-full px-4 pt-2 pb-1 font-${font}-regular placeholder:text-gray text-${oppositeTheme} bg-${theme}-back rounded-full`}
                placeholder={lang["search"]}
                type="text"
                onChange={handleChange("search")}
                onBlur={handleBlur("search")}
                value={values.search}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="absolute right-4 top-3"
              >
                <img
                  className="w-5 h-5"
                  src={require("../../Images/common/search.png")}
                />
              </button>
            </form>
            {filteredList.map((data, index) => (
              <CustomItem
                key={index}
                className={itemClassName}
                children={data}
                onClick={onSelectItem}
              />
            ))}
          </CustomDropdown>
        )}
      </Formik>
    );
  } else if (typeNumber === 2) {
    return (
      <CustomDropdown2 className={dropdownClassName} label={label}>
        <Formik initialValues={{ search: "" }} onSubmit={search}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <div className="w-full relative pl-4 pr-1 py-1">
                <input
                  name="search"
                  className={`w-full px-4 pt-2 pb-1 font-${font}-regular placeholder:text-gray text-${oppositeTheme} bg-${theme}-back rounded-full`}
                  placeholder={lang["search"]}
                  type="text"
                  onChange={handleChange("search")}
                  onBlur={handleBlur("search")}
                  value={values.search}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="absolute right-4 top-3"
                >
                  <img
                    className="w-5 h-5"
                    src={require("../../Images/common/search.png")}
                  />
                </button>
              </div>
              {filteredList.map((data, index) => (
                <CustomItem2
                  key={index}
                  className={itemClassName}
                  children={data}
                  onClick={onSelectItem}
                />
              ))}
            </>
          )}
        </Formik>
      </CustomDropdown2>
    );
  }
}
