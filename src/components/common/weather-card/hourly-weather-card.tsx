import { Stack, Typography } from "@mui/material";
import { useAppContext } from "../../../context/app/app-context";
import { formatTime } from "../../../utils/helper/dateFormater";

// --- کامپوننت کوچک برای نمایش کارت‌های ساعتی ---
type HourlyWeatherCardProps = {
    time: string;
    temp: number;
    icon: React.ReactNode;
  };
  
  const HourlyWeatherCard = ({ time, temp, icon }: HourlyWeatherCardProps) => {
    const { language } = useAppContext();
    return (
      <Stack
        alignItems="center"
        spacing={1}
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
          {formatTime(new Date(time), language)}
        </Typography>
        {icon}
        <Typography variant="h6">{temp}&#8451;</Typography>
      </Stack>
    );
  };
  export default HourlyWeatherCard