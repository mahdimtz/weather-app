import { createTheme } from "@mui/material";


export const createThemes = () => {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        
        light:"#F3FAFE",
        main: "#E1E9EE", 
      },
      secondary: {
        main: "#ef9a9a",
       contrastText:'#CDD9E0' 
      },
      text: {
        primary: "#25262E",
        secondary: "#FFFFFF",
      },
    },
  });

  const darkTheme = createTheme({
    
    palette: {
      mode: "dark",
      primary: {
        main: "#10598E", // Dark blue color
      },
      secondary: {
        main: "#292F45",
        contrastText: "#3F4861",
      },
      text: {
        primary: "#ffffff",
        secondary: "#25262E",
      },
    },
    
  });

  return { lightTheme, darkTheme };
};
