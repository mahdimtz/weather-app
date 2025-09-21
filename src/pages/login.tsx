import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAppContext } from "../context/app/app-context";

const Login = () => {
  const [showToast, setShowToast] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { language } = useAppContext();

  const isRTL = language === "fa";

  const { t } = useTranslation();
  const navigate = useNavigate();

  const loginHandler = () => {
    if (!username.trim()) {
      setError(t("login.errorRequired"));
      return;
    }
    setError("");
    setShowToast(true);
    setTimeout(() => {
      navigate("/dashboard", { state: { username } });
    }, 2000); // Wait for toast to be visible before navigating
  };

  

  return (
    <>
      <Stack
        width={"100vw"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
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
              overflow: "hidden",
              width: "100%",
            })}
          >
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{ width: "100%" }}
            >
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
                  dir={isRTL ? "rtl":"ltr"}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                  }}
                  error={!!error}
                  helperText={error}
                  
                  sx={{
                    width: {  xs: "100%" },
                    marginBottom: "200px",
                    marginTop: "32px",
                    
                  }}
                />

                <Button
                  variant="contained"
                  sx={{
                    width: { lg: "386px", md: "80%", xs: "100%" },
                    backgroundColor: "#2196F3",
                    color: "#fff",
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
        
      </Stack>
      <Snackbar
        open={showToast}
        autoHideDuration={2000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity="success"
          sx={{ width: '100%', backgroundColor: '#f1f8e9' }}
        >
          {`${t("login.welcome")} ${username}!`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
