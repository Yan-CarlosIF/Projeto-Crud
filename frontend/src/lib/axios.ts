import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-crud-h0ja.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
