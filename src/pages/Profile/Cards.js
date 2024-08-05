import React, { useEffect, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useCurrenciesState } from "../../Providers/CurrenciesProvider";
import { useGetWalletTankByCurrency } from "../../hooks/useWalletFilter";
import CurrencyCard from "../../components/pages/layout/Cards/CurrencyCard";
import CustomSlider from "../../components/common/CustomSlider";
import WalletTankCard from "../../components/pages/layout/Cards/WalletTankCard";
import { useModalDataSetState } from "../../Providers/ModalDataProvider";
import EditAddCardModal from "../../components/modals/EditAddCardModal";

export default function Cards() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setModalData = useModalDataSetState();

  const currencies = useCurrenciesState();
  const getWalletTankByCurrency = useGetWalletTankByCurrency();

  const getWalletTankQuantityByCurrency = (currencyUrl) => {
    const tanks = getWalletTankByCurrency(currencyUrl);
    return tanks ? tanks.length : 0;
  };

  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);
  const [walletTankCards, setWalletTankCards] = useState([]);
  useEffect(() => {
    currencies && currencies[0] && setSelectedCurrencyIndex(0);
  }, []);

  useEffect(() => {
    if (selectedCurrencyIndex !== -1) {
      const tanks = getWalletTankByCurrency(
        currencies[selectedCurrencyIndex].url
      );
      setWalletTankCards(tanks);
    }
  }, [selectedCurrencyIndex]);

  const addWalletTankCard = (data) => {
    setWalletTankCards([...walletTankCards, data]);
  };

  const replaceWalletTankCard = (data) => {
    const temp = walletTankCards.map((e) => {
      if (e.url === data.url) return data;
      else return e;
    });
    setWalletTankCards(temp);
  };

  const currencyListShowType = window.innerWidth >= 1024 ? "col" : "row";
  const walletTankListShowType = window.innerWidth >= 1024 ? "card" : "slider";

  const getCurrencyQuantityOfCards = () => {
    if (window.innerWidth >= 1280) {
      return 4;
    } else if (window.innerWidth >= 1024) {
      return 4;
    } else if (window.innerWidth >= 768) {
      return 3;
    } else if (window.innerWidth >= 512) {
      return 2;
    } else {
      return 1;
    }
  };
  const getWalletTankQuantityOfCards = () => {
    if (window.innerWidth >= 1280) {
      return 3;
    } else if (window.innerWidth >= 1024) {
      return 2;
    } else if (window.innerWidth >= 768) {
      return 2;
    } else if (window.innerWidth >= 512) {
      return 1;
    } else {
      return 1;
    }
  };

  const [deleteCardCount, setDeletCardCount] = useState(0);
  useEffect(() => {
    setDeletCardCount(0);
  }, [selectedCurrencyIndex]);

  const openEditAddCardModal = (type, data) => {
    if (type === "edit") {
      setModalData({
        title: lang["edit-card"],
        children: (
          <EditAddCardModal
            data={data}
            currency={currencies[selectedCurrencyIndex]}
            replaceWalletTankCard={replaceWalletTankCard}
          />
        ),
        canClose: true,
        isOpen: true,
      });
    } else if (type === "add") {
      setModalData({
        title: lang["add-card"],
        children: (
          <EditAddCardModal
            currency={currencies[selectedCurrencyIndex]}
            addWalletTankCard={addWalletTankCard}
          />
        ),
        canClose: true,
        isOpen: true,
      });
    }
  };

  return (
    <div className="absolute w-full h-full overflow-y-auto pl-8 pr-8 md:pl-0 md:pr-6">
      <div className="w-full h-full -mt-5 grid grid-cols-11 grid-rows-5 md:gap-x-10 gap-y-7 pb-10 pt-4">
        <div
          className={`bg-${theme} col-span-11 lg:col-span-3 row-span-2 lg:row-span-5 rounded-3xl md:rounded-r-none lg:rounded-3xl px-6 py-5`}
        >
          <div className="w-full h-full flex flex-col">
            <span
              className={`text-${oppositeTheme} font-${font}-bold text-2xl pt-2`}
            >
              {lang["currency"]}
            </span>
            {currencyListShowType === "col" ? (
              <div className="w-full flex-1 md:overflow-y-auto flex flex-col gap-y-4 mt-4">
                {currencies &&
                  currencies.map((currency, index) => (
                    <CurrencyCard
                      key={index}
                      onClick={() => setSelectedCurrencyIndex(index)}
                      title={
                        currency && currency.abbreviation
                          ? currency.abbreviation
                          : "error"
                      }
                      tankQuantity={
                        selectedCurrencyIndex === index
                          ? getWalletTankQuantityByCurrency(currency.url) -
                            deleteCardCount
                          : getWalletTankQuantityByCurrency(currency.url)
                      }
                      isSelected={selectedCurrencyIndex === index}
                    />
                  ))}
              </div>
            ) : (
              <div className="w-full px-5 mt-5">
                <CustomSlider
                  slidesToScroll={getCurrencyQuantityOfCards()}
                  slidesToShow={getCurrencyQuantityOfCards()}
                >
                  {currencies &&
                    currencies.map((currency, index) => (
                      <div key={index} className="px-3">
                        <CurrencyCard
                          onClick={() => setSelectedCurrencyIndex(index)}
                          title={
                            currency && currency.abbreviation
                              ? currency.abbreviation
                              : "error"
                          }
                          tankQuantity={getWalletTankQuantityByCurrency(
                            currency.url
                          )}
                          isSelected={selectedCurrencyIndex === index}
                        />
                      </div>
                    ))}
                </CustomSlider>
              </div>
            )}
          </div>
        </div>
        <div
          className={`bg-${theme} col-span-11 lg:col-span-8 row-span-3 lg:row-span-5 rounded-3xl md:rounded-r-none px-6 py-5`}
        >
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between items-center">
              <span
                className={`text-${oppositeTheme} font-${font}-bold text-2xl  pt-2`}
              >
                {lang["cards-profile"]}
              </span>
              <button
                type="button"
                onClick={() => openEditAddCardModal("add")}
                className={`text-light bg-blue font-${font}-regular px-5 pt-1.5 pb-0.5 rounded-full`}
              >
                {"+ " + lang["add"]}
              </button>
            </div>

            {walletTankCards.length !== 0 ? (
              walletTankListShowType === "card" ? (
                <div className="flex-1 overflow-y-auto flex flex-row flex-wrap gap-4 mt-4">
                  {walletTankCards.map((walletTankCard, index) => (
                    <WalletTankCard
                      key={index}
                      data={walletTankCard}
                      selectedCurrencyIndex={selectedCurrencyIndex}
                      setDeletCardCount={setDeletCardCount}
                      openEditAddCardModal={openEditAddCardModal}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex-1 mt-4 md:mt-2.5 px-3">
                  <CustomSlider
                    slidesToScroll={getWalletTankQuantityOfCards()}
                    slidesToShow={getWalletTankQuantityOfCards()}
                  >
                    {walletTankCards.map((walletTankCard, index) => (
                      <div key={index} className="px-1">
                        <WalletTankCard
                          data={walletTankCard}
                          selectedCurrencyIndex={selectedCurrencyIndex}
                          setDeletCardCount={setDeletCardCount}
                          openEditAddCardModal={openEditAddCardModal}
                        />
                      </div>
                    ))}
                  </CustomSlider>
                </div>
              )
            ) : (
              <div className="flex-1 overflow-y-auto flex justify-center items-center">
                <span
                  className={`text-${oppositeTheme} font-${font}-thin text-4xl`}
                >
                  {lang["no-data"]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
