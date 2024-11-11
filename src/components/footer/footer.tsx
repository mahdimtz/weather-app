import { Stack, Box, Typography } from "@mui/material";
import React from "react";
import { formatTime } from "../../utils/helper/dateFormater";

const Footer = () => {
  return (
    <footer>
      <Stack
        direction={"row"}
        sx={(theme) => ({
          height: "106px",
          // background:
          //   "linear-gradient(90deg, #F3FAFE 0%, rgba(204, 221, 221, 0.619608) 51%, #F3FAFE 100%)",
          justifyContent: "space-between",
          padding: "28px 24px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.secondary.contrastText
              : theme.palette.primary.light,
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        })}
      >
        <Stack direction={"row"} spacing={"12px"} sx={{ alignItems: "center" }}>
          <img src="/images/logo.png" alt="" width={50} height={50} />
          <Typography variant="caption" sx={{ fontSize: "12px" }}>
            All rights of this site are reserved for Nadin Sadr Aria Engineering
            Company.
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={"40px"} sx={{ alignItems: "center" }}>
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400" }}
            variant="caption"
          >
            contact us : info@nadin.ir
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
