import React from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import "@/components/ui/widjets/header/header.scss";
import { AlignCenterOutlined, HomeOutlined, ProductOutlined, QuestionCircleOutlined, ReadOutlined } from "@ant-design/icons";

const HeaderBottomMobile = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  return (
    <div className="fixed bg-white bottom-0 w-full h-20 pt-3 border border-t-1 border-t-gray-200 z-20">
      <ul className="flex flex-row justify-evenly gap-4 ">
        <li>
          <Link to="/" className={pathname === "/" ? "focusMobile flex flex-col items-center justify-center gap-1 border-none" : "flex border-none flex-col items-center justify-center gap-1"}>
          <HomeOutlined />
            {t("header.main")}
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={pathname === "/products" ? "focusMobile flex flex-col items-center justify-center gap-1 border-none" : "border-none flex flex-col items-center justify-center gap-1"}
          >
            <AlignCenterOutlined />
            {t("header.shop")}
          </Link>
        </li>
        <li>
          <Link
            to="/about-us"
            className={pathname === "/about-us" ? "focusMobile flex flex-col items-center justify-center gap-1 border-none" : "border-none flex flex-col items-center justify-center gap-1"}
          >
            <ReadOutlined />
            {t("header.about_us")}
          </Link>
        </li>
        <li>
          <Link to="/news" className={pathname === "/news" ? "focusMobile  flex flex-col items-center justify-center gap-1 border-none" : "border-none flex flex-col items-center justify-center gap-1"}>
          <ProductOutlined />
            {t("header.news")}
          </Link>
        </li>
        <li>
          <Link to="/faq" className={pathname === "/faq" ? "focusMobile  flex flex-col items-center justify-center gap-1 border-none" : "border-none flex flex-col items-center justify-center gap-1"}>
          <QuestionCircleOutlined />
            {t("header.faq")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderBottomMobile;
