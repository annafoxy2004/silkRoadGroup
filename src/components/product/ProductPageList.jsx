import React from "react";
import { useLocation } from "react-router-dom";
import Products from "./ShopView/Products";

const ProductPageList = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <Products  pathname={pathname}/>
    </div>
  );
};

export default ProductPageList;
