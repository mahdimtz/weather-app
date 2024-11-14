import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { getDayOfWeek } from "../../../utils/helper/dateFormater";
import { useAppContext } from "../../../context/app/app-context";
type WetherCardProps ={
  time:string;
  temp: number
  handleIcon:any
}
const WeatherCard = ({ time, temp, handleIcon }:WetherCardProps) => {
  const { language } = useAppContext();

  return (
    <Card
      sx={(theme) => ({
        minWidth: "104px",
        height: "266px",
        padding: "22px 16px 22px 16px",
        borderRadius: "24px",
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.secondary.contrastText
            : theme.palette.secondary.contrastText,
        color: theme.palette.mode === "dark" ? "#fff" : "#003464",
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
          {getDayOfWeek(time, language)}
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
  );
};

export default WeatherCard;
