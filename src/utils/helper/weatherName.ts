import weatherCode from "../../constants/weatherCode";

export const handleWeatherName = (code: number, lang: "en" | "fa") => {
    let temp = weatherCode.filter((item) => {
      return item[0] === code;
    });
    if (lang === "en") {
      return temp[0][1];
    } else if (lang === "fa") {
      return temp[0][2];
    }
  };