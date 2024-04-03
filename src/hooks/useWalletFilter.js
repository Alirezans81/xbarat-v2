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
          if (
            walletAssetsTemp[j].url === wallet.walletTanks[i].wallet_asset &&
            !wallet.walletTanks[i].is_deleted
          ) {
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

const useGetWalletAssetByCurrency = () => {
  const wallet = useWalletState();

  const getWalletAssetByCurrency = (currencyUrl) => {
    if (currencyUrl) {
      const { walletAssets } = wallet;
      const walletAsset = walletAssets.find(
        (walletAsset) => walletAsset.currency === currencyUrl
      );

      return walletAsset;
    } else return null;
  };

  return getWalletAssetByCurrency;
};

export { useGetWalletTankByCurrency, useGetWalletAssetByCurrency };
