import {
  Button,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { useState } from "react";

const Header = ({
  language,
  handleCityChange,
  selectedCity,
  cities,
}: {
  language: "en" | "fa";
  handleCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCity: string;
  cities: any;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "24px 12px",
        boxShadow: "0px 4px 10px 0px #00000026",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img src="/images/image 1.png" alt="" />
        <Typography variant="h6" sx={{ fontSize: "12px" }}>
          Weather Dashboard
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <TextField
          select
          label={language === "fa" ? "انتخاب شهر" : "Select City"}
          value={selectedCity}
          onChange={handleCityChange}
          variant="outlined"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          sx={{
            width: "295px",
            "& .MuiOutlinedInput-root": {
              height: "40px",
            },
            "& .MuiOutlinedInput-input": {
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
            },
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              height: "100%",
            },
          }}
        >
          {cities.map((city: any) => (
            <MenuItem key={city.id} value={city.id}>
              {language === "fa" ? city.nameFa : city.nameEn}
            </MenuItem>
          ))}
        </TextField>
        <IconButton aria-describedby={id} onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="39"
              height="39"
              rx="7.5"
              stroke="#BBC1C4"
            />
            <mask
              id="mask0_42_221"
              maskUnits="userSpaceOnUse"
              x="8"
              y="8"
              width="24"
              height="24"
            >
              <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_42_221)">
              <path
                d="M18.8922 29.5C18.5512 29.5 18.2567 29.3868 18.0087 29.1605C17.7606 28.9343 17.6096 28.6558 17.5557 28.325L17.3115 26.4538C17.0437 26.3641 16.769 26.2385 16.4875 26.077C16.2062 25.9153 15.9546 25.7422 15.7327 25.5577L14 26.2943C13.6858 26.4328 13.3702 26.4462 13.053 26.3345C12.7357 26.223 12.4892 26.0205 12.3135 25.727L11.1865 23.773C11.0108 23.4795 10.9602 23.1689 11.0347 22.8413C11.1091 22.5138 11.2796 22.2436 11.5462 22.0308L13.0442 20.9058C13.0212 20.7571 13.0049 20.6077 12.9952 20.4578C12.9856 20.3078 12.9807 20.1583 12.9807 20.0095C12.9807 19.8673 12.9856 19.7228 12.9952 19.576C13.0049 19.4292 13.0212 19.2686 13.0442 19.0943L11.5462 17.9693C11.2796 17.7564 11.1107 17.4846 11.0395 17.1538C10.9683 16.8231 11.0206 16.5109 11.1962 16.2173L12.3135 14.2923C12.4892 14.0051 12.7357 13.8042 13.053 13.6895C13.3702 13.5747 13.6858 13.5865 14 13.725L15.723 14.452C15.9642 14.261 16.2216 14.0863 16.4952 13.928C16.7689 13.7697 17.0378 13.6424 17.302 13.5462L17.5557 11.675C17.6096 11.3442 17.7606 11.0657 18.0087 10.8395C18.2567 10.6132 18.5512 10.5 18.8922 10.5H21.1077C21.4487 10.5 21.7432 10.6132 21.9912 10.8395C22.2394 11.0657 22.3904 11.3442 22.4442 11.675L22.6885 13.5557C22.9885 13.6647 23.2599 13.792 23.5027 13.9375C23.7457 14.083 23.991 14.2545 24.2385 14.452L26.0097 13.725C26.3237 13.5865 26.6394 13.5747 26.9567 13.6895C27.2741 13.8042 27.5205 14.0051 27.696 14.2923L28.8135 16.227C28.9892 16.5205 29.0397 16.8311 28.9652 17.1587C28.8909 17.4862 28.7204 17.7564 28.4537 17.9693L26.9172 19.123C26.9531 19.2845 26.9727 19.4355 26.976 19.576C26.9792 19.7163 26.9807 19.8577 26.9807 20C26.9807 20.1358 26.9775 20.274 26.971 20.4145C26.9647 20.5548 26.9417 20.7154 26.902 20.8963L28.4095 22.0308C28.6762 22.2436 28.8483 22.5138 28.926 22.8413C29.0035 23.1689 28.9544 23.4795 28.7787 23.773L27.646 25.7172C27.4705 26.0109 27.2225 26.2135 26.902 26.325C26.5815 26.4365 26.2642 26.423 25.95 26.2845L24.2385 25.548C23.991 25.7455 23.7384 25.9202 23.4807 26.072C23.2231 26.224 22.959 26.3481 22.6885 26.4443L22.4442 28.325C22.3904 28.6558 22.2394 28.9343 21.9912 29.1605C21.7432 29.3868 21.4487 29.5 21.1077 29.5H18.8922ZM19 28H20.9655L21.325 25.3212C21.8353 25.1879 22.3017 24.9985 22.724 24.753C23.1465 24.5073 23.5539 24.1916 23.9462 23.8057L26.4307 24.85L27.4155 23.15L25.2462 21.5155C25.3296 21.2565 25.3862 21.0026 25.4162 20.7537C25.4464 20.5051 25.4615 20.2538 25.4615 20C25.4615 19.7397 25.4464 19.4884 25.4162 19.2463C25.3862 19.0039 25.3296 18.7564 25.2462 18.5038L27.4345 16.85L26.45 15.15L23.9365 16.2095C23.6018 15.8518 23.2009 15.5358 22.7337 15.2615C22.2664 14.9872 21.7937 14.7929 21.3155 14.6788L21 12H19.0155L18.6845 14.6693C18.1743 14.7898 17.7032 14.9743 17.2712 15.223C16.8391 15.4718 16.4268 15.7923 16.0345 16.1845L13.55 15.15L12.5655 16.85L14.725 18.4595C14.6417 18.6968 14.5833 18.9437 14.55 19.2C14.5167 19.4563 14.5 19.7262 14.5 20.0095C14.5 20.2698 14.5167 20.525 14.55 20.775C14.5833 21.025 14.6385 21.2718 14.7155 21.5155L12.5655 23.15L13.55 24.85L16.025 23.8C16.4045 24.1897 16.8102 24.5089 17.2422 24.7578C17.6744 25.0064 18.152 25.1974 18.675 25.3307L19 28ZM20.0115 23C20.8435 23 21.5515 22.708 22.1355 22.124C22.7195 21.54 23.0115 20.832 23.0115 20C23.0115 19.168 22.7195 18.46 22.1355 17.876C21.5515 17.292 20.8435 17 20.0115 17C19.1692 17 18.4586 17.292 17.8797 17.876C17.3009 18.46 17.0115 19.168 17.0115 20C17.0115 20.832 17.3009 21.54 17.8797 22.124C18.4586 22.708 19.1692 23 20.0115 23Z"
                fill="#BBC1C4"
              />
            </g>
          </svg>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Stack
            direction={"column"}
            sx={{ padding: "20px 15px", width: "220px", height: "240px" }}
          >
            <Typography variant="caption">Mode</Typography>
            <Stack direction={"row"}>
              <Button variant="outlined">Dark</Button>
              <Button variant="outlined">Light</Button>
            </Stack>
            <Divider sx={{ margin: "10px 0" }} />
            <Typography variant="caption">Language</Typography>
            <Stack direction={"row"}>
              <Button variant="outlined">En</Button>
              <Button variant="outlined">Fa</Button>
            </Stack>
            <Divider sx={{ margin: "10px 0" }} />

            <Typography variant="caption">Exit</Typography>
          </Stack>
        </Popover>
      </Box>
    </header>
  );
};

export default Header;
