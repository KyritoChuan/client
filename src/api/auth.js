import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";
import axios from "axios";
//Obtiene el accessToken, siempre y cuando no sea menor al DateTime.Now
export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === "null" || accessToken === "undefined") {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}

//Obtiene el refreshToken, siempre y cuando no sea menor al DateTime.Now
export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (
    !refreshToken ||
    refreshToken === "null" ||
    refreshToken === "undefined"
  ) {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

//Refresca el accessToken, por la fecha del refresh cuando el accessToken se ha vencido.
export function refreshAccessTokenApi(refreshToken) {
  const url = `${basePath}/${apiVersion}/refresh-access-token`;
  const bodyObj = { refreshToken: refreshToken };

  return axios.post(url, bodyObj).then((response) => {
    if (response.status === 404) {
      logout();
    } else if (response.status === 200) {
      const { accessToken, refreshToken } = response;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    } else {
      return null;
    }
  });
}

//Limpia el localStorage de las credenciales ACCESS y REFRESH
export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

//Si la fecha de expiración del token es menor a la fecha de hoy, significa que expiró y devolverá TRUE.
function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return now > exp;
}
