import useProductStore from "@/store/product/productStore";
import React from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../ProductCard";
import Loading from "@/components/ui/widjets/loading/Loading";

const ProductsAlsoSee = () => {
  const { loading, products } = useProductStore();
  const { t } = useTranslation();

  return (
    <div className="p-3 sm:px-16">
      <p className="text-3xl font-semibold py-5">
        {t("productDetail.also")}
      </p>

      {products.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-1 sm:gap-6">
          {products.slice(0, 4).map((item) => ( // <= здесь берем только первые 4 продукта
            <ProductCard
              key={item.id}
              product={item}
              btnTitle={t("shop.addToCart")}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ProductsAlsoSee;
