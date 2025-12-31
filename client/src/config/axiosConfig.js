import axios from "axios";

// Create a custom Axios instance with default settings
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // base url of api endpoints
  withCredentials: true, // allows cookies to be sent automatically
});

// Request interceptor to attach token to every request
api.interceptors.request.use(
  (config) => {
   const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
