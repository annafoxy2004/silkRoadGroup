import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import useProductStore from "@/store/product/productStore";
import gray from "@/assets/product/gray.svg";

const CartItem = ({ item }) => {
  const location = useLocation();
  const path = location.pathname;
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.split("-")[0];

  // const product = item.product;
  // const translation =
  //   product.translations?.[currentLang] || product.translations?.en || {
  //     name: t("product.no_name", "No name"),
  //     description: t("product.no_description", "No description"),
  //   };

  return (
    <div className="h-40 flex flex-row items-center justify-between py-10 border-b border-b-gray-200 bg-white">
      {/* Левая часть: информация */}
      <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 sm:w-1/2">
        {path === "/cart" && (
          <div className="flex flex-col items-center justify-center gap-3">
            <CheckCircleOutlined className="text-2xl text-green-800 hover:text-green-600 cursor-pointer" />
            <CloseOutlined className="sm:mr-2 sm:pl-2 cursor-pointer text-gray-500 hover:text-red-500" />
          </div>
        )}

        <div className="w-24 sm:w-32 overflow-hidden">
          <img
            className="w-24 h-24 sm:h-32 sm:w-32 object-cover border-none rounded-xl"
            src={gray}
            alt="product"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-md sm:text-xl font-semibold">
            {/* {translation.name} */}
            qwertyui
          </p>

          <div className="h-4 w-full flex gap-1 items-center">
            <span className="font-light text-[14px]">
              {t("cart.quantity")}:
            </span>
            <span className="font-medium text-[15px]">
              {/* {item.quantity}   */}5
            </span>
          </div>

          <div className="h-4 w-full flex gap-1 items-center">
            <span className="font-light text-[14px]">
              {t("productDetail.category")}:
            </span>
            <span className="font-medium text-[15px]">
              {/* {category} */}category
            </span>
          </div>
        </div>
      </div>

      {/* Правая часть: цена и количество */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center sm:justify-between items-center sm:w-1/2">
        {path === "/cart" && (
          <div className="flex flex-row w-28 sm:w-36 items-center justify-between">
            <MinusCircleOutlined className="text-2xl cursor-pointer text-gray-500 hover:text-black" />
            <span className="font-semibold text-[22px]">
              {/* {item.quantity} */}2
            </span>
            <PlusCircleOutlined className="text-2xl cursor-pointer text-gray-500 hover:text-black" />
          </div>
        )}

        <div className="flex flex-col items-end gap-2">
          <p className="font-semibold text-[22px]">
            {/* {item.price?.toLocaleString()}  */}1234 $
          </p>
          {/* {product.old_price && ( */}
          <p className="font-medium text-gray-400 text-[16px] line-through">
            {/* {product.old_price.toLocaleString()} */}12345 $
          </p>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
