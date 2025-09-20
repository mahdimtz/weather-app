import React, { useEffect, useRef, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

type Props = {
  latitude?: number | string;
  longitude?: number | string;
  days?: number; // default 30
  locale?: "fa" | "en";
};

const toNumber = (v: any): number => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const s = v.trim().replace(",", ".");
    return s === "" ? NaN : Number(s);
  }
  return NaN;
};

const validLat = (n: number) => Number.isFinite(n) && n >= -90 && n <= 90;
const validLon = (n: number) => Number.isFinite(n) && n >= -180 && n <= 180;

const MonthlyTempChart: React.FC<Props> = ({
  latitude,
  longitude,
  days = 30,
  locale = "fa",
}) => {
  const [dailyTemps, setDailyTemps] = useState<number[] | null>(null);
  const [dailyDates, setDailyDates] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  
  // Helper to format date to just the day number for better readability
  const getDay = (dateString: string, localeStr: string) => {
      const date = new Date(dateString);
      // Use fa-IR-u-nu-latn to ensure latin numbers for Persian dates
      const formatLocale = localeStr === 'fa' ? 'fa-IR-u-nu-latn' : 'en-US';
      return date.toLocaleDateString(formatLocale, { day: 'numeric' });
  };


  useEffect(() => {
    const lat = toNumber(latitude);
    const lon = toNumber(longitude);

    if (!validLat(lat) || !validLon(lon)) {
      setError(locale === "fa" ? "مختصات نامعتبر" : "Invalid coordinates");
      setDailyTemps(null);
      setDailyDates(null);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setDailyTemps(null);
      setDailyDates(null);

      try {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - (days - 1));

        const startStr = start.toISOString().split("T")[0];
        const endStr = end.toISOString().split("T")[0];

        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startStr}&end_date=${endStr}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`HTTP ${res.status} — ${txt}`);
        }

        const json = await res.json();
        const daily = json?.daily;
        if (
          !daily ||
          !daily.time ||
          !daily.temperature_2m_max ||
          !daily.temperature_2m_min
        ) {
          console.error("Invalid daily data:", daily);
          throw new Error(locale === "fa" ? "داده روزانه نامعتبر" : "Invalid daily data");
        }

        const temps: number[] = [];
        const dates: string[] = [];

        daily.time.forEach((dateStr: string, idx: number) => {
          const max = daily.temperature_2m_max?.[idx];
          const min = daily.temperature_2m_min?.[idx];
          if (typeof max === "number" && typeof min === "number") {
            temps.push(Number(((max + min) / 2).toFixed(1))); // میانگین دما
            dates.push(dateStr);
          }
        });

        if (temps.length === 0) {
          throw new Error(locale === "fa" ? "رکورد دمایی وجود ندارد" : "No temperature records");
        }
        
        setDailyTemps(temps);
        setDailyDates(dates);
      } catch (err: any)
      {
        if (err.name === "AbortError") return;
        console.error("MonthlyTempChart fetch error:", err);
        setError(err.message || (locale === "fa" ? "خطا در دریافت داده‌ها" : "Failed to fetch data"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      ac.abort();
    };
  }, [latitude, longitude, days, locale]);

  return (
    <Box>
     

      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : dailyTemps && dailyDates ? (
        <LineChart
          height={300}
          xAxis={[{
              data: dailyDates.map((d) => getDay(d, locale)),
              scaleType: 'point',
              tickLabelStyle: {
                  fontSize: 10,
              }
          }]}
          yAxis={[{
              label: locale === 'fa' ? '(°C) دما' : 'Temp (°C)'
          }]}
          series={[{ 
              id: "temp", 
              data: dailyTemps, 
              showMark: true,
              valueFormatter: (value) => value == null ? '' : `${value}°`,
          }]}
          legend={{ hidden: true }}
          sx={{
             '.MuiChartsAxis-label': {
                  transform: locale === 'fa' ? 'translateX(-25px)' : 'translateX(-35px)',
              },
              '.MuiCharts-markLabel': {
                  transform: 'translateY(-8px)', // Move label 8px up
                  fontSize: '10px',
              },
              '.MuiChartsAxis-directionX .MuiChartsAxis-tickLabel': {
                  transform: 'translateY(5px)', // Move X-axis tick labels 5px down
              },
              '.MuiChartsAxis-directionY .MuiChartsAxis-tickLabel': {
                  transform: 'translateX(-10px)', // Move Y-axis tick labels 10px left
              },
          }}
        />
      ) : (
        <Typography>
          {locale === "fa" ? "داده‌ای موجود نیست" : "No data available"}
        </Typography>
      )}
    </Box>
  );
};

export default MonthlyTempChart;