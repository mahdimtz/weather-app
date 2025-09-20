import {
  Button,
  Divider,
  Popover as MuiPopover,
  Stack,
  Typography,
} from "@mui/material";
import IconLogOut from "../../../assets/icons/IconLogOut";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/app/app-context";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
type PopOverProps = {
  open: boolean;
  id: any;
  showPopOver: any;
  handleClose: () => void;
  onChangeLanguage: (params: "fa" | "en") => void;
  onChangeTheme: (params: "dark" | "light") => void;
  t: (params: string) => string;
};

const PopOver = ({
  handleClose,
  onChangeLanguage,
  onChangeTheme,
  t,
  open,
  id,
  showPopOver,
}: PopOverProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { language, themeMode } = useAppContext();
  return (
    <MuiPopover
      sx={{ padding: "0 16px" }}
      id={id}
      open={open}
      anchorEl={showPopOver}
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
        <Typography variant="caption" marginBottom={"6px"} fontSize={"16px"}>
          {t("header.popover.mode")}
        </Typography>
        <Stack direction={"row"} sx={{ gap: "12px" }}>
          <Button
            variant={themeMode === "dark" ? "contained" : "outlined"}
            onClick={() =>{ 
              onChangeTheme("dark")
              handleClose()
            }}
            sx={(theme) => ({
              width: "94px",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              ...(themeMode === "dark"
                ? {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }
                : {
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }),
            })}
          >
            {t("header.popover.themeDarkBtn")}
          </Button>

          <Button
            variant={themeMode === "light" ? "contained" : "outlined"}
            onClick={() =>{ 
              onChangeTheme("light")
              handleClose()
            }}
            sx={(theme) => ({
              width: "94px",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              ...(themeMode === "light"
                ? {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }
                : {
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }),
            })}
          >
            {t("header.popover.themeLightBtn")}
          </Button>
        </Stack>

        <Divider sx={{ margin: "10px 0" }} />
        <Typography variant="caption" marginBottom={"6px"} fontSize={"16px"}>
          {t("header.popover.language")}
        </Typography>
        <Stack direction={"row"} sx={{ gap: "12px" }}>
          <Button
            variant={language === "en" ? "contained" : "outlined"}
            onClick={() =>{
               onChangeLanguage("en")
               handleClose()
              }}
            sx={(theme) => ({
              width: "94px",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              ...(language === "en"
                ? {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }
                : {
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }),
            })}
          >
            {t("header.popover.languageEnBtn")}
          </Button>

          <Button
            variant={language === "fa" ? "contained" : "outlined"}
            onClick={() =>{
              onChangeLanguage("fa")
              handleClose()
             }}
            sx={(theme) => ({
              width: "94px",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              ...(language === "fa"
                ? {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }
                : {
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }),
            })}
          >
            {t("header.popover.languageFaBtn")}
          </Button>
        </Stack>

        <Divider sx={{ margin: "10px 0" }} />

        <Button
      variant="text"
      onClick={() => navigate("/")}
      sx={{
        justifyContent: "flex-end",
        gap: "8px",
        padding: "6px 12px",
        borderRadius: "8px",
        textTransform: "none",
        fontSize: "14px",
        fontWeight: 500,
        color: theme.palette.primary.main,      
        "&:hover": {
          backgroundColor: theme.palette.action.hover,     
          color: theme.palette.primary.main,     
          "& .logout-icon": {
            color: theme.palette.primary.main,     
          },
        },
      }}
      endIcon={
        <IconLogOut
          color={theme.palette.primary.main}    
        />
      }
    >
      {t("header.popover.exitBtn")}
    </Button>


      </Stack>
    </MuiPopover>
  );
};

export default PopOver;
