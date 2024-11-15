import { createTheme } from "@mui/material";

export const createThemes = () => {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        light: "#F3FAFE",
        main: "#E1E9EE",
      },
      secondary: {
        main: "#ef9a9a",
        contrastText: "#CDD9E0",
        dark:"#292F45"
      },
      text: {
        primary: "#25262E",
        secondary: "#FFFFFF",
      },
      action: {
        active: "#2196F3",
        disabled: "#8895A0",
      },
      grey: {
        "900": "#212121",
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
      action: {
        active: "#2196F3",
        disabled: "#8895A0",
      },
      grey: {
        "900": "#212121",
      },
    },
  });

  return { lightTheme, darkTheme };
};
