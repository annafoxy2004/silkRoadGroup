import React from "react";
import ButtonLink from "../ui/atoms/ButtonLink";
import { useTranslation } from "react-i18next";
import arrow from "@/assets/home/arrowicon.svg";

const HomeBlocks = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 py-5 px-10 sm:px-20 xl:px-52">
      <div
        className="w-[400px] h-[400px] text-xl text-white border-none rounded-2xl relative bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url("https://s3-alpha-sig.figma.com/img/a1de/6a1b/0bdb104208bd82c83185b31822cac238?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=d5foVP-u8iR-yS3k6yPJ9rfikhcdlniV67x~oCIfq~p8x8hfLWc5lPGfqhLJFANOi~OI0iV~xkWT~zBnlpYWsYUlCddjdBZhb5nJo~eUAA8UHTKJBgyvcg5ZLrSnMhlKmtHCL7OnUABBESCInfNorjU2vzg-tP1-Jg-z76nIhNW9OROVsgIQQcxrOwnw72RZtnH~bTdIRDCnDlH-~mUX5quv1vBPrk1YlXXp9b-amyv9ZEuCeDqGHG1abGKoL7ssuTqJ7Hx4vPeIGsc8ejv-ebfPMnvhkHRyDaovipMXSbHZIECv5eonpaOHRy-fDD2j0Q9bbDtLBiAntO7RUlODKg__")`,
          backgroundSize: "cover", // Обеспечивает, чтобы изображение не искажалось
          backgroundPosition: "center", // Центрирует изображение в контейнере
        }}
      >
        {/* Полупрозрачный затемняющий слой */}
        <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
        <div className="relative z-10 text-center flex flex-col items-center justify-center gap-3 m-10">
          <h3 className="font-bold text-4xl">{t("header.about_us")}</h3>
          <h4 className="text-sm">{t("home_page.home_block_desc1")}</h4>
          <ButtonLink
            className="mt-7"
            size="xs"
            bg="white"
            to="/about-us"
            title={t("header.about_us")}
            imgSrc={arrow}
          />
        </div>
        {/* Текст поверх фона */}
      </div>

      <div
        className="w-[400px] h-[400px] text-xl text-white border-none rounded-2xl relative bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url("https://s3-alpha-sig.figma.com/img/6927/2a52/528e0ad6309b4a2772d177f17fc0c462?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KpF~C0o8LGqEx2AXNTT9eRF1BjbRjV7kWRuj01O5-xTJIpk7WffrAdH5wmpMOUcMenqprMhmsk5Ygn90GvUcGJo6AC0YT1jqNHWpujVSDmsy8~GiYQ~vQ18Y~DLGrDcuJOzPLJMo9X5h~uDdXOHkJ799FLXmZhJWYSJO82O~-i0seTWtiKP0bWZkaHIViVTCEw2n1ZZNdzVsPNrr6edEpSYTmosciKNWhioHMnL5oNNzKHt4nq0fqVy0M62Ds6QGIcK8yraBM5OliBHNK0ZYLozsHKiDaFMMiiVYOIOzriOYqGTJW~xEufsjcXMrtLwyhirXb-CilpjsUE1wYN1qVg__")`,
          backgroundSize: "cover", // Обеспечивает, чтобы изображение не искажалось
          backgroundPosition: "center", // Центрирует изображение в контейнере
        }}
      >
        {/* Полупрозрачный затемняющий слой */}
        <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
        <div className="relative z-10 text-center flex flex-col items-center justify-center gap-3 m-10">
          <h3 className="font-bold text-4xl">{t("home_page.products")}</h3>
          <h4 className="text-sm">{t("home_page.home_block_desc2")}</h4>
          <ButtonLink
            className="mt-7"
            size="xs"
            bg="white"
            to="/products"
            title={t("home_page.products")}
            imgSrc={arrow}
          />
        </div>
        {/* Текст поверх фона */}
      </div>
    </div>
  );
};

export default HomeBlocks;
