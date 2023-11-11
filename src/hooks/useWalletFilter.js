import { useWalletState } from "../Providers/WalletProvider";

const useGetWalletTankByCurrency = () => {
  const wallet = useWalletState();

  const getWalletTankByCurrency = (currencyUrl) => {
    if (currencyUrl) {
      let walletAssetsTemp = [];
      wallet.walletAssets.map(
        (walletAsset) =>
          walletAsset &&
          walletAsset.currency &&
          walletAsset.currency === currencyUrl &&
          walletAssetsTemp.push(walletAsset)
      );

      let walletTanksTemp = [];
      for (let i = 0; i < walletAssetsTemp.length; i++) {
        for (let j = 0; j < wallet.walletTanks.length; j++) {
          if (walletAssetsTemp[i].url === wallet.walletTanks[j].wallet_asset) {
            walletTanksTemp.push(wallet.walletTanks[j]);
            break;
          }
        }
      }

      return walletTanksTemp;
    }

    return [];
  };

  return getWalletTankByCurrency;
};

export { useGetWalletTankByCurrency };
