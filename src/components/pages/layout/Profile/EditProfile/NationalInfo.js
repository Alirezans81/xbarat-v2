import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import EditButton from "./common/EditButton";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import {
  CustomDropdown2,
  CustomItem2,
} from "../../../../common/CustomDropdown2";
import {
  useGetCities,
  useGetCountries,
  useGetNationality,
  useGetCountry,
  useGetCity,
} from "../../../../../apis/common/location/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import { useUpdateNationalInfo } from "../../../../../apis/pages/Profile/hooks";
import { useUserSetState } from "../../../../../Providers/UserProvider";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function NationalInfo({ userInfo }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [canEdit, setCanEdit] = useState();
  const lang = useLanguageState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const setUser = useUserSetState();

  const [nationality, setNationality] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();

  const { getNationality, isLoading: getNationalityIsLoading } =
    useGetNationality();
  useEffect(
    () => setIsLoadingSplashScreen(getNationalityIsLoading),
    [getNationalityIsLoading]
  );
  const { getCountry, isLoading: getCountryIsLoading } = useGetCountry();
  useEffect(
    () => setIsLoadingSplashScreen(getCountryIsLoading),
    [getCountryIsLoading]
  );
  const { getCity, isLoading: getCityIsLoading } = useGetCity();
  useEffect(
    () => setIsLoadingSplashScreen(getCityIsLoading),
    [getCityIsLoading]
  );

  useEffect(() => {
    userInfo.nationality &&
      getNationality(userInfo.nationality, setNationality);

    userInfo.country && getCountry(userInfo.country, setCountry);
    userInfo.city && getCity(userInfo.city, setCity);
  }, []);

  const { getCountries, isLoading: getCountriesIsLoading } = useGetCountries();
  useEffect(
    () => setIsLoadingSplashScreen(getCountriesIsLoading),
    [getCountriesIsLoading]
  );
  const { getCities, isLoading: getCitiesIsLoading } = useGetCities();
  useEffect(
    () => setIsLoadingSplashScreen(getCitiesIsLoading),
    [getCitiesIsLoading]
  );

  const { updateNationalInfo, isLoading } = useUpdateNationalInfo();
  useEffect(() => setIsLoadingSplashScreen(isLoading), [isLoading]);

  const [countriesList, setCountriesList] = useState([]);
  const [countriesIndex, setCountriesIndex] = useState(-1);
  const [citiesList, setCitiesList] = useState([]);
  const [cityIndex, setCityIndex] = useState(-1);

  useEffect(() => {
    getCountries(setCountriesList);
  }, []);
  useEffect(() => {
    countriesIndex >= 0 &&
      countriesList[countriesIndex].slug &&
      getCities({ country: countriesList[countriesIndex].slug }, setCitiesList);
  }, [countriesIndex]);

  useEffect(() => {
    if (!canEdit) {
      setCountriesIndex(-1);
      setCityIndex(-1);
    }
  }, [canEdit]);

  return (
    <div
      className={`bg-${theme}-back rounded-3xl w-full flex-1 relative grid grid-cols-2 grid-rows-2 px-5 py-4`}
    >
      <EditButton
        canEdit={canEdit}
        setCanEdit={setCanEdit}
        customFunction={() => {
          if (countriesIndex >= 0 && cityIndex >= 0) {
            const params = {
              country: countriesList[countriesIndex].url,
              city: citiesList[cityIndex].url,
            };
            updateNationalInfo(params, (newUserData) => {
              setUser(newUserData);
              if (newUserData && newUserData.country && newUserData.city) {
                getCountry(newUserData.country, setCountry);
                getCity(newUserData.city, setCity);
              }
              setCanEdit(false);
            });
          }
        }}
      />
      <div className="col-span-2 row-span-1 flex flex-col">
        <span className={`text-gray font-${font}-regular`}>
          {lang["nationality"]}
        </span>
        <span className={`font-${font}-regular -mt-1 text-${oppositeTheme}`}>
          {nationality && nationality.title ? nationality.title : ""}
        </span>
      </div>
      <div
        className={
          canEdit
            ? "col-span-1 row-span-1 flex flex-col -mt-2.5"
            : "col-span-1 row-span-1 flex flex-col"
        }
      >
        <span className={`text-gray font-${font}-regular`}>
          {lang["country"]}
        </span>
        {canEdit ? (
          <CustomDropdown2
            className={`flex-1 font-${font}-regular`}
            label={
              countriesIndex > -1
                ? countriesList[countriesIndex].title
                : userInfo && userInfo.country && userInfo.country.title
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
          <span className={`font-${font}-regular -mt-1 text-${oppositeTheme}`}>
            {country && country.title ? country.title : ""}
          </span>
        )}
      </div>
      <div
        className={
          canEdit
            ? "col-span-1 row-span-1 flex flex-col -mt-2.5"
            : "col-span-1 row-span-1 flex flex-col"
        }
      >
        <span className={`text-gray font-${font}-regular`}>{lang["city"]}</span>
        {canEdit ? (
          <CustomDropdown2
            className={`flex-1 font-${font}-regular`}
            label={
              cityIndex > -1
                ? citiesList[cityIndex].title
                : userInfo && userInfo.city && userInfo.city.title
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
          <span className={`font-${font}-regular -mt-1 text-${oppositeTheme}`}>
            {city && city.title ? city.title : ""}
          </span>
        )}
      </div>
    </div>
  );
}
