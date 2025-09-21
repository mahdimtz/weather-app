import { Stack, Typography, useTheme, Link, Box, Avatar } from "@mui/material";
import { HiOutlineMail } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const theme = useTheme();

  const wrapperHover = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
      color: theme.palette.mode === "dark" ? "#4FC3F7" : "#FFD700",
    },
  };

  const avatarNameHover = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    transition: "all 0.4s ease",
    "&:hover": {
      transform: "scale(1.1) rotate(-5deg)",
      boxShadow: theme.palette.mode === "dark"
        ? "0 4px 20px rgba(79, 195, 247, 0.5)"
        : "0 4px 20px rgba(255, 215, 0, 0.5)",
    },
    "&:hover .nameText": {
      color: theme.palette.mode === "dark" ? "#4FC3F7" : "#FFD700",
      transform: "scale(1.05)",
    },
  };

  return (
    <footer>
      <Stack
        sx={{
          flexDirection: { md: "row", xs: "column" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 24px",
          backgroundColor:
            theme.palette.mode === "dark" ? "#0D1B2A" : "#10598E",
          color: theme.palette.mode === "dark" ? "#FFFFFF" : "#F3FAFE",
          boxShadow: theme.palette.mode === "dark" 
            ? "0px -2px 10px rgba(0,0,0,0.5)" 
            : "0px -2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={avatarNameHover}>
          <Avatar
            src="/images/programmer-avatar.png"
            alt="Mahdi Montazeri"
            sx={{ width: 48, height: 48 }}
          />
          <Typography
            className="nameText"
            variant="h6"
            sx={{ fontSize: "18px", fontWeight: 500, transition: "all 0.3s ease" }}
          >
            Mahdi Montazeri
          </Typography>
        </Box>

        <Stack
          direction={{ md: "row", xs: "column" }}
          spacing={{ md: 4, xs: 1 }}
          alignItems="center"
          sx={{ marginTop: { xs: "12px", md: 0,gap:"20px" } }}
        >
          <Box sx={wrapperHover}>
            <HiOutlineMail size={20} />
            <Link
              href="mailto:mahdi.montazeri.dev@gmail.com"
              underline="hover"
              sx={{ fontSize: "16px", color: "inherit" }}
            >
              mahdi.montazeri.dev@gmail.com
            </Link>
          </Box>

          <Box sx={wrapperHover}>
            <FaGithub size={20} />
            <Link
              href="https://github.com/mahdimtz"
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{ fontSize: "16px", color: "inherit" }}
            >
              mahdimtz
            </Link>
          </Box>
        </Stack>
      </Stack>
    </footer>
  );
};

export default Footer;
