import { useWalletState } from "../Providers/WalletProvider";

const useCheckCompletedProfile = () => {
  const wallet = useWalletState();

  const checkCompletedProfile = () => {
    if (wallet && wallet.walletTanks && wallet.walletTanks.length) return true;
    else return false;
  };

  return checkCompletedProfile;
};

export { useCheckCompletedProfile };
