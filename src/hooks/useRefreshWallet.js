import { useTokenState } from "../Providers/TokenProvider";
import { useUserState } from "../Providers/UserProvider";
import { useGetWalletData } from "../Providers/WalletProvider";

const useRefreshWallet = () => {
  const user = useUserState();
  const getWalletData = useGetWalletData();
  const token = useTokenState();

  const refreshWallet = () => {
    if (user && user.username) {
      getWalletData(user.username, token);
    }
  };

  return refreshWallet;
};

export { useRefreshWallet };
