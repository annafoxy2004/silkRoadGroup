import { useState } from "react";
import arrowDown from "@/assets/faq/arrows/arrow-down.svg";
import arrowUp from "@/assets/faq/arrows/arrow-up.svg";
import { useTranslation } from "react-i18next";

export const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const { t } = useTranslation();

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const questions = [
    {
      number: t("faq.q1.number"),
      question: t("faq.q1.text1"),
      answer: t("faq.q1.text2"),
    },
    {
      number: t("faq.q2.number"),
      question: t("faq.q2.text1"),
      answer: t("faq.q2.text2"),
    },
    {
      number: t("faq.q3.number"),
      question: t("faq.q3.text1"),
      answer: t("faq.q3.text2"),
    },
    {
      number: t("faq.q4.number"),
      question: t("faq.q4.text1"),
      answer: t("faq.q4.text2"),
    },
    {
      number: t("faq.q5.number"),
      question: t("faq.q5.text1"),
      answer: t("faq.q5.text2"),
    },
    {
      number: t("faq.q6.number"),
      question: t("faq.q6.text1"),
      answer: t("faq.q6.text2"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center px-5 sm:px-10 py-10 bg-white w-full rounded-xl mx-auto bg-cover">
      <div className="max-w-[1328px] text-center">
        <p className="text-3xl font-semibold mb-8 px-10 text-[#2a2d35] sm:text-5xl">
          {t("faq.title1")}
        </p>
        <p className="text-lg font-light mb-8 px-10 text-[#2a2d35] sm:text-xl">
          {t("faq.title2")}
        </p>

        <div className="flex flex-col gap-6 items-center w-full">
          {questions.map((item, index) => (
            <div
              key={index}
              className={`max-w-7xl lg:w-full bg-white border-t border-t-gray-200 cursor-pointer transition-all duration-300 px-10 py-5 ${
                openQuestion === index
                  ? "z-10 h-auto flex flex-col justify-center gap-4"
                  : ""
              }`}
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex justify-between items-center gap-2 text-sm font-medium text-gray-900 md:text-xl lg:text-2xl">
                <span className="font-light">{item.number}</span>
                <span className="flex-1 text-center">{item.question}</span>
                <img
                  src={openQuestion === index ? arrowUp : arrowDown}
                  alt="Arrow Icon"
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    openQuestion === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out text-gray-600 text-sm md:text-xl lg:text-2xl mt-4 ${
                  openQuestion === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
