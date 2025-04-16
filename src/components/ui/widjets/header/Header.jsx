import React, { useEffect, useState } from "react";
import Discount from "./top/Discount";
import HeaderMiddle from "./middle/HeaderMiddle";
import HeaderBottom from "./bottom/HeaderBottom";
import HeaderBottomMobile from "./bottom/HeaderBottomMobile";
import { useLocation } from "react-router-dom";
import AuthHeader from "./authHeader/AuthHeader";
import useAuthStore from "@/store/auth/authStore";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const location = useLocation();
  const { refreshToken } = useAuthStore();

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 450);
  };

  useEffect(() => {
    refreshToken()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Скрываем на /login и /signup
  const hideHeader = ["/login", "/signup"].includes(location.pathname);
  if (hideHeader) return <AuthHeader/>

  return (
    <nav className="fixed top-0 z-20 w-full">
      <Discount />

      <HeaderMiddle />
      {isMobile ? (
        <>
          <HeaderBottomMobile />
        </>
      ) : (
        <>
          <HeaderBottom />
        </>
      )}
    </nav>
  );
};

export default Header;
