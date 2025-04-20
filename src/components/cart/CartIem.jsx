import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import useProductStore from "@/store/product/productStore";
import gray from "@/assets/product/gray.svg";
import { API } from "@/helpers/consts";
import useCartStore from "@/store/cart/cartStore";

const CartItem = ({ item }) => {
  const location = useLocation();
  const path = location.pathname;
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.split("-")[0];

  const {
    getCart,
    getOneCartById,
    cart,
    oneCartItem,
    loading,
    deleteCartItemById,
    updateCartItemQuantity,
  } = useCartStore();

  const handleIncrement = () => {
    const newQuantity = item.quantity + 1;
    updateCartItemQuantity(item.id, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = item.quantity - 1;
    if (newQuantity >= 1) {
      updateCartItemQuantity(item.id, newQuantity);
    }
  };

  const translation = item.product.translations?.[currentLang] ||
    item.product.translations?.en || {
      name: t("product.no_name", "No name"),
      description: t("product.no_description", "No description"),
    };

  return (
    <div className="h-40 flex flex-row items-center justify-between py-10 border-b border-b-gray-200 bg-white">
      {/* Левая часть: информация */}
      <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 sm:w-1/2">
        {path === "/cart" && (
          <div className="flex flex-col items-center justify-center gap-3">
            <CloseOutlined
              onClick={() => {
                deleteCartItemById(item.id);
              }}
              className="cursor-pointer text-gray-500 hover:text-red-500"
            />
          </div>
        )}

        <div className="w-24 sm:w-32 overflow-hidden">
          <img
            className="w-24 h-24 sm:h-32 sm:w-32 object-cover border-none rounded-xl"
            src={
              item.product.first_image
                ? `${API}/${item.product.first_image}`
                : gray
            }
            alt="product"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-md sm:text-xl font-semibold">{translation.name}</p>

          {/* <div className="h-4 w-full flex gap-1 items-center">
            <span className="font-light text-[14px]">
              {t("cart.quantity")}:
            </span>
            <span className="font-medium text-[15px]">
              {item.quantity}  
            </span>
          </div> */}

          <div className="h-4 w-full flex flex-col sm:flex-row gap-1 sm:items-center">
            <span className="font-light text-[14px]">
              {t("productDetail.category")}
            </span>
            <span className="font-medium text-[15px]">
              {item.product.category?.translations?.[currentLang]?.name ||
                item.product.category?.translations?.en?.name ||
                item.product.category?.name ||
                t("product.no_category", "No category")}
            </span>
          </div>
        </div>
      </div>

      {/* Правая часть: цена и количество */}
      <div
        className={
          path === "/cart"
            ? "flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center sm:justify-between items-center sm:w-1/2"
            : "flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center sm:justify-between items-center"
        }
      >
        {path === "/cart" && (
          <div className="flex flex-row w-28 sm:w-36 items-center justify-center gap-3 sm:justify-between">
            <MinusCircleOutlined
              onClick={handleDecrement}
              className="text-2xl cursor-pointer text-gray-500 hover:text-black"
            />
            <span className="font-semibold text-[22px]">{item.quantity}</span>
            <PlusCircleOutlined
              onClick={handleIncrement}
              className="text-2xl cursor-pointer text-gray-500 hover:text-black"
            />
          </div>
        )}

        <div className="flex flex-col items-end gap-2">
          <p className="font-semibold text-[22px]">{item.total_price} $</p>
          {item.product.old_price && (
            <p className="font-medium text-gray-400 text-[16px] line-through">
              {item.product.old_price} $
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
