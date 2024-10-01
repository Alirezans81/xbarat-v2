import { useUserState } from "../Providers/UserProvider";
import { useWalletState } from "../Providers/WalletProvider";

const useCheckCompletedProfile = () => {
  const wallet = useWalletState();
  const userInfo = useUserState();

  const checkCompletedProfile = () => {
    if (
      userInfo &&
      userInfo.first_name &&
      userInfo.last_name &&
      userInfo.phone &&
      userInfo.address &&
      userInfo.nationality &&
      userInfo.country &&
      (userInfo.city || userInfo.city_str) &&
      userInfo.identity_type &&
      userInfo.identity_code &&
      userInfo.document &&
      wallet &&
      wallet.walletTanks &&
      wallet.walletTanks.length
    )
      return true;
    else return false;
  };

  return checkCompletedProfile;
};

export { useCheckCompletedProfile };
