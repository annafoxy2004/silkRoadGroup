import React from "react";
import cartBlack from "./cart-black.svg";
import cartWhite from "./cart-white.svg";

const CartIcon = ({ color }) => {
  const iconSrc = color === "white" ? cartWhite : color === "black" ? cartBlack : null;

  if (!iconSrc) return null; // если не передан корректный цвет

  return <img src={iconSrc} alt="Cart Icon" width={24} height={24} />;
};

export default CartIcon;
