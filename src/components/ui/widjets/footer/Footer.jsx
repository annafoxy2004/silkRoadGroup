import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import rights from "@/assets/footer/rights.svg";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  SendOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Скрываем футер на /login и /signup
  const hideFooter = ["/login", "/signup"].includes(location.pathname);
  if (hideFooter) return null;

  return (
    <footer className="p-16 pb-0">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 pb-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <img src={logo} alt="logo" className="max-w-40" />
          <span className="font-thin max-w-52">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </span>
        </div>

        <div>
          <p className="text-lg font-semibold pb-5">{t("footer.pages")}</p>
          <ul className="flex flex-col gap-3">
            <li><Link to="/">{t("header.main")}</Link></li>
            <li><Link to="/products">{t("header.shop")}</Link></li>
            <li><Link to="/about-us">{t("header.about_us")}</Link></li>
            <li><Link to="/news">{t("header.news")}</Link></li>
            <li><Link to="/faq">{t("header.faq")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-lg font-semibold pb-5">{t("footer.contacts")}</p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <span className="font-thin">{t("footer.phone")}</span>
              <span>+996 (550) 34 56 77</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-thin">{t("footer.email")}</span>
              <span>example@gmail.com</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold pb-5">{t("footer.social_media")}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2 text-sm">
              <WhatsAppOutlined />
              <span>WhatsApp</span>
            </div>
            <div className="flex gap-2 text-sm">
              <SendOutlined />
              <span>Telegram</span>
            </div>
            <div className="flex gap-2 text-sm">
              <InstagramOutlined />
              <span>Instagram</span>
            </div>
            <div className="flex gap-2 text-sm">
              <FacebookOutlined />
              <span>Facebook</span>
            </div>
            <div className="flex gap-2 text-sm">
              <YoutubeOutlined />
              <span>You Tube</span>
            </div>
          </div>
        </div>
      </div>
      <div className="font-thin flex justify-center gap-1 items-center h-24 border-t border-t-gray-200 mb-20 sm:mb-0">
        <img src={rights} alt="rights" />
        <p>{t("footer.rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
