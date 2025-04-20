import { create } from "zustand";
import axios from "axios";
import { API } from "@/helpers/consts";

const useNewsStore = create((set, get) => ({
  news: [],
  oneNew: null,

  loading: false,
  error: null,

  getNews: async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(`${API}/api/api_news/news/`);
        set({ news: response.data });
        // console.log("news success:", response.data);
      } catch (error) {
        set({ error: error.message || "news load failed" });
      } finally {
        set({ loading: false });
      }
    } else {
      try {
        const response = await axios.get(`${API}/api/api_news/news/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        set({ news: response.data });
        // console.log("news success:", response.data);
      } catch (error) {
        set({ error: error.message || "news load failed" });
      } finally {
        set({ loading: false });
      }
    }
  },

  getOneNewsById: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(`${API}/api/api_news/news/${id}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          
        set({ oneNew: response.data });
        // console.log("getOneNewsById:", response.data);
      } catch (error) {
        set({ error: error.message || "news load failed" });
      } finally {
        set({ loading: false });
      }
    }
  },

}));

export default useNewsStore;
