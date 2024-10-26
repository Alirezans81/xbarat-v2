import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeProvider } from "./Providers/ThemeProvider";
import { DirectionProvider } from "./Providers/DirectionProvider";
import { LanguageProvider } from "./Providers/LanguageProvider";
import { UserProvider } from "./Providers/UserProvider";
import { IsPagesModalOpenProvider } from "./Providers/IsPagesModalOpenProvider";
import { TokenProvider } from "./Providers/TokenProvider";
import { MyQueryClientProvider } from "./Providers/QueryClientProvider";
import { WalletProvider } from "./Providers/WalletProvider";
import { IsLoadingSplashScreenProvider } from "./Providers/IsLoadingSplashScreenProvider";
import "react-image-crop/dist/ReactCrop.css";
import { ToastDataProvider } from "./Providers/ToastDataProvider";
import { ModalDataProvider } from "./Providers/ModalDataProvider";
import { CropImageModalProvider } from "./Providers/CropImageModalProvider";
import { StatusesProvider } from "./Providers/StatusesProvider";
import { CurrenciesProvider } from "./Providers/CurrenciesProvider";
import { CurrencyPairsProvider } from "./Providers/CurrencyPairsProvider";
import { LanguageListProvider } from "./Providers/LanguageListProvider";
import { FontProvider } from "./Providers/FontProvider";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyQueryClientProvider>
    <IsPagesModalOpenProvider>
      <LanguageListProvider>
        <LanguageProvider>
          <FontProvider>
            <ThemeProvider>
              <DirectionProvider>
                <ModalDataProvider>
                  <CropImageModalProvider>
                    <ToastDataProvider>
                      <IsLoadingSplashScreenProvider>
                        <StatusesProvider>
                          <CurrenciesProvider>
                            <CurrencyPairsProvider>
                              <TokenProvider>
                                <WalletProvider>
                                  <UserProvider>
                                    <App />
                                  </UserProvider>
                                </WalletProvider>
                              </TokenProvider>
                            </CurrencyPairsProvider>
                          </CurrenciesProvider>
                        </StatusesProvider>
                      </IsLoadingSplashScreenProvider>
                    </ToastDataProvider>
                  </CropImageModalProvider>
                </ModalDataProvider>
              </DirectionProvider>
            </ThemeProvider>
          </FontProvider>
        </LanguageProvider>
      </LanguageListProvider>
    </IsPagesModalOpenProvider>
  </MyQueryClientProvider>
);
