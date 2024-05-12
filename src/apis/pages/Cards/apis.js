import axios from "axios";

const api =
  process.env.REACT_APP_MODE === "DEVELOPMENT"
    ? require("../../api-dev.json")
    : require("../../api.json");

const updateWalletTank = (walletTankUrl, params) => {
  const formData = new FormData();

  params.bank_info && formData.append("bank_info", params.bank_info);
  params.account_name && formData.append("account_name", params.account_name);
  params.bank_name && formData.append("bank_name", params.bank_name);
  params.is_favorite !== null &&
    params.is_favorite !== undefined &&
    formData.append("is_favorite", params.is_favorite);
  params.is_active !== null &&
    params.is_active !== undefined &&
    formData.append("is_active", params.is_active);
  params.is_deleted !== null &&
    params.is_deleted !== undefined &&
    formData.append("is_deleted", params.is_deleted);

  return axios.patch(walletTankUrl, formData);
};

export { updateWalletTank };
