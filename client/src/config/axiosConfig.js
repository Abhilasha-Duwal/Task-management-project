import axios from "axios";

// If you're using cookies (httpOnly or JS cookies), we enable sending cookies
const api = axios.create({
  baseURL: "http://localhost:5000/api", // base url of api endpoints
  withCredentials: true, // allows cookies to be sent automatically
});

// Request Interceptor – add token from cookies (if needed)
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
