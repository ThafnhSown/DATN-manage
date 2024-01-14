import axios from "axios";
import Cookies from "js-cookie";

export const ENDPOINT_LOCAL = process.env.REACT_APP_ENDPOINT;
export const PREFIX_API = process.env.REACT_APP_PREFIX_API;
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = `${ENDPOINT_LOCAL}/${PREFIX_API}`;
// axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = 20000;
axiosInstance.defaults.headers = { "Content-Type": "application/json" };

const token = Cookies.get("x-access-token")

export const ApiConfig = async (url, payload, _method = "POST") => {
    const method = _method.toLowerCase();
    const config = {
        url,
        method,
        data: payload,
    };
   
    return axiosInstance.request(config);
}


export const ApiAdminConfig = async (url, payload, _method = "POST") => {
    axiosInstance.defaults.headers = {"Authorization" : `Bearer ${token.replace(/"/g, '')}`}
    const method = _method.toLowerCase();
    const config = {
        url,
        method,
        data: payload,
    };
   
    return axiosInstance.request(config);
}
