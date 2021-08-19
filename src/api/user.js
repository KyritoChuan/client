import { basePath, apiVersion } from "./config";
import axios from "axios";
//import { Result } from "antd";

//Llama a la API para crear un usuario nuevo.
export function signUpApi(data) {
  const url = `${basePath}/${apiVersion}/sign-up`;
  return axios
    .post(url, data)
    .then((response) => {
      if (response.data.user) {
        return { ok: true, message: "Usuario creado correctamente." };
        //return { ok: true, message: response.data };
      }
      return { ok: false, message: response.data.message };
      //return response.data;
    })
    .catch((err) => {
      return { ok: false, message: err.response.data.message };
    });
}

//Llama a la API para loguear un usuario.
export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/sign-in`;

  return axios
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}

export function getUsersApi(token) {
  const url = `${basePath}/${apiVersion}/users`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((Result) => {
      return Result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getUsersActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((Result) => {
      return Result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .put(url, formData, config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}

export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
  //return axios
  //  .get(url)
  //  .then((response) => {
  //    return response.data;
  //  })
  //  .catch((err) => {
  //    return err.message;
  //  });
}

export function updateUserApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;

  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .put(url, JSON.stringify(user), config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}

export function activateUserApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-user/${userId}`;

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

export function deleteUserApi(token, userId) {
  const url = `${basePath}/${apiVersion}/delete-user/${userId}`;

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

export function signUpAdminApi(token, data) {
  const url = `${basePath}/${apiVersion}/sign-up-admin`;

  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .post(url, data, config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}
