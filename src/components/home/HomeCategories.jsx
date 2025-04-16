import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useProductStore from "@/store/product/productStore";
import Loading from "../ui/widjets/loading/Loading";

const HomeCategories = () => {
  const {
    getCategories,
    getProducts,
    categories,
    setCategory,
    selectedCategory,
    loading,
  } = useProductStore();

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0]; // "ru", "en", "ky"

  useEffect(() => {
    getCategories();
    getProducts(); // нужно для фильтрации по категориям
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-5 py-0 lg:flex flex-col items-center">
      <div>
        <p
          className="text-3xl font-semibold text-[#20A647] py-5 cursor-pointer"
          onClick={() => setCategory(null)}
        >
          {t("home_page.categories_title")}
        </p>

        <ul className="flex overflow-x-auto space-x-4 py-4">
          {/* Категории */}
          {categories.map((cat) => {
            const translatedName =
              cat.translations?.[currentLang]?.name ||
              cat.translations?.en?.name ||
              cat.name;

            return (
              <li
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex-shrink-0 w-40 sm:w-52 h-40 sm:h-52 text-xl text-white border-none rounded-2xl relative bg-cover bg-center flex items-center justify-center cursor-pointer ${
                  selectedCategory === cat.id ? "ring-4 ring-green-500" : ""
                }`}
                style={{ backgroundImage: `url(${cat.photo})` }}
              >
                <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
                <span className="relative z-10 text-center px-2">
                  {translatedName}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HomeCategories;
