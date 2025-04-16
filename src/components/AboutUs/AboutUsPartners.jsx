import React from "react";
import partner1 from "@/assets/about/Partner1.svg";
import partner2 from "@/assets/about/Partner2.svg";
import partner3 from "@/assets/about/Partner3.svg";
import partner4 from "@/assets/about/Partner4.svg";
import { useTranslation } from "react-i18next";

const AboutUsPartners = () => {
  const { t } = useTranslation();
  return (
    <div className="px-10 py-16 lg:flex flex-col items-center">
      <div>
        <div className="text-start mb-4">
          <p className="font-semibold text-4xl mb-2">{t("about.our")}</p>
          <p className="font-normal text-base">{t("about.desc")}</p>
        </div>

        <div className="w-full overflow-x-auto">
          <ul className="flex space-x-4 py-4 min-w-[900px]">
            {[partner1, partner2, partner3, partner4].map((partner, index) => (
              <li
                key={index}
                className="flex flex-col items-start justify-start gap-1"
              >
                <img
                  src={partner}
                  alt="partner"
                  className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-none rounded-lg"
                />
                <span className="font-semibold text-lg">Carlos Mendez</span>
                <span className="text-sm font-normal">Founder&CEO</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPartners;
