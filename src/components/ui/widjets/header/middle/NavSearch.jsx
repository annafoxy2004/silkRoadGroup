import React from "react";
import search from "@/assets/header/search.svg";
import { useTranslation } from "react-i18next";
import useProductStore from "@/store/product/productStore";

const NavSearch = () => {
  const { t } = useTranslation();
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="nav-search flex items-center w-72 max-w-sm px-4 py-2 bg-gray-200 rounded-lg">
      <img src={search} alt="search" className="text-gray-500 w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder={t("header.search_placeholder")}
        className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default NavSearch;
