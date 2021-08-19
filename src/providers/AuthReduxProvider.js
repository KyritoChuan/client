import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { updateAuthUser } from "../actions/authActions";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";

export default function AuthReduxProvider(props) {
  const { children } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    CheckUserLogin();
  }, []);

  const CheckUserLogin = () => {
    const accessToken = getAccessTokenApi();

    if (!accessToken) {
      const refreshToken = getRefreshTokenApi();

      if (!refreshToken) {
        logout();
        dispatch(
          updateAuthUser({
            user: null,
            isLoading: false,
          })
        );
      } else {
        refreshAccessTokenApi(refreshToken);
      }
    } else {
      dispatch(
        updateAuthUser({
          user: jwtDecode(accessToken),
          isLoading: false,
        })
      );
    }
  };

  return <>{children}</>;
}
