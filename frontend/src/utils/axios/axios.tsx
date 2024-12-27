import axios from "axios";
console.log("env", import.meta.env.VITE_BACKEND_URL);
export const CLIENT_API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  
});
