import React from "react";
import partner1 from "@/assets/about/2025-04-24 01.34.20.jpg";
import partner2 from "@/assets/about/2025-04-24 01.34.30.jpg";
import partner3 from "@/assets/about/2025-04-24 01.34.34.jpg";
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
          <ul className="flex space-x-4 py-4 min-w-[600px]">
            <li className="flex flex-col items-start justify-start gap-1">
              <img
                src={partner1}
                alt="partner"
                className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-none rounded-lg object-cover"
              />
              <span className="font-semibold text-lg">
                {t("about.partner1")}
              </span>
              <span className="text-sm font-normal">{t("about.desc1")}</span>
            </li>
            <li className="flex flex-col items-start justify-start gap-1">
              <img
                src={partner2}
                alt="partner"
                className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-none rounded-lg object-cover"
              />
              <span className="font-semibold text-lg">
                {t("about.partner2")}
              </span>
              <span className="text-sm font-normal">{t("about.desc2")}</span>
            </li>
            <li className="flex flex-col items-start justify-start gap-1">
              <img
                src={partner3}
                alt="partner"
                className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-none rounded-lg object-cover"
              />
              <span className="font-semibold text-lg">
                {t("about.partner3")}
              </span>
              <span className="text-sm font-normal">{t("about.desc3")}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPartners;
