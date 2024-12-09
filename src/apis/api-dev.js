export default function api() {
  const devApiDomain = process.env.REACT_APP_DEV_API_DOMAIN;

  return {
    "sign-up": `${devApiDomain}api/user/signup/`,
    "verify-email": `${devApiDomain}api/user/verify-email/`,
    "log-in": `${devApiDomain}api/user/login/`,
    "log-out": `${devApiDomain}api/user/logout/`,
    "patch-profile": `${devApiDomain}api/user/`,
    nationality: `${devApiDomain}api/location/nationality/`,
    country: `${devApiDomain}api/location/country/`,
    city: `${devApiDomain}api/location/city/`,
    currency: `${devApiDomain}api/currency/`,
    "currency-pair": `${devApiDomain}api/currency-pair/`,
    wallet: `${devApiDomain}api/wallet/`,
    "wallet-asset": `${devApiDomain}api/wallet-asset/`,
    "wallet-tank": `${devApiDomain}api/wallet-tank/`,
    "wallet-tank-detail": `${devApiDomain}api/wallet-tank-detail/`,
    "wallet-tank-type": `${devApiDomain}api/wallet-tank-type/`,
    branch: `${devApiDomain}api/branch/`,
    deposit: `${devApiDomain}api/order/deposit/`,
    withdrawal: `${devApiDomain}api/order/withdrawal/`,
    transfer: `${devApiDomain}api/order/transfer/`,
    exchange: `${devApiDomain}api/order/exchange/`,
    "pending-requests": `${devApiDomain}api/wallet-pending-request/`,
    "watch-list": `${devApiDomain}api/index/watch-list/`,
    "table-exchange": `${devApiDomain}api/index/table-exchange/`,
    "pending-exchange": `${devApiDomain}api/index/pending-exchange/`,
    status: `${devApiDomain}api/status/`,
    "other-exchanges-rate": `${devApiDomain}api/exchange-rate/`,
    locale: `${devApiDomain}api/locale/`,
    notify: `${devApiDomain}api/notify/`,
    "check-email": `${devApiDomain}api/user/forget-password-check/`,
    "send-email": `${devApiDomain}api/user/forget-password-send-mail/`,
    "forget-password-send-mail": `${devApiDomain}api/user/forget-password-send-mail/`,
    "forget-password-check": `${devApiDomain}api/user/forget-password-check/`,
    "forget-password-set": `${devApiDomain}api/user/forget-password-set/`,
    "top-5-report": `${devApiDomain}api/report/`,
    "change-password": `${devApiDomain}api/user/change-password/`,
    news: `${devApiDomain}api/news/`,
    "ticket-category": `${devApiDomain}api/ticket-category/`,
    ticket: `${devApiDomain}api/ticket/`,
    "ticket-detail": `${devApiDomain}api/ticket-detail/`,
    "giftcard-site": `${devApiDomain}api/giftcard-site/`,
  };
}
