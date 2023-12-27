import { useWalletState } from "../Providers/WalletProvider";

const useGetWalletTankByCurrency = () => {
  const wallet = useWalletState();

  const getWalletTankByCurrency = (currencyUrl) => {
    if (currencyUrl) {
      let walletAssetsTemp = [];
      wallet.walletAssets.map((walletAsset) => {
        if (
          walletAsset &&
          walletAsset.currency &&
          walletAsset.currency === currencyUrl
        ) {
          walletAssetsTemp.push(walletAsset);
        }
      });

      let walletTanksTemp = [];
      for (let i = 0; i < wallet.walletTanks.length; i++) {
        for (let j = 0; j < walletAssetsTemp.length; j++) {
          if (walletAssetsTemp[j].url === wallet.walletTanks[i].wallet_asset) {
            walletTanksTemp.push(wallet.walletTanks[i]);
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
