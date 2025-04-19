import React from "react";
import ButtonLink from "../ui/atoms/ButtonLink";
import { useTranslation } from "react-i18next";
import useProductStore from "@/store/product/productStore";
import CartItem from "./CartIem";

const CartMain = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.split("-")[0];


  // const totalSum = cart2.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  return (
    <div className="p-2 pt-10 sm:p-10 flex flex-col md:flex-row justify-center sm:gap-20">
      <div className="md:w-2/3">
        <p className="font-medium text-[30px] sm:text-[36px] mb-4">
          {t("cart.your")}
        </p>
<CartItem/>
<CartItem/>
<CartItem/>
<CartItem/>
<CartItem/>
        {/* {cart2.length > 0 ? (
          cart2.map((item, index) => <CartItem key={index} item={item} />)
        ) : (
          <p className="text-gray-500">{t("cart.empty", "Cart is empty")}</p>
        )} */}
      </div>

      <div className="flex flex-col gap-3 md:w-1/3 h-96">
        <p className="font-medium text-[30px] border-b border-gray-200 py-9 px-4">
          {t("cart.summary")}
        </p>
        <div className="flex flex-row justify-between items-center border-b border-gray-200 py-3 px-4">
          <p>{t("cart.total")}</p>
          <p className="font-semibold text-[22px]">
            {/* {totalSum.toLocaleString()} */}
            98765
             $
          </p>
        </div>
        <div className="flex justify-center items-center py-3 px-4">
          <ButtonLink bg="dark" title={t("cart.checkout")} size="lg"   to="/checkout" />
        </div>
      </div>
    </div>
  );
};

export default CartMain;
