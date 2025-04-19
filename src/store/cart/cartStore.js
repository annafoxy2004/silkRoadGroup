import { create } from "zustand";
import axios from "axios";
import { API } from "@/helpers/consts";

const useCartStore = create((set, get) => ({
  products: [],
  oneProduct: null,

  loading: false,
  error: null,


}));

export default useCartStore;
