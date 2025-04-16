import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonLink from "../ui/atoms/ButtonLink";
import "./homepage.scss";

const HomeBanner = () => {
  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 750);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-10 w-full h-96 ">
      <div className="banner h-full border-none rounded-3xl">
        <div
          className={
            isMobile
              ? "banner-block2 bg-[#20A647] border-none rounded-xl p-7"
              : "banner-block bg-[#20A647] border-none rounded-xl p-7"
          }
        >
          <div className=" w-full sm:w-3/4 lg:w-1/2 flex flex-col items-start justify-center gap-6 sm:gap-8">
            <h1 className="font-medium text-white text-2xl sm:text-4xl ">
              {t("home_page.banner_title")}
            </h1>
            <h2 className="text-xs sm:text-sm text-white font-normal">
              {t("home_page.banner_description")}
            </h2>
            <ButtonLink
              title={t("home_page.to_shop")}
              bg="white"
              to={"/products"}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
