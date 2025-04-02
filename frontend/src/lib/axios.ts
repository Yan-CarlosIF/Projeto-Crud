import axios from "axios";

export const api = axios.create({
  baseURL: "https://crud-api-bay.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
