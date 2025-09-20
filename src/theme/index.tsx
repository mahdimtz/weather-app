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
        // --- اصلاح این بخش ---
        // رنگ متن ثانویه از سفید به خاکستری تیره تغییر کرد
        secondary: "#6c757d", 
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
            background: {
              default: "#0A1929",
              paper: "#3F4861",
            },
            primary: {
              main: "#90CAF9",
              light: "#90CAF9",
              dark: "#42A5F5",
              contrastText: "#0D1117"
            },
            secondary: {
              main: "#292F45",
              contrastText: "#1E293B", 
              dark: "#1E293B"
            },
            text: {
              primary: "#FFFFFF",
              secondary: "#E2E8F0",
            },
            action: {
              active: "#2196F3",
              disabled: "#8895A0",
              hover: "rgba(144, 202, 249, 0.08)" 
            },
            grey: {
              "900": "#212121",
            },
          },
      });
  return { lightTheme, darkTheme };
};
