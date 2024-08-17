export default function api() {
  const apiDomain = process.env.REACT_APP_API_DOMAIN;

  return {
    "sign-up": `${apiDomain}api/user/signup/`,
    "verify-email": `${apiDomain}api/user/verify-email/`,
    "log-in": `${apiDomain}api/user/login/`,
    "log-out": `${apiDomain}api/user/logout/`,
    "patch-profile": `${apiDomain}api/user/`,
    nationality: `${apiDomain}api/location/nationality/`,
    country: `${apiDomain}api/location/country/`,
    city: `${apiDomain}api/location/city/`,
    currency: `${apiDomain}api/currency/`,
    "currency-pair": `${apiDomain}api/currency-pair/`,
    wallet: `${apiDomain}api/wallet/`,
    "wallet-asset": `${apiDomain}api/wallet-asset/`,
    "wallet-tank": `${apiDomain}api/wallet-tank/`,
    "wallet-tank-type": `${apiDomain}api/wallet-tank-type/`,
    branch: `${apiDomain}api/branch/`,
    deposit: `${apiDomain}api/order/deposit/`,
    withdrawal: `${apiDomain}api/order/withdrawal/`,
    transfer: `${apiDomain}api/order/transfer/`,
    exchange: `${apiDomain}api/order/exchange/`,
    "pending-requests": `${apiDomain}api/wallet-pending-request/`,
    "watch-list": `${apiDomain}api/index/watch-list/`,
    "table-exchange": `${apiDomain}api/index/table-exchange/`,
    "pending-exchange": `${apiDomain}api/index/pending-exchange/`,
    status: `${apiDomain}api/status/`,
    "other-exchanges-rate": `${apiDomain}api/exchange-rate/`,
    locale: `${apiDomain}api/locale/`,
    "check-email": `${apiDomain}api/user/forget-password-check/`,
    "send-email": `${apiDomain}api/user/forget-password-send-mail/`,
    "forget-password-send-mail": `${apiDomain}api/user/forget-password-send-mail/`,
    "forget-password-check": `${apiDomain}api/user/forget-password-check/`,
    "forget-password-set": `${apiDomain}api/user/forget-password-set/`,
    "top-5-report": `${apiDomain}api/report/`,
    "change-password": `${apiDomain}api/user/change-password/`,
    news: `${apiDomain}api/news/`,
    "ticket-category": `${apiDomain}api/ticket-category/`,
    ticket: `${apiDomain}api/ticket/`,
    "ticket-detail": `${apiDomain}api/ticket-detail/`,
  };
}
