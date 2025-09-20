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
        title: "login",
        placeholder: "user name",
        errorRequired: "user name is required",
        welcome: "welcome",
      },
      header:{
        title:"Weather Dashboard",
        popover:{
          mode:"Mode",
          language:"Language",
           themeDarkBtn:"Dark",
           themeLightBtn:"Light",
           languageFaBtn:"Fa",
           languageEnBtn:"En",
           
           exitBtn:"Exit"
        }
      },
      footer:{
        title:"developer: mahdi montazeri",
        contact:"contact me : mahdi.montazeri.dev@gmail.com"
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
        title: "ورود",
        placeholder: "نام کاربری",
        errorRequired: "نام اجباری میباشد",
        welcome: "خوش آمدید",
      },
      header:{
        title:"داشبورد آب و هوا",
        popover:{
          mode:"حالت",
          language:"زبان",
           themeDarkBtn:"تاریک",
           themeLightBtn:"روشن",
           languageFaBtn:"فارسی",
           languageEnBtn:"انگلیسی",
           
           exitBtn:"خروج"
        }
      },
      footer:{
        title:"توسعه دهنده: محمد مهدی منتظری",
        contact:"تماس با ما : mahdi.montazeri.dev@gmail.com"
      },
      dashboard:{
        title:"پیش بینی دو هفته"
      },
      popover:{

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
