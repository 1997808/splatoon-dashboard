import axios from "axios";
import Cookies from "js-cookie";

const accessToken = Cookies.get("token");

const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || "DEV";

let baseURL =
  APP_ENV === "DEV"
    ? process.env.NEXT_PUBLIC_BASE_URL + "/"
    : `${window.location.origin}/api`;

export const MyAxios = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

MyAxios.interceptors.response.use(
  (res) => res,
  (err: any) => {
    if (err?.response?.status === 401) {
      Cookies.remove("token");
      window.location.replace("/auth/signin");
    }
    normalizeError(err.response?.data.message);
  },
);

// Normalize errors
const normalizeError = (error: any) => {
  return Promise.reject(error);
};

export const updateToken = () => {
  const token = Cookies.get("token");
  MyAxios.interceptors.request.use(function (config: any) {
    config.headers.Authorization = token ? `Bearer ${token}` : `Bearer`;
    return config;
  });
};

export enum EHttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface IParams {
  [key: string]: any;
}

export interface IGenericOptions {
  url: string;
  params?: IParams;
}

export interface IErrorResponse {
  // *This can depending on your backend server error response
  status: string;
  message: string;
}
