import useProductStore from "@/store/product/productStore";
import React, { useEffect, useState } from "react";
import Loading from "../ui/widjets/loading/Loading";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";

const ProductList = ({ pathname }) => {
  const { getProducts, filteredProducts, loading } = useProductStore();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all-courses");
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    getProducts();
    console.log("Current pathname:", pathname);

  }, []);

  const handleChange = (value) => {
    setSelectedCategory(value);
    setOpen(false);
  };

  const displayedProducts =
  path === "/" ? filteredProducts.slice(0, 8) : filteredProducts;

  return (
    <div className={pathname === "/products" ? "" : "px-5 sm:px-20 xl:px-52"}>
      {pathname === "/products" ? null : (
        <p className="text-3xl font-semibold text-[#20A647] py-5">
          {t("shop.allProducts")}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
        </div>
      ) : displayedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-1 sm:gap-6">
          {displayedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              btnTitle={t("shop.addToCart")}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[300px]">
          <p>no Products</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
