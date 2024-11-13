import {
  Box,
  Button,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAppContext } from "../context/app/app-context";

const Login = () => {
  const [selectedLanguage,setSelectedLanguage] = useState<string>();
  const theme = useTheme();
  
  const labelColor = theme.palette.mode === 'dark' ? '#ffffff' : '#8895A0'; 
  
  const{language,changeLanguage} = useAppContext()

  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/dashboard");
  };

const handleChange = (event: SelectChangeEvent) => {
  setSelectedLanguage(event.target.value)
  changeLanguage(event.target.value)
 
 
};
const isRTL = language === 'fa';

  return (
    <Stack
    width={"100vw"}
    height={"100vh"}
    justifyContent={"center"}
    alignItems={"center"}
    direction={"column"}
   
  >
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
        overflow:"hidden"
        
      })}
    >
      <Stack direction={"row"} justifyContent={"center"} sx={{width:"50%"}}>
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
              style: { color: labelColor },
              shrink: true,
            }}
            InputProps={{
              style: { direction: isRTL ? 'rtl' : 'ltr' },
            }}
            sx={{
              width: "386px",
              height: "56px",
              marginBottom: "200px",
              marginTop: "32px",
              '& .MuiInputLabel-root': {
                left: isRTL ? 'auto' : '14px',
                right: isRTL ? '14px' : 'auto',
                transformOrigin: isRTL ? 'top right' : 'top left',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                textAlign: isRTL ? 'right' : 'left',
              },
              '& .MuiInputBase-input': {
                textAlign: isRTL ? 'right' : 'left',
              },
            }}
          />
         
          <Button
            variant="contained"
            
            sx={{ width:{lg:"386px",md:"80%",xs:"50%"},backgroundColor:"#2196F3" }}
            onClick={loginHandler}
          >
            {t("login.title")}
          </Button>
        </Stack>
      </Stack>
      <Box 
      sx={{width:"50%", 
      display:{md:"flex",xs:"none"}
      }}>
        <img
          src="/images/Frame 10.png"
          alt=""
        
        />
      </Box>
    </Stack>
    
    <FormControl variant="standard"     sx={{ 
        width: "220px", 
        marginTop: "40px",
        '& .MuiInputLabel-root': {
          left: selectedLanguage === 'fa' ? 'auto' : '0',
          right: selectedLanguage === 'fa' ? '0' : 'auto',
          transformOrigin: selectedLanguage === 'fa' ? 'top right' : 'top left',
        },
      }}>
        <InputLabel id="demo-simple-select-standard-label" sx={{color:labelColor}}>{t("login.label")}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedLanguage}
          onChange={handleChange}
          label={t("login.label")}
          sx={{
            '& .MuiSelect-select': {
              color: labelColor,
            },
            '& .MuiSvgIcon-root': {
              color: labelColor,
            },
          }}
         
        >
          
          <MenuItem value={"en"}>{t("login.languageEn")}</MenuItem>
          <MenuItem value={"fa"}>{t("login.languageFa")}</MenuItem>
         
        </Select>
      </FormControl>
  </Stack>
  );
};

export default Login;
