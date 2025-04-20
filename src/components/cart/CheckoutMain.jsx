import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import useCheckoutStore from "@/store/checkout/checkoutStore";
import ButtonLink from "../ui/atoms/ButtonLink";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Замените useHistory на useNavigate
import check from "@/assets/checkout/check.svg";
import useCartStore from "@/store/cart/cartStore";
import Loading from "../ui/widjets/loading/Loading";
import CartItem from "./CartIem";

const CheckoutMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Используем useNavigate для навигации
  const { checkoutData, setCheckoutField, submitOrder, consent, setConsent } =
    useCheckoutStore();
  const { getCart, cart, loading } = useCartStore();

  useEffect(() => {
    getCart();
  }, []);

  const cart2 = cart.cart_items;

  const total = cart.total_cart_price;

  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для модалки

  const handleChange = (field) => (e) => {
    setCheckoutField(field, e.target.value);
  };

  const handleOrderSuccess = () => {
    // Показать модалку с успешным заказом
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigate("/products"); // Перенаправляем на страницу продуктов
  };

  const fields = [
    { name: "first_name", label: t("checkout.first_name") },
    { name: "last_name", label: t("checkout.last_name") },
    { name: "address_1", label: t("checkout.address_1") },
    { name: "address_2", label: t("checkout.address_2") },
    { name: "city", label: t("checkout.city") },
    { name: "country", label: t("checkout.country") },
    { name: "postal_code", label: t("checkout.postal_code") },
    { name: "state", label: t("checkout.state") },
    { name: "phone_number_1", label: t("checkout.phone_number_1") },
    { name: "phone_number_2", label: t("checkout.phone_number_2") },
    { name: "whatsapp", label: t("checkout.whatsapp") },
    { name: "telegram", label: t("checkout.telegram") },
  ];

  return (
    <div className="flex flex-col lg:gap-10 lg:flex-row">
      <div className="px-4 sm:w-full">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loading />
          </div>
        ) : cart2 ? (
          <>
            {cart2.map((item, index) => (
              <CartItem key={item.id || index} item={item} />
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[300px]">
            <p>Empty cart</p>
          </div>
        )}
      </div>

      <div className="p-4 max-w-3xl mx-auto">
        <p className="font-bold text-3xl py-5 lg:py-10">{t("checkout.title")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {fields.map(({ name, label }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              {name === "phone_number_1" ||
              name === "phone_number_2" ||
              name === "whatsapp" ? (
                <PhoneInput
                  country={"kg"}
                  enableSearch
                  inputClass="!w-full !h-10"
                  containerClass="!w-full"
                  value={checkoutData[name]}
                  onChange={(phone) => setCheckoutField(name, phone)}
                />
              ) : name === "telegram" ? (
                <Input
                  placeholder="telegram link"
                  value={checkoutData[name]}
                  onChange={handleChange(name)}
                  addonAfter={
                    checkoutData[name] ? (
                      <a
                        href={`https://t.me/${checkoutData[name]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {t("checkout.telegram")}
                      </a>
                    ) : null
                  }
                />
              ) : (
                <Input
                  placeholder={label}
                  value={checkoutData[name]}
                  onChange={handleChange(name)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 mb-6">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)} // Здесь вызываем setConsent
            className="mt-1 w-5 h-5 rounded-full border border-gray-300 text-primary focus:ring-primary cursor-pointer"
          />
          <label
            htmlFor="consent"
            className="text-sm text-gray-600 cursor-pointer"
          >
            {t("checkout.consent_text")}
          </label>
        </div>

        <div className="flex flex-col gap-3 mb-10">
          <p className="font-medium text-[30px] border-b border-gray-200 py-9 px-4">
            {t("cart.summary")}
          </p>
          <div className="flex flex-row justify-between items-center border-b border-gray-200 py-3 px-4">
            <p>{t("cart.total")}</p>
            {loading ? (
              <Loading />
            ) : cart2 ? (
              <p className="font-semibold text-[22px]">{total} $</p>
            ) : (
              <></>
            )}
          </div>
        </div>

        <ButtonLink
          size="lg"
          onClick={() => {
            submitOrder(handleOrderSuccess);
          }}
          disabled={!consent}
        >
          {t("checkout.order")}
        </ButtonLink>

        {/* Модальное окно */}
        <Modal
          title=""
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <ButtonLink
              key="go-to-products"
              size="lg"
              onClick={handleModalClose}
              to="/products"
            >
              {t("checkout.go_to_products")}
            </ButtonLink>,
          ]}
        >
          <div className="flex flex-col justify-center items-center gap-5 p-3">
            <div className="w-[300px] h-[200px] rounded-xl overflow-hidden">
              <img src={check} alt="product" />
            </div>
            <p className="font-bold text-2xl">{t("checkout.success_title")}</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CheckoutMain;
