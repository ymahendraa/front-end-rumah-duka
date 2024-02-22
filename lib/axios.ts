import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Change to your specific environment variable

export default axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
