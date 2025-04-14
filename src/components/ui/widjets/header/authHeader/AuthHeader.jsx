import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import BtnLanguages from "../top/BtnLanguages";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AuthHeader = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 580);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 580);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="px-3 sm:px-14 py-5 h-20 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] w-full bg-white flex justify-center sm:justify-between items-center">
      {isMobile ? (
        <></>
      ) : (
        <>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </>
      )}
      <div className="flex justify-end items-center gap-2 sm:gap-5">
        <BtnLanguages />
        <Link
          to="/login"
          className="focus:border focus:border-black rounded-3xl text-black font-semibold p-2 sm:p-3"
        >
          {t("header.login")}{" "}
        </Link>
        <Link
          to="/signup"
          className="focus:border focus:border-black rounded-3xl text-black font-semibold p-2 sm:p-3"
        >
          {t("header.signup")}
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
