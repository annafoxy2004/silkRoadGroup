import React from "react";
import ProductList from "../product/ProductList";
import ButtonLink from "../ui/atoms/ButtonLink";
import { useTranslation } from "react-i18next";

const HomeProductList = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ProductList />
      <div className="pt-6 pb-12 w-full px-5 sm:px-20 xl:px-52">
        <ButtonLink size="md" to="/products" title={t("shop.seeAll")} />
      </div>
    </div>
  );
};

export default HomeProductList;
