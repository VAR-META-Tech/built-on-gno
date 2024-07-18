import { API_URL } from "@/constants"
import axios, { AxiosResponse } from "axios";

let request = axios.create({
  baseURL: API_URL,
});

const handleError = async (error: any) => {
  const data = error?.response?.data;
  return Promise.reject(data);
};

request.interceptors.response.use((response: AxiosResponse) => response.data, handleError);

export { request };
export * from "./queries";
export * from "./types";