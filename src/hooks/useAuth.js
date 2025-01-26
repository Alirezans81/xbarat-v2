import { useTokenSetState, useTokenState } from "../Providers/TokenProvider";
import { useUserSetState } from "../Providers/UserProvider";
import { useRefreshAccessToken } from "../apis/common/auth/hooks";

const logout = (setToken, setUser) => {
  setToken && setToken(null);
  setUser && setUser(null);
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("userInfo");
  window.localStorage.removeItem("statuses");
  window.localStorage.removeItem("linksShown");
};
const useLogout = () => {
  const setToken = useTokenSetState();
  const setUser = useUserSetState();

  return () => logout(setToken, setUser);
};

const checkLoggedIn = (setToken, setUser) => {
  const token = window.localStorage.getItem("authToken");
  const user = window.localStorage.getItem("userInfo");

  if (token && user) {
    setToken(JSON.parse(token));
    setUser(JSON.parse(user));
  } else {
    logout(setToken, setUser);
  }
};
const useCheckLoggedIn = () => {
  const setToken = useTokenSetState();
  const setUser = useUserSetState();

  return () => checkLoggedIn(setToken, setUser);
};

const checkTokenExpired = (
  token,
  refreshAccessToken,
  navigateToLogin,
  customFunction
) => {
  const current = Math.floor(Date.now() / 1000);

  if (token) {
    if (token.exp_refresh - current <= 0) {
      logout();
      navigateToLogin();
    } else {
      if (token.exp_access - current <= 0) {
        refreshAccessToken(customFunction);
      } else {
        customFunction && customFunction();
      }
    }
  }
};
const useCheckTokenExpired = () => {
  const token = useTokenState();
  const { refreshAccessToken } = useRefreshAccessToken();
  const navigateToLogin = () => {
    window.location = "/login";
  };

  return (customFunction) =>
    checkTokenExpired(
      token,
      refreshAccessToken,
      navigateToLogin,
      customFunction
    );
};

export { useLogout, useCheckLoggedIn, useCheckTokenExpired };
