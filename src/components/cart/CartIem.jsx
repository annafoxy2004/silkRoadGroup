import {
    CloseOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
  } from "@ant-design/icons";
  import React from "react";
  import { useTranslation } from "react-i18next";
  import { useLocation } from "react-router-dom";
  import useProductStore from "@/store/product/productStore";
  
  const CartItem = ({ item }) => {
    const location = useLocation();
    const path = location.pathname;
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language.split("-")[0];
  
    const { updateCart2Quantity, removeFromCart2 } = useProductStore();
  
    const product = item.product;
    const translation =
      product.translations?.[currentLang] || product.translations?.en || {
        name: t("product.no_name", "No name"),
        description: t("product.no_description", "No description"),
      };
  
    const category =
      product.category?.translations?.[currentLang]?.name ||
      product.category?.name ||
      t("product.no_category", "No category");
  
    const imageSrc = product.images?.[0]?.image || product.image || "/fallback.jpg";
  
    return (
      <div className="h-40 flex flex-row items-center justify-between py-10 border-b border-b-gray-200 bg-white">
        {/* Левая часть: информация */}
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 sm:w-1/2">
          {path === "/cart" && (
            <CloseOutlined
              className="sm:mr-2 cursor-pointer text-gray-500 hover:text-red-500"
              onClick={() => removeFromCart2(product.id)}
            />
          )}
  
          <div className="w-24 sm:w-32 overflow-hidden">
            <img
              className="w-24 h-24 sm:h-32 sm:w-32 object-cover border-none rounded-xl"
              src={imageSrc}
              alt={translation.name}
            />
          </div>
  
          <div className="flex flex-col gap-1">
            <p className="text-md sm:text-xl font-semibold">{translation.name}</p>
  
            <div className="h-4 w-full flex gap-1 items-center">
              <span className="font-light text-[14px]">{t("cart.quantity")}:</span>
              <span className="font-medium text-[15px]">
                {item.quantity} {product.unit || "шт"}
              </span>
            </div>
  
            <div className="h-4 w-full flex gap-1 items-center">
              <span className="font-light text-[14px]">{t("productDetail.category")}:</span>
              <span className="font-medium text-[15px]">{category}</span>
            </div>
          </div>
        </div>
  
        {/* Правая часть: цена и количество */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center sm:justify-between items-center sm:w-1/2">
          {path === "/cart" && (
            <div className="flex flex-row w-28 sm:w-36 items-center justify-between">
              <MinusCircleOutlined
                className="text-2xl cursor-pointer text-gray-500 hover:text-blue-500"
                onClick={() =>
                  item.quantity > 1 &&
                  updateCart2Quantity(product.id, item.quantity - 1)
                }
              />
              <span className="font-semibold text-[22px]">{item.quantity}</span>
              <PlusCircleOutlined
                className="text-2xl cursor-pointer text-gray-500 hover:text-blue-500"
                onClick={() =>
                  updateCart2Quantity(product.id, item.quantity + 1)
                }
              />
            </div>
          )}
  
          <div className="flex flex-col items-end gap-2">
            <p className="font-semibold text-[22px]">
              {item.price?.toLocaleString()} с
            </p>
            {product.old_price && (
              <p className="font-medium text-gray-400 text-[16px] line-through">
                {product.old_price.toLocaleString()} с
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default CartItem;
  