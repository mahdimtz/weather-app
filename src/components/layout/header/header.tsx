import { Autocomplete, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/app/app-context";
import { useTranslation } from "react-i18next";
import PopOver from "../../common/popover/Popover";
import cities, { City } from "../../../constants/city";
import { CiSettings } from "react-icons/ci";

const Header = ({
  language,
  handleCityChange,
  selectedCity,
  setMode,
}: {
  language: "en" | "fa";
  handleCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCity: string;
  setMode: any;
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const labelColor = theme.palette.mode === "dark" ? "white" : "#AFBCC4";
  const { changeTheme, changeLanguage } = useAppContext();

  const [showPopOver, setShowPopOver] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setShowPopOver(event.currentTarget);
  const handleClose = () => setShowPopOver(null);
  const open = Boolean(showPopOver);
  const id = open ? "simple-popover" : undefined;

  const changeThemeHandler = (mode: "dark" | "light") => changeTheme(mode);
  const changeLanguageHandler = (lang: "en" | "fa") => changeLanguage(lang);

  useEffect(() => {
    if ("geolocation" in navigator && !selectedCity) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            const cityName = data.address.city || data.address.town || data.address.village;
            const city = cities.find(
              (c) =>
                c.nameEn.toLowerCase() === cityName.toLowerCase() ||
                c.nameFa === cityName
            );
            if (city) handleCityChange({ target: { value: city.id } } as any);
            else handleCityChange({ target: { value: "Tehran" } } as any);
          } catch (err) {
            console.log("Error fetching location:", err);
            handleCityChange({ target: { value: "Tehran" } } as any);
          }
        },
        (err) => {
          console.log("Cannot get user location, defaulting to Tehran", err);
          handleCityChange({ target: { value: "Tehran" } } as any);
        }
      );
    }
  }, []);

  return (
    <header>
      <Stack
        direction={"row"}
        sx={(theme) => ({
          justifyContent: { xs: "center", sm: "space-between" },
          padding: "24px 12px",
          boxShadow: "0px 4px 10px 0px #00000026",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.secondary.contrastText
              : theme.palette.primary.light,
          color: theme.palette.mode === "dark" ? "#fff" : "#003464",
        })}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img src="/images/image 1.png" alt="" />
          <Typography variant="h6" sx={{ fontSize: "18px" }}>
            {t("header.title")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Autocomplete
            options={cities}
            getOptionLabel={(option: City) => (language === "fa" ? option.nameFa : option.nameEn)}
            value={cities.find((c) => c.id === selectedCity) || cities[0]}
            onChange={(_, newValue) => {
              if (newValue) handleCityChange({ target: { value: newValue.id } } as any);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={language === "fa" ? "انتخاب شهر" : "Select City"}
                variant="outlined"
                InputLabelProps={{ shrink: true, style: { color: labelColor } }}
                sx={{
                  width: "295px",
                  "& .MuiOutlinedInput-root": { height: "40px" },
                  "& .MuiOutlinedInput-input": { display: "flex", alignItems: "center", padding: "0 14px" },
                }}
              />
            )}
          />

          <IconButton onClick={handleClick}>
          <CiSettings />
                </IconButton>
          <PopOver
            open={open}
            id={id}
            showPopOver={showPopOver}
            handleClose={handleClose}
            onChangeTheme={changeThemeHandler}
            onChangeLanguage={changeLanguageHandler}
            t={t}
          />
        </Box>
      </Stack>
    </header>
  );
};

export default Header;
