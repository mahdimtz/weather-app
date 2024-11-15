import { RouterProvider } from "react-router-dom";

import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { createThemes } from "./theme";
import { useEffect } from "react";
import { useAppContext } from "./context/app/app-context";
import router from "./router";

function App() {


  const { lightTheme, darkTheme } = createThemes();
  const {themeMode } = useAppContext();

  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme:${themeMode} )`);
  
  
  const theme = prefersDarkMode ? darkTheme : lightTheme;
 
  

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.mode === 'dark' ? '#151D32' : '#F5F9FC';
  }, [theme]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
