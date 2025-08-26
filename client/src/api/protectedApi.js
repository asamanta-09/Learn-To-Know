import axios from "axios";

let accessToken = null;
let refreshTokenHandler = null;

const protectedApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

protectedApi.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403 && refreshTokenHandler) {
      try {
        const newToken = await refreshTokenHandler();
        accessToken = newToken;
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        return protectedApi(error.config);
      } catch (refreshErr) {
        throw refreshErr;
      }
    }
    throw error;
  }
);

export const setAccessToken = (token) => {
  accessToken = token;
};

export const setRefreshTokenHandler = (callback) => {
  refreshTokenHandler = callback;
};

export default protectedApi;
