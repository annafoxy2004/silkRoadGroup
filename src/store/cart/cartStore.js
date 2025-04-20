import { create } from "zustand";
import axios from "axios";
import { API } from "@/helpers/consts";

const useCartStore = create((set, get) => ({
  cart: [],
  oneCartItem: null,

  loading: false,
  error: null,

  updateCartItemQuantity: async (id, newQuantity) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      set({ loading: true, error: null });
      try {
        await axios.patch(
          `${API}/api/api_cart/cart-items/${id}/`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        await get().getCart(); // Обновляем корзину после изменения
        // console.log(`Quantity updated for item ${id}: ${newQuantity}`);
      } catch (error) {
        set({ error: error.message || "Failed to update quantity" });
        // console.log("updateCartItemQuantity fail");
      } finally {
        set({ loading: false });
      }
    }
  },
  
  deleteCartItemById: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      set({ loading: true, error: null });
      try {
        await axios.delete(`${API}/api/api_cart/cart-items/${id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // После удаления обновим корзину
        await get().getCart();
        // console.log(`Cart item ${id} deleted successfully`);
      } catch (error) {
        set({ error: error.message || "Failed to delete cart item" });
        // console.log("deleteCartItemById fail");
      } finally {
        set({ loading: false });
      }
    }
  },

  setOneCartItem: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      set({ loading: true, error: null });
      try {
        const response = await axios.post(
          `${API}/api/api_cart/cart-items/`,
          {
            product: id,
            quantity: 1,
            is_ordered: false,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        set({ cart: response.data });
        // console.log("setOneCartItem success");
      } catch (error) {
        // console.log("setOneCartItem fail");
        set({ error: error.message || "Cart load failed" });
      } finally {
        set({ loading: false });
      }
    }
  },

  getCart: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(`${API}/api/api_cart/cart-items/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        set({ cart: response.data });
        // console.log("getCart success:", response.data);
      } catch (error) {
        set({ error: error.message || "Cart load failed" });
        // console.log("getCart fail");
      } finally {
        set({ loading: false });
      }
    }
  },

  getOneCartById: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(
          `${API}/api/api_cart/cart-items/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        set({ oneCartItem: response.data });
        // console.log("getOneCartById success:", response.data);
      } catch (error) {
        set({ error: error.message || "Product load failed" });
      } finally {
        set({ loading: false });
      }
    }
  },
}));

export default useCartStore;
