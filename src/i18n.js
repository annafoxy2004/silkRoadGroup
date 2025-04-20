// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const i18nInitPromise = i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "public/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
  });

export { i18nInitPromise };
export default i18n;
