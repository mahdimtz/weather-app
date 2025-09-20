import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Stack,
  Typography,
  IconButton,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
} from "@mui/material";
// Grid and Grid2 are removed
import Header from "../components/layout/header/header";
import Footer from "../components/layout/footer/footer";
import { useAppContext } from "../context/app/app-context";
import { getDayOfWeek } from "../utils/helper/dateFormater";
import { handleIconWeather } from "../utils/helper/weatherIcon";
import { handleWeatherName } from "../utils/helper/weatherName";
import { httpService } from "../core/http-service";
import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// --- تابع جدید برای فرمت کردن فقط ساعت ---
const formatHour = (dateString: string, language: "fa" | "en" = "en"): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(language === 'fa' ? 'fa-IR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};


// --- تایپ برای کامپوننت ساعتی ---
type HourlyWeatherCardProps = {
  time: string;
  temp: number;
  icon: React.ReactNode;
};

// --- کامپوننت کوچک برای نمایش کارت‌های ساعتی ---
const HourlyWeatherCard = ({ time, temp, icon }: HourlyWeatherCardProps) => {
  const { language } = useAppContext();
  return (
    <Stack
      alignItems="center"
      spacing={1.5}
      sx={(theme) => ({
        padding: "16px 8px",
        borderRadius: "16px",
        minWidth: "80px",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.05)",
      })}
    >
      <Typography variant="body2" sx={{ fontWeight: "500" }}>
        {formatHour(time, language)}
      </Typography>
      {icon}
      <Typography variant="h6">{Math.round(temp)}&#8451;</Typography>
    </Stack>
  );
};

// --- کامپوننت نمودار ساعتی ---
const HourlyTempChart = ({ data, theme }: { data: any[]; theme: any }) => {
  const chartData = data.map((item) => ({
    time: formatHour(item.time, "en"),
    temp: item.temp,
  }));

  const gradientId = "tempGradient";
  const chartColor = theme.palette.mode === 'light' ? theme.palette.action.active : theme.palette.primary.main;

  return (
    <Box sx={{ height: 200, width: "100%" }}>
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 25, bottom: 5 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
            ticks={['00:00', '06:00', '12:00', '18:00', '23:00']}
          />
          <YAxis 
            stroke={theme.palette.text.secondary} 
            tick={{ fontSize: 12 }} 
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              borderRadius: "10px",
            }}
            labelStyle={{ color: theme.palette.text.primary }}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke={chartColor}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            name="دما"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

// --- کامپوننت برای نمایش جزئیات بیشتر ---
const DetailItem = ({ icon, value, unit, label }: { icon: React.ReactNode, value: string | number, unit: string, label: string }) => (
    <Stack 
      spacing={1} 
      alignItems="center" 
      justifyContent="center" 
      sx={(theme) => ({ 
        height: '100%', 
        color: theme.palette.text.secondary 
      })}
    >
      {icon}
      <Typography variant="h6" component="p" fontWeight="500" color="text.primary">
          {value}
          <Typography component="span" variant="body2" sx={{ ml: 0.5 }} color="text.secondary">{unit}</Typography>
      </Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Stack>
);


