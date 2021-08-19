import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import {
  modifyListUsersActive,
  modifyListUsersInactive,
} from "../../../actions/userActions";
import { reloadUsers } from "../../../actions/reloadActions";

import "./Users.scss";

export default function Users() {
  const token = getAccessTokenApi();

  // Inicializacion del dispatch y ejecución de las acciones.
  const reload = useSelector((state) => state.reloads.reloadUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsersActiveApi(token, true).then((response) => {
      dispatch(modifyListUsersActive(response.users));
    });
    getUsersActiveApi(token, false).then((response) => {
      dispatch(modifyListUsersInactive(response.users));
    });
    dispatch(reloadUsers(false));
    // eslint-disable-next-line
  }, [token, reload]);

  return (
    <div>
      <ListUsers />
    </div>
  );
}
