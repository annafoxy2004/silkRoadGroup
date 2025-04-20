import { create } from "zustand";
import axios from "axios";
import { API } from "@/helpers/consts";

const useCheckoutStore = create((set) => ({
  checkoutData: {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    country: "",
    postal_code: "",
    state: "",
    phone_number_1: "",
    phone_number_2: "",
    whatsapp: "",
    telegram: "",
  },
  consent: false, // Добавляем состояние consent

  setCheckoutField: (field, value) =>
    set((state) => ({
      checkoutData: {
        ...state.checkoutData,
        [field]: value,
      },
    })),

  setConsent: (value) => set({ consent: value }), // Метод для обновления consent

  submitOrder: async (onSuccess) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const { checkoutData } = useCheckoutStore.getState();
        const response = await axios.post(
          `${API}/api/api_cart/checkout/`,
          checkoutData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // console.log("Order submitted:", response.data);
        // После успешной отправки очищаем данные
        set({
          checkoutData: {
            first_name: "",
            last_name: "",
            address_1: "",
            address_2: "",
            city: "",
            country: "",
            postal_code: "",
            state: "",
            phone_number_1: "",
            phone_number_2: "",
            whatsapp: "",
            telegram: "",
          },
          consent: false, // Очистить согласие
        });
        onSuccess(); // Вызываем коллбек, чтобы показать модалку
      } catch (error) {
        console.error("Order submission failed:", error);
      }
    }
  },
}));

export default useCheckoutStore;