// --- صفحه‌ی اصلی جزئیات ---
const WeatherDetail = () => {
  const { state } = useLocation();
  const { date } = useParams();
  const navigate = useNavigate();
  const { language } = useAppContext();
  const theme = useTheme();

  const [hourlyData, setHourlyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  if (!state || !state.location) {
    useEffect(() => {
      navigate("/dashboard");
    }, [navigate]);
    return null;
  }

  const { location, dayWeather } = state;

  useEffect(() => {
    const getHourlyInfo = async () => {
      setLoading(true);
      try {
        const response = await httpService({
          url: `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,precipitation_probability,wind_speed_10m&start_date=${date}&end_date=${date}`,
        });
        if (response?.data) {
          setHourlyData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getHourlyInfo();
  }, [date, location.lat, location.lon]);

  const locationName = location.display_name.split(",")[0].trim();
  
  const chartFormattedData = hourlyData?.hourly?.time.map((t: string, i: number) => ({
      time: t,
      temp: hourlyData.hourly.temperature_2m[i],
  })) || [];

  // پیدا کردن داده‌های ساعت فعلی
  let currentHourIndex = 0;
  if(hourlyData) {
    const now = new Date();
    currentHourIndex = hourlyData.hourly.time.findIndex((t: string, i: number) => {
        const nextHour = hourlyData.hourly.time[i + 1];
        return new Date(t) <= now && (!nextHour || new Date(nextHour) > now);
    });
    if (currentHourIndex === -1) currentHourIndex = 0;
  }

  return (
    <>
      <Header
        language={language}
        selectedCity={state.locationName || "Tehran"}
        handleCityChange={() => navigate("/dashboard")}
        setMode={() => {}}
      />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Stack spacing={4}>
          <Card
            sx={{
              borderRadius: "24px",
              padding: { xs: 1, sm: 3 },
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.main,
            }}
          >
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={{ xs: 3, sm: 2 }}
              >
                <Box>
                  <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </IconButton>
                  <Typography variant="h4" fontWeight="bold">{locationName}</Typography>
                  <Typography variant="h6">{getDayOfWeek(date!, language, true)}</Typography>
                </Box>
                <Stack alignItems="center">
                  {handleIconWeather(dayWeather.weather_code, "100px", "100px")}
                  <Typography variant="h5" fontWeight="500">{handleWeatherName(dayWeather.weather_code, language)}</Typography>
                </Stack>
                <Stack alignItems={{ xs: "center", sm: "flex-end" }} spacing={1}>
                  <Typography variant="h3" fontWeight="bold">{Math.round(dayWeather.temp_max)}&#8451;</Typography>
                  <Typography variant="body1">
                    {language === "en" ? "High" : "بیشینه"}: {Math.round(dayWeather.temp_max)}&#8451; / {language === "en" ? "Low" : "کمینه"}: {Math.round(dayWeather.temp_min)}&#8451;
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
            
          {loading ? (
              <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "380px" }}>
                <CircularProgress />
              </Stack>
            ) : (
            <>
            {/* بخش جزئیات بیشتر با استفاده از Box و CSS Grid */}
            <Card sx={{ borderRadius: "24px", padding: { xs: 2, sm: 3 }, backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.primary.main, }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                    gap: { xs: 2, sm: 3 },
                  }}
                >
                    <DetailItem icon={<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-2.22 19.88a10 10 0 0 0 4.44 0A10 10 0 0 0 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m-1-4h2v-6H9v2h2m-4-2c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.85-1.26-3.42-3-3.87V8H9v2.13c-1.74.45-3 2.02-3 3.87Z"/></svg>} value={Math.round(hourlyData.hourly.apparent_temperature[currentHourIndex])} unit="°C" label={language === 'fa' ? 'دمای محسوس' : 'Feels Like'} />
                    <DetailItem icon={<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 0 0 8-8c0-4.42-3.58-8-8-8s-8 3.58-8 8a8 8 0 0 0 8 8m5.41-11.59L12 12.83l-3.41-3.42L7.17 10l4.83 4.83L18.83 8.41L17.41 7Z"/></svg>} value={hourlyData.hourly.precipitation_probability[currentHourIndex]} unit="%" label={language === 'fa' ? 'احتمال بارش' : 'Precipitation'} />
                    <DetailItem icon={<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17.29 11.29a1 1 0 0 0-1.41 0L13 14.17V3a1 1 0 0 0-2 0v11.17l-2.88-2.88a1 1 0 0 0-1.42 1.42l4.59 4.58a1 1 0 0 0 1.41 0l4.59-4.58a1 1 0 0 0 0-1.42M5 20a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H6a1 1 0 0 0-1 1"/></svg>} value={hourlyData.hourly.relative_humidity_2m[currentHourIndex]} unit="%" label={language === 'fa' ? 'رطوبت' : 'Humidity'}/>
                    <DetailItem icon={<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 6a1 1 0 0 0-1 1v3.34a3 3 0 0 0-3.56 2.45a1 1 0 1 0 2 .33a1 1 0 0 1 1.08.92a1 1 0 0 0 1.95 0a1 1 0 0 1 1.08-.92a1 1 0 1 0 2-.33A3 3 0 0 0 13 10.34V7a1 1 0 0 0-1-1m-7.5 7.5A4.5 4.5 0 0 0 9 17.9v1.6a1 1 0 1 0 2 0v-1.6A4.5 4.5 0 0 0 15.5 13.5a1 1 0 1 0-2 0a2.5 2.5 0 0 1-5 0a1 1 0 1 0-2 0"/></svg>} value={Math.round(hourlyData.hourly.wind_speed_10m[currentHourIndex])} unit="km/h" label={language === 'fa' ? 'سرعت باد' : 'Wind Speed'}/>
                </Box>
            </Card>

            {/* بخش نمودار و پیش‌بینی ساعتی */}
            <Box
                sx={{
                padding: { xs: 2, sm: 3 },
                borderRadius: "24px",
                backgroundColor:
                    theme.palette.mode === "dark"
                    ? theme.palette.secondary.dark
                    : theme.palette.primary.main,
                }}
            >
                <Stack spacing={4}>
                    <Typography variant="h6" fontWeight="bold">{language === "en" ? "Temperature Trend" : "روند تغییرات دما"}</Typography>
                    <HourlyTempChart data={chartFormattedData} theme={theme} />
                    <Typography variant="h6" fontWeight="bold">{language === "en" ? "Hourly Forecast" : "پیش‌بینی ساعتی"}</Typography>
                    <Box sx={(theme) => ({ 
                        overflowX: "auto",
                        '&::-webkit-scrollbar': {
                            height: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                        }
                    })}>
                        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
                          {hourlyData?.hourly?.time.map((time: string, index: number) => (
                              <HourlyWeatherCard
                              key={time}
                              time={time}
                              temp={hourlyData.hourly.temperature_2m[index]}
                              icon={handleIconWeather(hourlyData.hourly.weather_code[index])}
                              />
                          ))}
                        </Box>
                    </Box>
                </Stack>
            </Box>
            </>
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default WeatherDetail;

