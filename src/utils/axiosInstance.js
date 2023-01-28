import axios from "axios";
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";

let baseURL= "http://localhost:4000";
if(process.env.NODE_ENV==="production")
  baseURL= process.env.REACT_APP_SERVER_BASE_URL

const axiosinstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosinstance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${getItem(
      ACCESS_TOKEN_LOCAL_STORAGE_KEY
    )}`;
    console.log(config);
    return config;
  },
  function (error) {
    console.log(error);
  }
);

axiosinstance.interceptors.response.use(async function (response) {
  console.log(response);

  const originalRequest = response.config;

  if (response.data.status === "ok") return response;

  //refresh token expired
  if (response.data.statusCode === 401 && originalRequest.url === "/api/refresh") {
    removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    window.location.replace("/login");
    return Promise.reject(response.data.message);
  }

  //access token expired
  if (response.data.statusCode === 401) {
    const response= await axiosinstance.get('/api/refresh');

    if (response.data.status === "ok") {
      const accesstoken = response.data.result.accesstoken;
      setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accesstoken);
      originalRequest.headers["Authorization"] = `Bearer ${getItem(
        ACCESS_TOKEN_LOCAL_STORAGE_KEY
      )}`;

      return axiosinstance(originalRequest);
    }
  }

  return Promise.reject(response.data.message);
});

export default axiosinstance;
