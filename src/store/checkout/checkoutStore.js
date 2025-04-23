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
  consent: false,
  validationErrors: {},

  setCheckoutField: (field, value) =>
    set((state) => ({
      checkoutData: {
        ...state.checkoutData,
        [field]: value,
      },
      validationErrors: {
        ...state.validationErrors,
        [field]: false,
      },
    })),

  setConsent: (value) => set({ consent: value }),

  validateCheckoutData: () => {
    const { checkoutData } = useCheckoutStore.getState();
    const errors = {};

    Object.entries(checkoutData).forEach(([key, value]) => {
      if (!value || value.trim() === "") {
        errors[key] = true;
      }
    });

    set({ validationErrors: errors });
    return Object.keys(errors).length === 0;
  },

  submitOrder: async (onSuccess) => {
    const accessToken = localStorage.getItem("accessToken");
    const isValid = useCheckoutStore.getState().validateCheckoutData();

    if (!isValid) {
      alert("Заполните все поля перед отправкой заказа.");
      return;
    }

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
          consent: false,
          validationErrors: {},
        });
        onSuccess();
      } catch (error) {
        console.error("Order submission failed:", error);
        alert("Did not fill in all the fields or entered the data incorrectly. Please check the correctness of the entered data!")
      }
    }
  },
}));

export default useCheckoutStore;
