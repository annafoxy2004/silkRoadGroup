import React, { useEffect } from "react";
import ButtonLink from "../ui/atoms/ButtonLink";
import { useTranslation } from "react-i18next";
import useProductStore from "@/store/product/productStore";
import CartIem from "./CartIem";
import useCartStore from "@/store/cart/cartStore";
import Loading from "../ui/widjets/loading/Loading";

const CartMain = () => {
  const { t } = useTranslation();
  const { getCart, cart, loading } = useCartStore();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="p-2 pt-10 sm:p-10 flex flex-col md:flex-row justify-center sm:gap-20">
      <div className="md:w-2/3">
        <p className="font-medium text-[30px] sm:text-[36px] mb-4">
          {t("cart.your")}
        </p>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loading />
          </div>
        ) : cart.cart_items ? (
          <>
            {cart.cart_items.map((item) => (
              <CartIem key={item.id} item={item} />
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[300px]">
            <p>Empty cart</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 md:w-1/3 h-96">
        <p className="font-medium text-[30px] border-b border-gray-200 py-9 px-4">
          {t("cart.summary")}
        </p>
        <div className="flex flex-row justify-between items-center border-b border-gray-200 py-3 px-4">
          <p>{t("cart.total")}</p>
          {loading ? (
            <Loading />
          ) : cart.cart_items ? (
            <p className="font-semibold text-[22px]">
              {cart.total_cart_price} $
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-center items-center py-3 px-4">
          <ButtonLink
            bg="dark"
            title={t("cart.checkout")}
            size="lg"
            to="/checkout"
          />
        </div>
      </div>
    </div>
  );
};

export default CartMain;
