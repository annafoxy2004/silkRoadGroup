import React from "react";
import { useTranslation } from "react-i18next";
import carpet1 from "@/assets/about/carpet1.svg";
import carpet2 from "@/assets/about/carpet2.svg";
import logo1 from "@/assets/about/logo1.svg";
import logo2 from "@/assets/about/logo2.svg";

const AboutUsMain = () => {
  const { t } = useTranslation();

  return (
    <div className="px-10 py-5">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col justify-center items-center gap-7 md:flex-row py-10 xl:px-20">
          <div className="flex flex-col gap-2 sm:w-1/2">
            <p className="font-semibold text-2xl md:text-5xl">
              {t("about.top1")}
            </p>
            <div className="flex flex-row items-center flex-nowrap gap-1">
              <img src={logo1} alt="logo" className="h-[30px] sm:h-[50px]" />
              <p className="font-semibold text-2xl md:text-5xl ">
                {t("about.top2")}
              </p>
              <img src={logo2} alt="logo" className="h-[30px] sm:h-[40px]" />
            </div>
          </div>
          <p className="font-light text-base sm:text-lg text-black sm:w-1/2 ">
            {t("about.top3")}
          </p>
        </div>
        <img
          src={carpet1}
          alt="carpet1"
          className="border-none rounded-xl h-96 sm:max-h-none w-full object-cover"
        />
      </div>

      <div className="py-10 flex flex-col md:flex-row">
        <div className="flex flex-col gap-7 md:w-1/2">
          <p className="font-medium text-xl">{t("about.mid1")}</p>
          <p className="font-semibold text-4xl">{t("about.mid2")}</p>
          <div className="flex flex-col md:flex-row gap-2">
            <p className="font-semibold text-lg md:w-1/2">{t("about.mid3")}</p>
            <p className="text-base font-light md:w-1/2">{t("about.mid4")}</p>
          </div>
        </div>
        <div className="flex justify-center items-center md:w-1/2">
          <img src={carpet2} alt="carpet2" className="h-[200px] md:h-[300px]" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        <div className="p-4 border-2 border-gray-200 border-b-0 border-l-0 flex flex-col">
          <span className="font-medium text-lg">lorem ipsum</span>
          <span className="font-semibold text-5xl">7</span>
        </div>
        <div className="p-4 border-2 border-gray-200  border-b-0 border-l-0 flex flex-col">
          <span className="font-medium text-lg">lorem ipsum</span>
          <span className="font-semibold text-5xl">300к</span>
        </div>
        <div className="p-4 border-2 border-gray-200  border-b-0 border-l-0 flex flex-col">
          <span className="font-medium text-lg text-[#28C656]">lorem ipsum</span>
          <span className="font-semibold text-5xl text-[#28C656]">365</span>
        </div>
        <div className="p-4 border-2 border-gray-200  border-b-0 border-l-0 flex flex-col">
          <span className="font-medium text-lg">lorem ipsum</span>
          <span className="font-semibold text-5xl">360к</span>
        </div>
        <div className="p-4 border-2 border-gray-200  border-b-0 border-r-0 border-l-0 flex flex-col">
          <span className="font-medium text-lg">lorem ipsum</span>
          <span className="font-semibold text-5xl">65</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUsMain;
