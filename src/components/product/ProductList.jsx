import useProductStore from "@/store/product/productStore";
import React, { useEffect, useState } from "react";
import Loading from "../ui/widjets/loading/Loading";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";


const ProductList = ({ pathname }) => {
  const { getProducts, filteredProducts, loading, products } = useProductStore();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all-courses");


  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (value) => {
    setSelectedCategory(value);
    setOpen(false);
  };

  return (
    <div className={pathname === "/products" ?"": "px-5 sm:px-20 xl:px-52"}>
      {pathname === "/products" ? (
        <></>
      ) : (
        <p className="text-3xl font-semibold text-[#20A647] py-5">
          {t("shop.allProducts")}
        </p>
      )}

      {filteredProducts.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-1 sm:gap-6">
          {filteredProducts.map((item) => (
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

export default ProductList;
