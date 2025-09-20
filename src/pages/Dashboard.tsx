import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
  useColorScheme,
} from "@mui/material";
import Header from "../components/layout/header/header";
import IconLocation from "../assets/icons/IconLocation";
import { useEffect, useState } from "react";
import { formatTime, getDayOfWeek } from "../utils/helper/dateFormater";
import Footer from "../components/layout/footer/footer";
import WeatherCard from "../components/common/weather-card/weather-card";
import { findExtreme } from "../utils/helper/findNumber";
import { useAppContext } from "../context/app/app-context";
import { useTranslation } from "react-i18next";
import { handleIconWeather } from "../utils/helper/weatherIcon";
import { handleWeatherName } from "../utils/helper/weatherName";
import { httpService } from "../core/http-service";
import MainWeatherSkeleton from "../components/common/skeleton/main-weather-card-skeleton";
import MonthlyTempChart from "../components/common/monthly-temp-chart";

const API_KEY = import.meta.env.VITE_API_KEY;

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Tehran");
  const [location, setLocation] = useState<Location>();
  const [weather, SetWeather] = useState<Weather>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { language } = useAppContext();
  const { setMode } = useColorScheme();
  const { t } = useTranslation();

  const getLocationInfo = async (location?: string) => {
    try {
      const response = await httpService({
        url: `https://geocode.maps.co/search?q=${
          location || selectedCity
        }&api_key=${API_KEY}`,
      });

      if (response?.data) setLocation(response?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSelectedCity(event.target.value);
    getLocationInfo(event.target.value).finally(() => setIsLoading(false));
  };

  const getWeatherInfo = async () => {
    try {
      const response = await httpService({
        url: `https://api.open-meteo.com/v1/forecast?latitude=${location?.lat}&longitude=${location?.lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=14`,
      });
      if (response?.data) SetWeather(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getLocationInfo().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (location) {
      setIsLoading(true);
      getWeatherInfo().finally(() => setIsLoading(false));
    }
  }, [location]);

  

  return (
    <>
      <Header
        language={language}
        handleCityChange={handleCityChange}
        selectedCity={selectedCity}
        setMode={setMode}
      />
      <Container maxWidth={"xl"} sx={{ marginTop: "28px" }}>
        <Stack sx={{ flexDirection: { md: "row", xs: "col" }, gap: "41px" }}>
          
           { isLoading || !weather ? 
              <MainWeatherSkeleton />
              :
              <Stack
            sx={(theme) => ({
              borderRadius: "24px",
              width: { xl: "607px", md: "50%" },
              minHeight: "234px",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.main,
              color: theme.palette.mode === "dark" ? "#fff" : "#003464",
            })}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
                padding: "20px 24px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={location?.display_name.split(",")[0].trim()}
                    icon={<IconLocation />}
                    sx={{
                      width: "173px",
                      height: "40px",
                      borderRadius: "50px",
                      padding: "10px 13px",
                      gap: "13px",
                    }}
                  />
                </Stack>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "32px",
                    fontWeight: "500",
                    lineHeight: "37.5px",

                    marginTop: "16px",
                  }}
                >
                  {getDayOfWeek(weather?.daily?.time[0]!, language, true)}
                </Typography>
                <Box
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "4px",
                  }}
                >
                  <span>{formatTime(new Date(), language)}</span>
                </Box>

                <Typography
                  sx={{
                    fontSize: "25px",
                    fontWeight: "700",
                    lineHeight: "46.88px",
                    marginTop: "16px",
                  }}
                  variant="caption"
                >
                  {weather?.current?.temperature_2m}
                  <span> &#8451;</span>
                </Typography>
                <Box
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "16.41px",
                    
                  }}
                >
                  <span>
                    {language === "en" ? "High" : "بیشینه"}:
                    {weather &&
                      findExtreme(weather.daily.temperature_2m_max, "max")}
                  </span>
                  
                  <span>
                    
                    {language === "en" ? "Low" : " کمینه"}:
                    {weather &&
                      findExtreme(weather.daily.temperature_2m_min, "min")}
                  </span>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {weather &&
                  handleIconWeather(
                    weather.daily.weather_code[0],
                    "194px",
                    "110px"
                  )}
                <Typography variant="caption" sx={{ fontSize: "32px" }}>
                  {weather &&
                    handleWeatherName(weather?.current?.weather_code, language)}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: "14px" }}>
                  {weather?.current?.temperature_2m}{" "}
                  {language === "en" ? " Feels Like" : " درجه احساس می شود"}
                </Typography>
              </Box>
            </Box>
          </Stack>
            
            }
          
          

          <Box
            sx={(theme) => ({
              borderRadius: "24px",
              padding: "16px",
              flex: "1",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.main,
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: "18px",
                fontWeight: "700",
                color: theme.palette.mode === "dark" ? "#fff" : "#003464",
              })}
            >
              {language === "en"
                ? "Average Monthly Temprature"
                : "میانگین دمای ماهانه"}
            </Typography>
            <MonthlyTempChart latitude={location?.lat} longitude={location?.lon} locale={language} />
          </Box>
        </Stack>
        <Box
         sx={(theme) => ({
          marginTop: "28px",
          padding: "24px 28.41px 26px 28.41px",
          marginBottom: "102px",
          borderRadius: "24px",
          boxShadow: " 0px 4px 10px 0px #00000026",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.secondary.dark
              : theme.palette.primary.main,
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        
          overflowX: "auto",            
        
   
          "&::-webkit-scrollbar": {
            height: "8px",     
          },
          // استایل مسیر اسکرول‌بار
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.mode === 'dark' 
              ? "rgba(255, 255, 255, 0.1)"      
              : "#f1f1f1",                     
            borderRadius: "10px",
          },
             
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.mode === 'dark' 
              ? "#888"        
              : "#a9a9a9",  
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: theme.palette.mode === 'dark' ? "#555" : "#7d7d7d",
            }
          }
        })}
        >
          <Typography
            variant="caption"
            sx={(theme) => ({
              fontSize: "24px",
              color: theme.palette.mode === "dark" ? "#fff" : "#003464",
            })}
          >
            {t("dashboard.title")}
          </Typography>
          <Stack direction={"row"} sx={{ gap: "18px" }}>
          {isLoading || !weather
              ? Array.from({ length: 14 }).map((_, index) => (
                  <WeatherCard key={index} loading={true} />
                ))
              : weather?.daily?.time?.map((item: string, index: number) => {
                  
                  const simpleDayWeather = {
                    temp_max: weather.daily.temperature_2m_max[index],
                    temp_min: weather.daily.temperature_2m_min[index],
                    weather_code: weather.daily.weather_code[index],
                  };

                  return (
                    <WeatherCard
                      key={item}
                      time={item}
                      temp={simpleDayWeather.temp_max}
                      handleIcon={handleIconWeather(simpleDayWeather.weather_code)}
                      location={location} 
                      dayWeather={simpleDayWeather}
                    />
                  );
                })}
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
