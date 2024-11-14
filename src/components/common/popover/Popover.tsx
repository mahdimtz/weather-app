import { Button, Divider, Popover as MuiPopover, Stack, Typography } from '@mui/material'
import IconLogOut from '../../../assets/icons/IconLogOut'
import { useNavigate } from 'react-router-dom'
type PopOverProps ={
    open:boolean;
    id:any;
    showPopOver:any
    handleClose:()=>void;
    onChangeLanguage:(params:"fa"|"en")=>void;
    onChangeTheme:(params:string)=>void;
    t:(params:string)=>string;

}

const PopOver = ({handleClose,onChangeLanguage,onChangeTheme,t,open,id,showPopOver}:PopOverProps) => {
    const navigate = useNavigate()
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
              <Typography
                variant="caption"
                marginBottom={"6px"}
                fontSize={"16px"}
              >
                {t("header.popover.mode")}
              </Typography>
              <Stack direction={"row"}>
                <Button
                  variant="outlined"
                  onClick={() => onChangeTheme("dark")}
                  sx={{ width: "94px" }}
                >
                  {t("header.popover.themeDarkBtn")}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => onChangeTheme("light")}
                  sx={{ width: "94px" }}
                >
                  {t("header.popover.themeLightBtn")}
                </Button>
              </Stack>
              <Divider sx={{ margin: "10px 0" }} />
              <Typography
                variant="caption"
                marginBottom={"6px"}
                fontSize={"16px"}
              >
                {t("header.popover.language")}
              </Typography>
              <Stack direction={"row"}>
                <Button
                  variant="outlined"
                  onClick={() => onChangeLanguage("en")}
                  sx={{ width: "94px" }}
                >
                  {t("header.popover.languageEnBtn")}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => onChangeLanguage("fa")}
                  sx={{ width: "94px" }}
                >
                  {t("header.popover.languageFnBtn")}
                </Button>
              </Stack>
              <Divider sx={{ margin: "10px 0" }} />

              <Button
                variant="text"
                sx={{ gap: "20px" }}
                onClick={() => navigate("/")}
              >
                 {t("header.popover.exitBtn")} <IconLogOut />
              </Button>
            </Stack>
          </MuiPopover>
  )
}

export default PopOver