import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import "@/components/ui/widjets/header/header.scss";

const HeaderBottom = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <div className="menu-bottom border-b border-b-gray-200 bg-white">
      <ul className="nav-menu">
        <li>
          <NavLink to="/" className={pathname === "/" ? "active" : ""}>
            {t("header.main")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={pathname === "/products" ? "active" : ""}
          >
            {t("header.shop")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about-us"
            className={pathname === "/about-us" ? "active" : ""}
          >
            {t("header.about_us")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" className={pathname === "/news" ? "active" : ""}>
            {t("header.news")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/faq" className={pathname === "/faq" ? "active" : ""}>
            {t("header.faq")}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default HeaderBottom;
