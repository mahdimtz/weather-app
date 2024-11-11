import {
  Box,
  Button,
  
  Container,
  
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/dashboard");
  };
  return (
    <Stack
    width={"100vw"}
    height={"100vh"}
    justifyContent={"center"}
    alignItems={"center"}
    direction={"column"}
    spacing={{ xs: 2, sm: 4 }}
  >
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.secondary.dark
            : theme.palette.primary.light,
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
        boxShadow: "0px 4px 8px 0px #00000040",
        borderRadius: "12px",
        overflow: "hidden",
      })}
    >
      <Stack direction={"row"} justifyContent={"center"} sx={{width:{lg:"506px",md:"50%",sm:"100%"}}}>
        <Stack
          direction={"column"}
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding:{md:"0",xs:"30px"}
          }}
        >
          <Typography variant="h5" sx={{ typography: { sm: 'body1', xs: 'body2' } }}>{t("login.title")}</Typography>
          <TextField
            id="outlined-basic"
            label={t("login.placeholder")}
            variant="outlined"
            InputLabelProps={{
              style: { color: "#ffffff" }, 
            }}
            sx={{
              width: "386px",
              height: "56px",
              marginBottom: "200px",
              marginTop: "32px",
            }}
          />
          <Button
            variant="contained"
            sx={{ width:{lg:"386px",md:"80%",xs:"50%"}, }}
            onClick={loginHandler}
          >
            {t("login.title")}
          </Button>
        </Stack>
      </Stack>
      <Box 
      sx={{ width:{ xl:"454px",md:"50%"}, height: "565px", 
      display:{md:"flex",xs:"none"}
      }}>
        <img
          src="/images/Frame 10.png"
          alt=""
          style={{ height: "100%", width: "100%" }}
        />
      </Box>
    </Stack>
    <FormControl sx={{ width: "220px", marginTop: "40px" }}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        language
      </InputLabel>
      <NativeSelect>
        <option>english</option>
        <option>persian</option>
      </NativeSelect>
    </FormControl>
  </Stack>
  );
};

export default Login;
