import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: {
        title: "Login",
        placeholder: "Enter Your Name",
      },
    },
  },
  fa: {
    translation: {
      login: {
        title: "ورود",
        placeholder: "نام خود را وارد کنید",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
