import React from "react";
import { Link } from "react-router-dom";
import favorites from "@/assets/header/favorites.svg";
import { useTranslation } from "react-i18next";

const NavFavorites = () => {
  const { t } = useTranslation();
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return null;
  
  return (
    <Link to="/favourites">
      <div className="flex items-center gap-2 cursor-pointer">
        <img src={favorites} alt="favorites" />
        <span>{t("header.favorites")}</span>
      </div>
    </Link>
  );
};

export default NavFavorites;
