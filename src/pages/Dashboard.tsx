import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Header from "../components/header/header";
import IconLocation from "../assets/icons/IconLocation";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { formatTime, getCurrentWeekday } from "../utils/helper/dateFormater";

import Footer from "../components/footer/footer";
import WeatherCard from "../components/weather-card/weather-card";

const Dashboard = () => {
  interface City {
    id: string;
    nameEn: string;
    nameFa: string;
  }
  interface Location {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
  }

  const cities: City[] = [
    { id: "1", nameEn: "Tehran", nameFa: "تهران" },
    { id: "2", nameEn: "Isfahan", nameFa: "اصفهان" },
    { id: "3", nameEn: "Shiraz", nameFa: "شیراز" },
    { id: "4", nameEn: "Tabriz", nameFa: "تبریز" },
  ];

  const [selectedCity, setSelectedCity] = useState<string>("1");
  const [language, setLanguage] = useState<"en" | "fa">("en");
  const [location, setLocation] = useState<Location>();
  const [weather, SetWeather] = useState();

  async function LocationAPI(cityID: string = "1") {
    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${
          language === "fa"
            ? cities.find((city) => city.id === cityID)?.nameFa
            : cities.find((city) => city.id === cityID)?.nameEn
        }&api_key=6730555eb21f3198362716hiza81838`
      );
      const data = await response.json();
      if (data) setLocation(data[0]);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCity(event.target.value);
    LocationAPI(event.target.value);
  };
  async function WeatherAPI() {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location?.lat}&longitude=${location?.lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=14`
      );
      const data = await response.json();
      if (data) SetWeather(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    LocationAPI();
  }, []);
  useEffect(() => {
    if (location) WeatherAPI();
  }, [location]);
  const chartsParams = {
    margin: { bottom: 20, left: 25, right: 5 },
    height: 234,
  };

  return (
    <>
      <Header
        language={language}
        handleCityChange={handleCityChange}
        selectedCity={selectedCity}
        cities={cities}
      />
      <Container maxWidth={"xl"} sx={{ marginTop: "28px" }}>
        <Stack direction="row" spacing={4}>
          <Box
            sx={(theme) => ({
              background: "#E1E9EE",
              borderRadius: "24px",
              width:{xl:"607px",sm:"50%"},
              minHeight: "234px",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.light,
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
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
                  {getCurrentWeekday()}
                </Typography>
                <Box
                  sx={{
                    
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "4px",
                  }}
                >
                  <span>{formatTime(new Date())}</span>
                </Box>

                <Typography
                  sx={{
                    
                    fontSize: "40px",
                    fontWeight: "500",
                    lineHeight: "46.88px",
                    marginTop: "16px",
                  }}
                  variant="caption"
                >
                  {weather?.current.temperature_2m} C
                </Typography>
                <Box
                  sx={{
                   
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "16.41px",
                  }}
                >
                  <span>High: 27</span>
                  <span> Low: 10</span>
                </Box>
              </Box>
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.secondary.dark
                      : theme.palette.primary.light,
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  display: "flex",
                  flexDirection: "column",
                })}
              >
                <img src="/images/Frame 30.png" width={187} height={129} />
                <Typography variant="caption" sx={{ fontSize: "32px" }}>
                  Cloudy
                </Typography>
                <Typography variant="caption" sx={{ fontSize: "14px" }}>
                  Feels Like 26
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={(theme) => ({
              borderRadius: "24px",
              padding: "16px",
              flex: "1",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.light,
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            })}
          >
            <Typography
              sx={{  fontSize: "18px", fontWeight: "700" }}
            >
              Average Monthly Temprature
            </Typography>
            <LineChart
              {...chartsParams}
              series={[
                {
                  data: [15, 23, 18, 19, 13],
                  label: "Example",
                },
              ]}
            />
          </Box>
        </Stack>
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "381px",
            marginTop: "28px",
            padding: "24px 0 26px 28.41px",
            marginBottom: "102px",
            borderRadius: "24px",
            background: "#E1E9EE",
            boxShadow: " 0px 4px 10px 0px #00000026",
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.secondary.dark
                : theme.palette.primary.light,
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            overflowX:{md:"scroll"}
          })}
        >
          <Typography
            variant="caption"
            sx={{ fontSize: "24px", }}
          >
            2 weeks Forecast
          </Typography>
          <Stack direction={"row"} spacing={"18px"} className="card-container">
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
