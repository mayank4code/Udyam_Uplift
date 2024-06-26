
import i18n from "i18next";
import {initReactI18next } from "react-i18next";

import tEnglish from '../locales/english/translation.json';
import tHindi from '../locales/hindi/translation.json';
import tOdia from '../locales/odia/translation.json';
import tMarathi from '../locales/marathi/translation.json';
import tBangla from '../locales/bangla/translation.json';




i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: tEnglish
      },
      hi: {
        translation: tHindi
      },
      od: {
        translation: tOdia
      },
      ma: {
        translation: tMarathi
      },
      ba: {
        translation: tBangla
      },

    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

