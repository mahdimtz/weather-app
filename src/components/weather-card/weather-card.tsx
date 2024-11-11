import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const WeatherCard = () => {
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
            : theme.palette.primary.light,
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      })}
    >
      {/* sx={{borderBottom:" 2px solid linear-gradient(90deg, rgba(54, 54, 54, 0) 0%, #7E7E7E 48.5%, rgba(54, 54, 54, 0) 100%"}} */}

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
        <Typography sx={{ fontSize: "14px" }}>Today</Typography>
        <img src="/images/Frame 30.png" width={69} height={51} />

        <Typography
          sx={{ fontSize: "18px", fontWeight: "500" }}
          variant="caption"
        >
          21C
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
