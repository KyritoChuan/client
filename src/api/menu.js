import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getMenuApi() {
  const url = `${basePath}/${apiVersion}/get-menus`;

  return axios
    .get(url)
    .then((response) => {
      return response;
      //return response.data;
    })
    .catch((err) => {
      return err.response;
    });
}

export function updateMenuApi(token, menuId, data) {
  const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;

  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .put(url, JSON.stringify(data), config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}

export function activateMenuApi(token, menuId, status) {
  const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;

  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .put(url, JSON.stringify({ active: status }), config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}

export function addMenuApi(token, menu) {
  const url = `${basePath}/${apiVersion}/add-menu`;

  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .post(url, JSON.stringify(menu), config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}

export function deleteMenuApi(token, menuId) {
  const url = `${basePath}/${apiVersion}/delete-menu/${menuId}`;

  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .delete(url, config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}
