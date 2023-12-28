import { useUserState } from "../Providers/UserProvider";
import { useGetWalletData } from "../Providers/WalletProvider";

const useRefreshWallet = () => {
  const user = useUserState();
  const getWalletData = useGetWalletData();

  const refreshWallet = () => {
    if (user && user.username) {
      getWalletData(user.username);
    }
  };

  return refreshWallet;
};

export { useRefreshWallet };
