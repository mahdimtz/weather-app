import { Card, CardContent, Typography, Skeleton } from "@mui/material";
import { getDayOfWeek } from "../../../utils/helper/dateFormater";
import { useAppContext } from "../../../context/app/app-context";
import { Link } from "react-router-dom";
import React from "react";

type WetherCardProps = {
  time?: string;
  temp?: number;
  handleIcon?: React.ReactNode;
  loading?: boolean;
  location?: any;    
  dayWeather?: any;     
};

const WeatherCard = ({
  time,
  temp,
  handleIcon,
  loading,
  location,
  dayWeather,
}: WetherCardProps) => {
  const { language } = useAppContext();

  if (loading) {
    return (
      <Card
        sx={{
          minWidth: "104px",
          height: "266px",
          padding: "22px 16px",
          borderRadius: "24px",
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '45.5px 15px' }}>
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="text" width={30} height={20} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Link
      to={`/detail/${time}`}
      state={{ location: location, dayWeather: dayWeather, locationName: location?.display_name.split(",")[0].trim() }}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={(theme) => ({
          minWidth: "104px",
          height: "266px",
          padding: "22px 16px",
          borderRadius: "24px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : theme.palette.secondary.contrastText,
          color: theme.palette.mode === "dark" ? "#fff" : "#003464",
          cursor: "pointer",       
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",    
            boxShadow: theme.shadows[10],
          },
        })}
      >
        <CardContent
          sx={{
            display: "flex",
            fontWeight: "500",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            padding: "45.5px 15px",
          }}
        >
            <Typography sx={{ fontSize: "14px" }}>
              {getDayOfWeek(time!, language)}
            </Typography>
            {handleIcon}
            <Typography
              sx={{ fontSize: "18px", fontWeight: "500" }}
              variant="caption"
            >
              {temp}
              <span>&#8451;</span>
            </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WeatherCard;

