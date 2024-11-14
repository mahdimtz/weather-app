import {
    Box,
    Button,
    type SelectChangeEvent,
    Stack,
    TextField,
    Typography,
    useTheme,
    Container,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import { useTranslation } from "react-i18next";
  import { useState } from "react";
  import { useAppContext } from "../../../../context/app/app-context";
  import LanguageSelect from "../../../common/select-language";
  
  const Login = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const { language, changeLanguage } = useAppContext();
    const theme = useTheme();
  
    const isRTL = language === "fa";
    const labelColor = theme.palette.mode === "dark" ? "#ffffff" : "#8895A0";
  
    const { t } = useTranslation();
    const navigate = useNavigate();
  
    const loginHandler = () => {
      navigate("/dashboard");
    };
  
    const handleChange = (event: SelectChangeEvent) => {
      setSelectedLanguage(event.target.value);
      changeLanguage(event.target.value);
    };
  
  
    return (
      <>
      
      <Container maxWidth="md">
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        
        
        
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.secondary.dark
              : "#ffff",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          boxShadow: "0px 4px 8px 0px #00000040",
          borderRadius: "12px",
          overflow:"hidden",
          width:"100%",
          
        })}
      >
          <Stack direction={"row"} justifyContent={"center"} sx={{width:"100%"}}>
          <Stack
            direction={"column"}
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: { md: "0", xs: "30px" },
              
            }}
          >
            <Typography
              variant="h5"
              sx={{ typography: { sm: "body1", xs: "body2" } }}
            >
              {t("login.title")}
            </Typography>
  
            <TextField
              id="outlined-basic"
              label={t("login.placeholder")}
              variant="outlined"
              InputLabelProps={{
                style: { color: labelColor },
                shrink: true,
              }}
              InputProps={{
                style: { direction: isRTL ? "rtl" : "ltr" },
              }}
              sx={{
                width: {md:"386px",xs:"100%"},
                height: "56px",
                marginBottom: "200px",
                marginTop: "32px",
                "& .MuiInputLabel-root": {
                  left: isRTL ? "auto" : "14px",
                  right: isRTL ? "14px" : "auto",
                  transformOrigin: isRTL ? "top right" : "top left",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  textAlign: isRTL ? "right" : "left",
                },
                "& .MuiInputBase-input": {
                  textAlign: isRTL ? "right" : "left",
                },
              }}
            />
  
            <Button
              variant="contained"
             
              sx={{
                width: { lg: "386px", md: "80%", xs: "100%" },
                backgroundColor:"#2196F3",
                  
                color: "#fff"
              }}
              onClick={loginHandler}
            >
              {t("login.title")}
            </Button>
          </Stack>
        </Stack>
          <Box sx={{ width: "50%", display: { md: "flex", xs: "none" } }}>
          <img src="/images/Frame 10.png" alt="" />
        </Box>
      </Stack>
      
       
  
       
      </Container>
      <LanguageSelect
          selectedLanguage={selectedLanguage}
          handleChange={handleChange}
          t={t}
          labelColor={labelColor}
        />
      </>
    );
  };
  
  export default Login;
  