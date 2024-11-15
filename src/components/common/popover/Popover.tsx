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
        <Stack direction={"row"}>
          <Button
            variant="outlined"
            onClick={() => onChangeTheme("dark")}
            sx={(theme) => ({
              width: "94px",
              color:
                themeMode === "dark"
                  ? theme.palette.action.active
                  : theme.palette.action.disabled,
              borderColor:
                themeMode === "dark"
                  ? theme.palette.action.active
                  : theme.palette.action.disabled,
            })}
          >
            {t("header.popover.themeDarkBtn")}
          </Button>
          <Button
            variant="outlined"
            onClick={() => onChangeTheme("light")}
            sx={(theme) => ({
              width: "94px",
              color:
                themeMode === "light"
                  ? theme.palette.action.active
                  : theme.palette.action.disabled,
              borderColor:
                themeMode === "light"
                  ? theme.palette.action.active
                  : theme.palette.action.disabled,
            })}
          >
            {t("header.popover.themeLightBtn")}
          </Button>
        </Stack>
        <Divider sx={{ margin: "10px 0" }} />
        <Typography variant="caption" marginBottom={"6px"} fontSize={"16px"}>
          {t("header.popover.language")}
        </Typography>
        <Stack direction={"row"}>
          <Button
            variant="outlined"
            onClick={() => onChangeLanguage("en")}
            sx={(theme) => ({
              width: "94px",
              color:
                language === "en"
                  ? theme.palette.action.active
                  : theme.palette.action.disabled,
              borderColor:
                language === "en"
                  ? theme.palette.action.active
                  : theme.palette.action.disabled,
            })}
          >
            {t("header.popover.languageEnBtn")}
          </Button>
          <Button
            variant="outlined"
            onClick={() => onChangeLanguage("fa")}
            sx={(theme) => ({
              width: "94px",
              color:
                language === "fa"
                  ? theme.palette.action.active
                  : theme.palette.action.disabled,
              borderColor:
                language === "fa"
                  ? theme.palette.action.active
                  : theme.palette.action.disabled,
            })}
          >
            {t("header.popover.languageFaBtn")}
          </Button>
        </Stack>
        <Divider sx={{ margin: "10px 0" }} />

        <Button
          variant="text"
          sx={(theme) => ({
            justifyContent: "end",
            gap: "10px",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : theme.palette.grey[900],
          })}
          onClick={() => navigate("/")}
          endIcon={
            <IconLogOut color={themeMode === "dark" ? grey[50] : grey[900]} />
          }
        >
          {t("header.popover.exitBtn")}{" "}
        </Button>
      </Stack>
    </MuiPopover>
  );
};

export default PopOver;
