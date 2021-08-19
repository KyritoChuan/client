import React, { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";

//Crea el contexto a usar de react para el login.
export const AuthContext = createContext();

//Exporta la función y envuelve toda la aplicación por el AuthContext. Esto es usado para tener autenticación de login con el USER.
export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

//Comprueba si el token del usuario está vencido, si lo está lo desloguea y modifica el const USER
function checkUserLogin(setUser) {
  const accessToken = getAccessTokenApi();

  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();

    if (!refreshToken) {
      logout();
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      refreshAccessTokenApi(refreshToken);
    }
  } else {
    setUser({
      user: jwtDecode(accessToken),
      isLoading: false,
    });
  }
}
