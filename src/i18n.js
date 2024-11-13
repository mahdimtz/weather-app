import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: {
        title: "Login",
        placeholder: "Enter Your Name",
        label: "language",
        languageFa: "persian",
        languageEn: "english",
      },
      header:{
        title:"Weather Dashboard",
        popover:{
          mode:"Mode",
          language:"Language"
        }
      },
      footer:{
        title:"All rights of this site are reserved for Nadin Sadr Aria Engineering Company.",
        contact:"contact us : info@nadin.ir"
      },
      dashboard:{
        title:"2 weeks Forecast"
      }
    },
  },
  fa: {
    translation: {
      login: {
        title: "ورود",
        placeholder: "نام خود را وارد کنید",
        label: "زبان",
        languageFa: "فارسی",
        languageEn: "انگلیسی",
      },
      header:{
        title:"داشبورد آب و هوا",
        popover:{
          mode:"حالت",
          language:"زبان"
        }
      },
      footer:{
        title:"همه حقوق این سایت برای شرکت مهندسی نادین صدر آریا محفوظ است.",
        contact:"تماس با ما : info@nadin.ir"
      },
      dashboard:{
        title:"پیش بینی دو هفته"
      }
      
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
