import React, { useState } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import EditButton from "./common/EditButton";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import {
  CustomDropdown2,
  CustomItem2,
} from "../../../../common/CustomDropdown2";

export default function NationalInfo({ userInfo }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [canEdit, setCanEdit] = useState();
  const lang = useLanguageState();

  const updateNationalInfo = () => {};

  const [nationalitiesList, setNationalitiesList] = useState([
    { title: "Iranian" },
    { title: "Afghan" },
  ]);
  const [nationalityIndex, setNationalityIndex] = useState(-1);
  const [countriesList, setCountriesList] = useState([
    { title: "Iran" },
    { title: "Afghanistan" },
    { title: "Germany" },
  ]);
  const [countriesIndex, setCountriesIndex] = useState(-1);
  const [citiesList, setCitiesList] = useState([
    { title: "Mashhad" },
    { title: "Tehran" },
    { title: "Esfahan" },
  ]);
  const [cityIndex, setCityIndex] = useState(-1);

  return (
    <div
      className={`bg-${theme}-back rounded-3xl w-full flex-1 relative grid grid-cols-2 grid-rows-2 px-5 py-4`}
    >
      <EditButton
        canEdit={canEdit}
        setCanEdit={setCanEdit}
        customFunction={updateNationalInfo}
      />
      <div className="col-span-2 row-span-1 flex flex-col">
        <span className="text-gray font-mine-regular">
          {lang["nationality"]}
        </span>
        {canEdit ? (
          <CustomDropdown2
            className="flex-1 font-mine-regular"
            label={
              userInfo && userInfo.nationality && userInfo.nationality.title
                ? userInfo.nationality.title
                : ""
            }
          >
            {nationalitiesList.map((nationality, index) => {
              if (nationality && nationality.title) {
                if (index === 0) {
                  if (index === nationalitiesList.length - 1) {
                    return (
                      <CustomItem2
                        onClick={() => setNationalityIndex(index)}
                        className="rounded-xl"
                        key={index}
                      >
                        <span>{nationality.title}</span>
                      </CustomItem2>
                    );
                  } else {
                    return (
                      <CustomItem2
                        onClick={() => setNationalityIndex(index)}
                        className="rounded-t-xl"
                        key={index}
                      >
                        <span>{nationality.title}</span>
                      </CustomItem2>
                    );
                  }
                } else if (index === nationalitiesList.length - 1) {
                  return (
                    <CustomItem2
                      onClick={() => setNationalityIndex(index)}
                      className="rounded-b-xl"
                      key={index}
                    >
                      <span>{nationality.title}</span>
                    </CustomItem2>
                  );
                } else {
                  return (
                    <CustomItem2
                      onClick={() => setNationalityIndex(index)}
                      key={index}
                    >
                      <span>{nationality.title}</span>
                    </CustomItem2>
                  );
                }
              }
            })}
          </CustomDropdown2>
        ) : (
          <span className={`font-mine-regular -mt-1 text-${oppositeTheme}`}>
            {userInfo && userInfo.nationality && userInfo.nationality.title
              ? userInfo.nationality.title
              : ""}
          </span>
        )}
      </div>
      <div className="col-span-1 row-span-1 flex flex-col">
        <span className="text-gray font-mine-regular">{lang["country"]}</span>
        {canEdit ? (
          <CustomDropdown2
            className="flex-1 font-mine-regular"
            label={
              userInfo && userInfo.country && userInfo.country.title
                ? userInfo.country.title
                : ""
            }
          >
            {countriesList.map((country, index) => {
              if (country && country.title) {
                if (index === 0) {
                  if (index === countriesList.length - 1) {
                    return (
                      <CustomItem2
                        onClick={() => setCountriesIndex(index)}
                        className="rounded-xl"
                        key={index}
                      >
                        <span>{country.title}</span>
                      </CustomItem2>
                    );
                  } else {
                    return (
                      <CustomItem2
                        onClick={() => setCountriesIndex(index)}
                        className="rounded-t-xl"
                        key={index}
                      >
                        <span>{country.title}</span>
                      </CustomItem2>
                    );
                  }
                } else if (index === countriesList.length - 1) {
                  return (
                    <CustomItem2
                      onClick={() => setCountriesIndex(index)}
                      className="rounded-b-xl"
                      key={index}
                    >
                      <span>{country.title}</span>
                    </CustomItem2>
                  );
                } else {
                  return (
                    <CustomItem2
                      onClick={() => setCountriesIndex(index)}
                      key={index}
                    >
                      <span>{country.title}</span>
                    </CustomItem2>
                  );
                }
              }
            })}
          </CustomDropdown2>
        ) : (
          <span className={`font-mine-regular -mt-1 text-${oppositeTheme}`}>
            {userInfo && userInfo.country && userInfo.country.title
              ? userInfo.country.title
              : ""}
          </span>
        )}
      </div>
      <div className="col-span-1 row-span-1 flex flex-col">
        <span className="text-gray font-mine-regular">{lang["city"]}</span>
        {canEdit ? (
          <CustomDropdown2
            className="flex-1 font-mine-regular"
            label={
              userInfo && userInfo.city && userInfo.city.title
                ? userInfo.city.title
                : ""
            }
          >
            {citiesList.map((city, index) => {
              if (city && city.title) {
                if (index === 0) {
                  if (index === citiesList.length - 1) {
                    return (
                      <CustomItem2
                        onClick={() => setCityIndex(index)}
                        className="rounded-xl"
                        key={index}
                      >
                        <span>{city.title}</span>
                      </CustomItem2>
                    );
                  } else {
                    return (
                      <CustomItem2
                        onClick={() => setCityIndex(index)}
                        className="rounded-t-xl"
                        key={index}
                      >
                        <span>{city.title}</span>
                      </CustomItem2>
                    );
                  }
                } else if (index === citiesList.length - 1) {
                  return (
                    <CustomItem2
                      onClick={() => setCityIndex(index)}
                      className="rounded-b-xl"
                      key={index}
                    >
                      <span>{city.title}</span>
                    </CustomItem2>
                  );
                } else {
                  return (
                    <CustomItem2
                      onClick={() => setCityIndex(index)}
                      key={index}
                    >
                      <span>{city.title}</span>
                    </CustomItem2>
                  );
                }
              }
            })}
          </CustomDropdown2>
        ) : (
          <span className={`font-mine-regular -mt-1 text-${oppositeTheme}`}>
            {userInfo && userInfo.city && userInfo.city.title
              ? userInfo.city.title
              : ""}
          </span>
        )}
      </div>
    </div>
  );
}
