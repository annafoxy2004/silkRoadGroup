import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useProductStore from "@/store/product/productStore";
import Loading from "../ui/widjets/loading/Loading";
import ProductCard from "../product/ProductCard";

const FavoritesList = () => {
  const { t } = useTranslation();
  const { getProducts, filteredProducts, loading, getFavorites,favProducts } = useProductStore();

  useEffect(() => {
    getProducts(); // Загружаем продукты, включая избранные
     getFavorites(); 
  }, []);

  return (
    <div className="px-5 sm:px-20 xl:px-52">
        <p className="text-3xl font-semibold text-[#20A647] py-5 ">
          {t("shop.fav")}
        </p>
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
        </div>
      ) : favProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-1 sm:gap-6">
          {favProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              btnTitle={t("shop.fav")}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[300px]">
          <p>{t("shop.noFavs")}</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
