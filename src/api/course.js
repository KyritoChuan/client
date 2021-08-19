import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getCoursesApi() {
  const url = `${basePath}/${apiVersion}/get-courses`;

  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}

export function getCourseDataUdemyApi(id) {
  const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}/`;
  const coursesParams =
    "?fields[course]=title,headline,url,price,image_480x270";
  const url = baseUrl + coursesParams;

  return axios
    .get(url)
    .then((response) => {
      return {
        code: response.status,
        data: response.data,
        message: response.statusText,
      };
    })
    .catch((err) => {
      return err.response;
    });
}

export function addCourseApi(token, course) {
  const url = `${basePath}/${apiVersion}/add-course`;

  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .post(url, course, config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}

export function updateCourseApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/update-course/${id}`;

  debugger;
  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .put(url, data, config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
}

export function deleteCourseApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;

  let config = {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  };

  return axios
    .delete(url, config)
    .then((response) => {
      debugger;
      return response;
    })
    .catch((err) => {
      debugger;
      return err.response;
    });
}
