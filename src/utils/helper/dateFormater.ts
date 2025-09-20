type Language = "en" | "fa";

function formatTime(date: Date, language: Language = "en"): string {
  if (language === "fa") {
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; 
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`; 
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



