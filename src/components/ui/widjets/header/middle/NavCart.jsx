import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "@/assets/header/CartIcon";
import { useTranslation } from "react-i18next";

const NavCart = () => {
  const { t } = useTranslation();
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return null;

  return (
    <Link to="/cart">
      <div className="flex items-center gap-2 cursor-pointer">
        <CartIcon color="black" />
        <span>{t("header.cart")}</span>
      </div>
    </Link>
  );
};

export default NavCart;
