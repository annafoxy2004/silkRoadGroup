// components/BurgerMenu.jsx
import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavSearch from "./NavSearch";
import search from "@/assets/header/search.svg";
import NavFavorites from "./NavFavorites";
import NavCart from "./NavCart";

const BurgerMenu = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <>
      <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: "24px" }} />}
        onClick={showDrawer}
      />
      <Drawer placement="bottom" onClose={onClose} open={open}>
        <div className="flex flex-col  items-center gap-4">

          <div className="nav-search flex items-center w-full max-w-sm px-4 py-2 bg-gray-200 rounded-lg">
            <img
              src={search}
              alt="search"
              className="text-gray-500 w-5 h-5 mr-2"
            />
            <input
              type="text"
              placeholder={t("header.search_placeholder")}
              className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <NavFavorites />
            <NavCart />
          </div>

        </div>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
