import React, { useState, useEffect } from "react";
import logo from "@/assets/logo.svg";
import catalog from "@/assets/header/catalogIcon.svg";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import NavSearch from "./NavSearch";
import NavLoginBtn from "./NavLoginBtn";
import BurgerMenu from "./BurgerMenu";
import NavFavorites from "./NavFavorites";
import NavCart from "./NavCart";

const HeaderMiddle = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 900);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="border-b border-b-gray-200 flex flex-row items-center justify-around bg-white">
      {isMobile ? (
        <>
          <div className="flex flex-row items-center gap-5">
            <img src={logo} alt="logo" className="my-2 mr-0 lg:mr-16" />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row items-center gap-5">
            <img src={logo} alt="logo" className="my-2 mr-0 lg:mr-16" />
            <Button
              style={{
                color: "white",
                backgroundColor: "#20A647",
                fontWeight: 500,
              }}
              size="large"
              icon={<img src={catalog} alt="catalog" />}
            >
              {t("header.catalog")}
            </Button>
            <NavSearch />
          </div>
        </>
      )}

      {isMobile ? (
        <>
          <div className="flex flex-row items-center justify-end gap-7">
            <NavLoginBtn />
            <BurgerMenu />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row items-center justify-end gap-7">
            <NavFavorites />
            <NavCart />
            <NavLoginBtn />
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderMiddle;
