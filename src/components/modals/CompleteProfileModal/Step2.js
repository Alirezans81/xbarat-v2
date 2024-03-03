import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import {
  useGetCities,
  useGetCountries,
  useGetNationalities,
} from "../../../apis/common/location/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import { useFontState } from "../../../Providers/FontProvider";
import { CustomTooltip } from "../../common/CustomTooltip";

const Note = ({ lang, font }) => {
  return (
    <div
      className={`flex flex-col gap-y-5 text-gray font-${font}-regular w-72 px-2 pt-1.5 pb-0.5`}
    >
      <span>{"•	" + lang["complete-profile-modal-step2-note-1st"] + "."}</span>
      <span>{"•	" + lang["complete-profile-modal-step2-note-2nd"] + "."}</span>
    </div>
  );
};

export default function Step2({ setFieldValue }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

  const [nationalities, setNationalities] = useState([]);
  const [selectedNationalityIndex, setSelectedNationalityIndex] = useState(-1);
  const [countries, setCountries] = useState([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(-1);
  const [cities, setCities] = useState([]);
  const [selectedCityIndex, setSelectedCityIndex] = useState(-1);

  useEffect(() => {
    if (
      selectedNationalityIndex >= 0 &&
      nationalities[selectedNationalityIndex].url
    ) {
      setFieldValue("nationality", nationalities[selectedNationalityIndex].url);
    }
  }, [selectedNationalityIndex]);
  useEffect(() => {
    if (selectedCountryIndex >= 0 && countries[selectedCountryIndex].url) {
      setFieldValue("country", countries[selectedCountryIndex].url);
    }
  }, [selectedCountryIndex]);
  useEffect(() => {
    if (selectedCityIndex >= 0 && cities[selectedCityIndex].url) {
      setFieldValue("city", cities[selectedCityIndex].url);
    }
  }, [selectedCityIndex]);

  const { getNationalities, isLoading: nationalityIsloading } =
    useGetNationalities();
  const { getCountries, isLoading: countryIsloading } = useGetCountries();
  const { getCities, isLoading: cityIsloading } = useGetCities();

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  useEffect(
    () => setIsLoadingSplashScreen(nationalityIsloading),
    [nationalityIsloading]
  );
  useEffect(
    () => setIsLoadingSplashScreen(countryIsloading),
    [countryIsloading]
  );
  useEffect(() => setIsLoadingSplashScreen(cityIsloading), [cityIsloading]);

  useEffect(() => {
    getNationalities(setNationalities, () => getCountries(setCountries));
  }, []);
  useEffect(() => {
    if (countries[selectedCountryIndex]) {
      setSelectedCityIndex(-1);
      getCities({ country: countries[selectedCountryIndex].slug }, setCities);
    }
  }, [selectedCountryIndex]);

  return (
    <div className="w-full flex gap-x-10 my-5 relative">
      <div className="flex-1">
        <form className="w-full h-full">
          <div className="flex-1 w-full flex flex-col gap-y-2">
            <span className={`font-${font}-regular text-${oppositeTheme}`}>
              {lang["nationality"]}
            </span>
            <div className="w-full flex">
              <CustomDropdown
                label={
                  selectedNationalityIndex >= 0
                    ? nationalities[selectedNationalityIndex].title
                    : ""
                }
                searchable
              >
                {nationalities.map((nationality, index) => {
                  if (index === 0 && index === nationalities.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-xl"
                        onClick={() => setSelectedNationalityIndex(index)}
                      >
                        {nationality && nationality.title
                          ? nationality.title
                          : "error"}
                      </CustomItem>
                    );
                  } else if (index === 0) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-t-xl"
                        onClick={() => setSelectedNationalityIndex(index)}
                      >
                        {nationality && nationality.title
                          ? nationality.title
                          : "error"}
                      </CustomItem>
                    );
                  } else if (index === nationalities.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-b-xl"
                        onClick={() => setSelectedNationalityIndex(index)}
                      >
                        {nationality && nationality.title
                          ? nationality.title
                          : "error"}
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        key={index}
                        onClick={() => setSelectedNationalityIndex(index)}
                      >
                        {nationality && nationality.title
                          ? nationality.title
                          : "error"}
                      </CustomItem>
                    );
                  }
                })}
              </CustomDropdown>
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
            <span className={`font-${font}-regular text-${oppositeTheme}`}>
              {lang["country"]}
            </span>
            <div className="w-full flex">
              <CustomDropdown
                label={
                  selectedCountryIndex >= 0
                    ? countries[selectedCountryIndex].title
                    : ""
                }
                searchable
              >
                {countries.map((country, index) => {
                  if (index === 0 && index === countries.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-xl"
                        onClick={() => setSelectedCountryIndex(index)}
                      >
                        {country && country.title ? country.title : "error"}
                      </CustomItem>
                    );
                  } else if (index === 0) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-t-xl"
                        onClick={() => setSelectedCountryIndex(index)}
                      >
                        {country && country.title ? country.title : "error"}
                      </CustomItem>
                    );
                  } else if (index === countries.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-b-xl"
                        onClick={() => setSelectedCountryIndex(index)}
                      >
                        {country && country.title ? country.title : "error"}
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        key={index}
                        onClick={() => setSelectedCountryIndex(index)}
                      >
                        {country && country.title ? country.title : "error"}
                      </CustomItem>
                    );
                  }
                })}
              </CustomDropdown>
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
            <span className={`font-${font}-regular text-${oppositeTheme}`}>
              {lang["city"]}
            </span>
            <div className="w-full flex">
              <CustomDropdown
                label={
                  selectedCityIndex >= 0 ? cities[selectedCityIndex].title : ""
                }
                searchable
              >
                {cities.map((city, index) => {
                  if (index === 0 && index === cities.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-xl"
                        onClick={() => setSelectedCityIndex(index)}
                      >
                        {city && city.title ? city.title : "error"}
                      </CustomItem>
                    );
                  } else if (index === 0) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-t-xl"
                        onClick={() => setSelectedCityIndex(index)}
                      >
                        {city && city.title ? city.title : "error"}
                      </CustomItem>
                    );
                  } else if (index === cities.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-b-xl"
                        onClick={() => setSelectedCityIndex(index)}
                      >
                        {city && city.title ? city.title : "error"}
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        key={index}
                        onClick={() => setSelectedCityIndex(index)}
                      >
                        {city && city.title ? city.title : "error"}
                      </CustomItem>
                    );
                  }
                })}
              </CustomDropdown>
            </div>
          </div>
        </form>
      </div>

      <div
        className={`flex-1 hidden md:flex flex-col py-5 px-7 bg-${theme}-glass rounded-2xl`}
      >
        <div className="flex items-center gap-x-2">
          <img
            className="w-6 h-6"
            src={require(`../../../Images/common/info-${oppositeTheme}.png`)}
            alt="info"
          />
          <span className={`font-${font}-bold text-${oppositeTheme} pt-1.5`}>
            {lang["note"]}
          </span>
        </div>
        <div
          className={`mt-4 flex flex-col gap-y-3 text-gray font-${font}-regular w-64`}
        >
          <span>{lang["complete-profile-modal-step2-note-1st"] + "."}</span>
          <span>{lang["complete-profile-modal-step2-note-2nd"] + "."}</span>
        </div>
      </div>

      <div className="absolute md:hidden right-0 top-0">
        <CustomTooltip
          style={oppositeTheme}
          content={<Note lang={lang} font={font} theme={theme} />}
          placement="bottom"
        >
          <div className="flex items-center gap-x-1.5">
            <img
              className="w-6 h-6"
              src={require(`../../../Images/common/info-${oppositeTheme}.png`)}
            />
            <span className={`font-${font}-bold text-${oppositeTheme} -mb-1.5`}>
              {lang["note"]}
            </span>
          </div>
        </CustomTooltip>
      </div>
    </div>
  );
}
