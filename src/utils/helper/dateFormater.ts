type Language = "en" | "fa";

function formatTime(date: Date, language: "fa" | "en" = "en"): string {
  if (language === "fa") {
    // تقویم جلالی واقعی + اعداد فارسی
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } else {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }
}


function getCurrentWeekday(): string {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  return currentDate.toLocaleDateString("en-US", options);
}

function getDayOfWeek(
  dateString: string,
  language: Language,
  todayIgnore = false
): string {
  const date = new Date(dateString);
  const today = new Date();

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const daysEn = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysFa = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ];

  if (!todayIgnore) {
    if (isToday) {
      return language === "en" ? "Today" : "امروز";
    }
  }
  const dayIndex = date.getDay();
  return language === "en" ? daysEn[dayIndex] : daysFa[dayIndex];
}
export { formatTime, getCurrentWeekday, getDayOfWeek };



