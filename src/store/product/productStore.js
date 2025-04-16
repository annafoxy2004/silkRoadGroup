import { create } from "zustand";
import axios from "axios";
import { API } from "@/helpers/consts";

const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: null,
  searchQuery: "",
  loading: false,
  error: null,

  setCategory: (categoryId) => {
    set({ selectedCategory: categoryId });
    const allProducts = get().products;

    if (!categoryId) {
      set({ filteredProducts: allProducts });
    } else {
      const filtered = allProducts.filter(
        (p) => p.category && p.category.id === categoryId
      );
      set({ filteredProducts: filtered });
    }
  },

  setSearchQuery: (query) => {
    const { products } = get();
    const lowerQuery = query.toLowerCase();
    const currentLang = localStorage.getItem("i18nextLng") || "ru";

    const filtered = products.filter((p) => {
      const name = p.translations?.[currentLang]?.name?.toLowerCase() || "";
      const description =
        p.translations?.[currentLang]?.description?.toLowerCase() || "";

      const price = p.price?.toString().toLowerCase() || "";
      const old = p.old_price?.toString().toLowerCase() || "";

      return (
        name.includes(lowerQuery) ||
        description.includes(lowerQuery) ||
        price.includes(lowerQuery) ||
        old.includes(lowerQuery)
      );
    });

    set({ searchQuery: query, filteredProducts: filtered });
  },

  filterProducts: () => {
    const { products, selectedCategory, searchQuery } = get();

    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title?.toLowerCase().includes(lowerQuery)
      );
    }

    set({ filteredProducts: filtered });
  },

  getCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API}/api/api_product/categories/`);
      set({ categories: response.data });
    } catch (error) {
      set({ error: error.message || "Category load failed" });
    } finally {
      set({ loading: false });
    }
  },

  getProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API}/api/api_product/products/`);
      set({ products: response.data });
      console.log(response.data);
      get().filterProducts(); // запускаем фильтрацию после загрузки
    } catch (error) {
      set({ error: error.message || "Products load failed" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
