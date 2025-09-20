import { Box,  Skeleton, Stack,  } from "@mui/material";

const MainWeatherSkeleton = () => {
  return (
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
            <Skeleton variant="rounded" width={173} height={40} />
          </Stack>
          <Skeleton variant="text" width={120} height={37} sx={{ mt: 2 }} />
          <Skeleton variant="text" width={80} height={20} sx={{ mt: 1 }} />
          <Skeleton variant="text" width={100} height={40} sx={{ mt: 2 }} />
          <Skeleton variant="text" width={150} height={16} sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Skeleton variant="circular" width={110} height={110} />
          <Skeleton variant="text" width={100} height={32} sx={{ mt: 1 }} />
          <Skeleton variant="text" width={80} height={14} sx={{ mt: 1 }} />
        </Box>
      </Box>
    </Stack>
  );
};

export default MainWeatherSkeleton;
