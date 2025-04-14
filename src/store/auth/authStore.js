import { create } from "zustand";
import axios from "axios";
import { API } from "@/helpers/consts";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,

  registerUser: async ({ email, password, navigate }) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(`${API}/api/api_user/register/`, {
        email,
        password,
      });

      set({ user: response.data });
      navigate("/login");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      set({ error: errorMessage });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async ({ email, password, navigate }) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(`${API}/api/api_user/login/`, {
        email,
        password,
      });

      const { access, refresh, user } = response.data;
      // Сохраняем токены в store
      set({
        user: user,
        accessToken: access,
        refreshToken: refresh,
      });

      // Сохраняем токены в localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      console.log("login success", response.data);
      navigate("/");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      set({ error: errorMessage });
      console.log("login failed");
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // Функция для рефреша токена
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      set({ error: "No refresh token available" });
      return null;
    }

    set({ loading: true });

    try {
      const response = await axios.post(
        `${API}/api/api_user/token/refresh/`,
        {
          refreshToken,
        }
      );

      const { access } = response.data;

      // Обновляем токен в store и в localStorage
      set({ accessToken: access });
      localStorage.setItem("accessToken", access);

      return accessToken;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to refresh token";
      set({ error: errorMessage });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
