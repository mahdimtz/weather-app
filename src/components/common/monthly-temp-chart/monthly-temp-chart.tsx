import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, useTheme, CircularProgress, Stack } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  latitude?: number | string;
  longitude?: number | string;
  days?: number;   
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
  const [dailyData, setDailyData] = useState<{ day: string; temp: number }[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const theme = useTheme();

  const getDay = (dateString: string, localeStr: string) => {
    const date = new Date(dateString);
    const formatLocale = localeStr === 'fa' ? 'fa-IR-u-nu-latn' : 'en-US';
    return date.toLocaleDateString(formatLocale, { day: 'numeric' });
  };

  useEffect(() => {
    const lat = toNumber(latitude);
    const lon = toNumber(longitude);

    if (!validLat(lat) || !validLon(lon)) {
      setError(locale === "fa" ? "مختصات نامعتبر" : "Invalid coordinates");
      setDailyData(null);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setDailyData(null);

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
        if (!daily || !daily.time || !daily.temperature_2m_max || !daily.temperature_2m_min) {
          throw new Error(locale === "fa" ? "داده روزانه نامعتبر" : "Invalid daily data");
        }

        const formattedData = daily.time.map((dateStr: string, idx: number) => {
          const max = daily.temperature_2m_max?.[idx];
          const min = daily.temperature_2m_min?.[idx];
          if (typeof max === "number" && typeof min === "number") {
            return {
              day: getDay(dateStr, locale),
              temp: Number(((max + min) / 2).toFixed(1)),
            };
          }
          return null;
        }).filter(Boolean) as { day: string; temp: number }[];


        if (formattedData.length === 0) {
          throw new Error(locale === "fa" ? "رکورد دمایی وجود ندارد" : "No temperature records");
        }
        
        setDailyData(formattedData);
      } catch (err: any) {
        if (err.name === "AbortError") return;
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

  const gradientId = "monthlyTempGradient";
  const chartColor = theme.palette.mode === 'light' ? theme.palette.action.active : theme.palette.primary.main;

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ height: 300 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!dailyData) {
    return <Typography>{locale === "fa" ? "داده‌ای موجود نیست" : "No data available"}</Typography>;
  }

  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <ResponsiveContainer>
        <AreaChart 
            data={dailyData}
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            stroke={theme.palette.text.secondary}
            tick={{ fontSize: 10 }}
            />
          <YAxis 
            stroke={theme.palette.text.secondary}
            tick={{ fontSize: 10 }}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              borderRadius: "10px",
            }}
            labelStyle={{ color: theme.palette.text.primary }}
            formatter={(value: number) => [`${value}°C`, locale === 'fa' ? 'میانگین دما' : 'Avg Temp']}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke={chartColor}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthlyTempChart;
