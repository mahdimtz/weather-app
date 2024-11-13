import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
  useColorScheme,
} from "@mui/material";
import Header from "../components/header/header";
import IconLocation from "../assets/icons/IconLocation";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { formatTime, getCurrentWeekday, getDayOfWeek } from "../utils/helper/dateFormater";

import Footer from "../components/footer/footer";
import WeatherCard from "../components/weather-card/weather-card";
import { findExtreme } from "../utils/helper/findNumber";
import weatherCode from "../constants/weatherCode";
import Icon from "../components/icons/Icon";
import { useAppContext } from "../context/app/app-context";
import { useTranslation } from "react-i18next";

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
  const [location, setLocation] = useState<Location>();
  const [weather, SetWeather] = useState();
  const days = [...new Array(14)];

  const{language} = useAppContext()
  const { mode, setMode } = useColorScheme();
  const {t} = useTranslation()

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

  const handleWeather = (code:number,lang:"en"|"fa") => {
    
    let temp = weatherCode.filter((item) => {
      return item[0] === code;
    });
    if(lang === "en"){
    return temp[0][1];

    }else if(lang === "fa"){
      return temp[0][2];
    }
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
  const handleIcon = (code:number,width?:string ,height?:string) => {
    let temp = weatherCode.filter((item) => {
      return item[0] === code;
    });
    switch (temp[0][3]) {
      case "FaSnowflake":
        return <Icon src="/imageIcon/Rain cloud.png" width={width} height={height}/>;
      case "FaSun":
        return <Icon src="/imageIcon/sun.png"  width={width} height={height}  />;
        
      case "FaCloudRain":
        return <Icon src="/imageIcon/Rain cloud.png"  width={width} height={height}  />;
      case "FaCloud":
        return <Icon src="/imageIcon/cloud.png"   width={width} height={height}  />;
      case "FaWind":
        return <Icon  src="/imageIcon/storm.png"  width={width} height={height} />;

      default:
        break;
    }
  };
  
  return (
    <>
      <Header
        language={language}
        handleCityChange={handleCityChange}
        selectedCity={selectedCity}
        cities={cities}
        setMode={setMode}
      />
      <Container maxWidth={"xl"} sx={{ marginTop: "28px" }}>
        <Stack   sx={{flexDirection:{md:"row",xs:"col"},gap:"41px"}}>
          <Stack
            sx={(theme) => ({
             
              borderRadius: "24px",
              width:{xl:"607px",md:"50%"},
              minHeight: "234px",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.main,
              color: theme.palette.mode === "dark" ? "#fff" : "#003464"
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
                  {getDayOfWeek( weather?.daily?.time[0],language,true)}
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
                  {weather?.current?.temperature_2m}<span>&#8451;</span>
                </Typography>
                <Box
                  sx={{
                   
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "16.41px",
                  }}
                >
                  <span>{language === "en" ? "High":"بیشینه"}:{weather && findExtreme(weather.daily.temperature_2m_max,"max")}</span>
                  <span> {language === "en"?"Low":"کمینه"}:{weather && findExtreme(weather.daily.temperature_2m_min,"min")}</span>
                </Box>
              </Box>
              <Box
                sx={(theme) => ({
                
                  display: "flex",
                  flexDirection: "column",
                })}
              >
                { weather && handleIcon(weather.daily.weather_code[0],"194px","110px")}
                <Typography variant="caption" sx={{ fontSize: "32px" }}>
                {weather && handleWeather(weather?.current?.weather_code,language)}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: "14px" }}>
                  {weather?.current?.temperature_2m}  {language === "en"?"Feels Like":"درجه احساس می شود"}
                </Typography>
              </Box>
            </Box>
          </Stack>

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
              
              sx={(theme)=>({
                fontSize: "18px", fontWeight: "700",
                    color: theme.palette.mode === "dark" ? "#fff" : "#003464",
              })}
            >
             {language === "en"?"Average Monthly Temprature":"میانگین دمای ماهانه"}
            </Typography>
            <LineChart
              {...chartsParams}
              series={[
                {
                  data: [15, 15, 22, 19, 13],
                  
                },
              ]}
            />
          </Box>
        </Stack>
        <Box
          sx={(theme) => ({
            
            
            marginTop: "28px",
            padding: "24px 28.41px 26px 28.41px",
            marginBottom: "102px",
            borderRadius: "24px",
            background: "#E1E9EE",
            boxShadow: " 0px 4px 10px 0px #00000026",
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.secondary.dark
                : theme.palette.primary.main,
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            overflowX:"scroll"
          })}
        >
          <Typography
            variant="caption"
            
            sx={(theme)=>({
              fontSize: "24px",
                  color: theme.palette.mode === "dark" ? "#fff" : "#003464",
            })}
          >
            {t("dashboard.title")}
          </Typography>
          <Stack direction={"row"} sx={{gap:"18px"}} >
          {weather
          ? days.map((item, index) => {
              return (
               
                <WeatherCard time={weather?.daily?.time[index]} temp={weather?.daily?.temperature_2m_max[index]} handleIcon={handleIcon(weather.daily.weather_code[index])} laguage={language} />
              );
            })
          : null}
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
