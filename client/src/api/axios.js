import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change this in prod
  withCredentials: true,
});

export default api;
