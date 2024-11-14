import { Stack, Typography } from "@mui/material";
import { formatTime } from "../../../utils/helper/dateFormater";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <Stack
        sx={(theme) => ({
          height: "106px",
          flexDirection: { md: "row", xs: "column" },
          alignItems: "center",

          justifyContent: "space-between",
          padding: "28px 24px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.secondary.contrastText
              : theme.palette.secondary.contrastText,
          color: theme.palette.mode === "dark" ? "#fff" : "#003464",
        })}
      >
        <Stack direction={"row"} spacing={"12px"} sx={{ alignItems: "center" }}>
          <img src="/images/logo.png" alt="" width={50} height={50} />
          <Typography variant="caption" sx={{ fontSize: "12px" }}>
            {t("footer.title")}
          </Typography>
        </Stack>
        <Stack direction={"row"} sx={{ alignItems: "center", gap: "40px" }}>
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400" }}
            variant="caption"
          >
            {t("footer.contact")}
          </Typography>
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400" }}
            variant="caption"
          >
            {formatTime(new Date())}
          </Typography>
        </Stack>
      </Stack>
    </footer>
  );
};

export default Footer;
