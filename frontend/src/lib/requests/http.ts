import axios from "axios";

const accessToken = localStorage.getItem("restaurant:access_token");

export const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    "Content-Type": "application/json",
  },
});
