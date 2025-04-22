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
  oneProduct: null,
  currentPage: 1, // Текущая страница
  pageSize: 9, // Количество продуктов на одной странице
  favProducts: [],

  // Метод для установки текущей страницы
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  // Метод для получения продуктов для текущей страницы
  getCurrentPageProducts: () => {
    const { filteredProducts, currentPage, pageSize } = get();
    return filteredProducts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  },

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

  filterProductsByPrice: (min, max) => {
    const { products } = get();
    const filtered = products.filter((p) => {
      return p.price >= min && p.price <= max;
    });
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
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(`${API}/api/api_product/products/`);
        set({ products: response.data });
        get().filterProducts(); // запускаем фильтрацию после загрузки
        // console.log(response.data);
      } catch (error) {
        set({ error: error.message || "Products load failed" });
      } finally {
        set({ loading: false });
      }
    } else {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(`${API}/api/api_product/products/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        set({ products: response.data });
        get().filterProducts(); // запускаем фильтрацию после загрузки
        // console.log(response.data);
      } catch (error) {
        set({ error: error.message || "Products load failed" });
      } finally {
        set({ loading: false });
      }
    }
  },

  getOneProductById: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(
          `${API}/api/api_product/products/${id}/`
        );
        set({ oneProduct: response.data });
        // console.log(response.data);
      } catch (error) {
        set({ error: error.message || "Product load failed" });
      } finally {
        set({ loading: false });
      }
    // }
  },

  changeLike: async (slug) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({ error: "No access token found" });
      return;
    }

    set({ loading: true, error: null });
    try {
      // 1. Меняем статус на бэке
      await axios.post(
        `${API}/api/api_product/products/${slug}/favorite/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 2. Обновляем products и oneProduct в Zustand
      set((state) => {
        const updateFavoriteFlag = (product) =>
          product.slug === slug
            ? { ...product, is_favorite: !product.is_favorite }
            : product;

        return {
          products: state.products.map(updateFavoriteFlag),
          filteredProducts: state.filteredProducts.map(updateFavoriteFlag),
          oneProduct:
            state.oneProduct?.slug === slug
              ? {
                  ...state.oneProduct,
                  is_favorite: !state.oneProduct.is_favorite,
                }
              : state.oneProduct,
        };
      });

      // 3. После toggle обновим избранные (опционально)
      await get().getFavorites();
    } catch (error) {
      console.error("changeLike error:", error);
      set({ error: error.message || "Favorite toggle failed" });
    } finally {
      set({ loading: false });
    }
  },

  getFavorites: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({ error: "No access token found" });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API}/api/api_product/favorites/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const favData = response.data;

      set((state) => {
        // Обновим is_favorite в products в зависимости от favData
        const favIds = favData.map((fav) => fav.id);

        const syncFavoriteFlag = (product) => ({
          ...product,
          is_favorite: favIds.includes(product.id),
        });

        return {
          favProducts: favData,
          products: state.products.map(syncFavoriteFlag),
          filteredProducts: state.filteredProducts.map(syncFavoriteFlag),
        };
      });
    } catch (error) {
      console.error("getFavorites error:", error);
      set({ error: error.message || "Failed to fetch favorites" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
