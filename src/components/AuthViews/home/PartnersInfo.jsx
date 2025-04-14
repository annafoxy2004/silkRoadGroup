import udemy_logo from "@/assets/PartnersLogo/udemy_logo.png";
import coursera_logo from "@/assets/PartnersLogo/coursera_logo.svg";
import khan_academy_logo from "@/assets/PartnersLogo/khan_academy_logo.png";
import udacity_logo from "@/assets/PartnersLogo/udacity_logo.png";
import kadenze_logo from "@/assets/PartnersLogo/kadenze_logo.png";
import { useTranslation } from "react-i18next";

const PartnersInfo = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f0f0f0] px-6 sm:px-12 md:px-[150px] py-[100px]">
      <div className="flex flex-col items-center text-center gap-[50px]">
        <div className="flex flex-col gap-[18px]">
          <h1 className="text-[36px] text-[#151515] uppercase">
            {t("home_page.partners_title")}
          </h1>
          <p className="text-[14px] sm:text-[16px] text-[#151515c4]">
            {t("home_page.partners_description")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-[86px] gap-y-[25px]">
          <img src={udemy_logo} alt="Udemy"  />
          <img src={coursera_logo} alt="Coursera" className="h-10 md:h-12" />
          <img src={khan_academy_logo} alt="Khan Academy" className="h-10 md:h-12" />
          <img src={udacity_logo} alt="Udacity" className="h-10 md:h-12" />
          <img src={kadenze_logo} alt="Kadenze" className="h-10 md:h-12" />
        </div>
      </div>
    </div>
  );
};

export default PartnersInfo;
