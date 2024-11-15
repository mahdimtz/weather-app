import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

type SelectLanguageProps = {
  selectedLanguage: string;
  handleChange: (event: SelectChangeEvent) => void;
  t: (params: string) => string;
  labelColor: string;
};
const SelectLanguage = ({
  selectedLanguage,
  handleChange,
  t,
  labelColor,
}: SelectLanguageProps) => {
  return (
    <FormControl
      variant="standard"
      sx={{
        width: "220px",
        marginTop: "40px",
        "& .MuiInputLabel-root": {
          left: selectedLanguage === "fa" ? "auto" : "0",
          right: selectedLanguage === "fa" ? "0" : "auto",
          transformOrigin: selectedLanguage === "fa" ? "top right" : "top left",
        },
      }}
    >
      <InputLabel
        id="demo-simple-select-standard-label"
        sx={{
          color: labelColor,
          "&.Mui-focused": {
            color: labelColor,
          },
        }}
      >
        {t("login.label")}
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={selectedLanguage}
        onChange={handleChange}
        label={t("login.label")}
        sx={{
          "& .MuiSelect-select": {
            color: labelColor,
          },
          "& .MuiSvgIcon-root": {
            color: labelColor,
          },
        }}
      >
        <MenuItem value={"en"}>{t("login.languageEn")}</MenuItem>
        <MenuItem value={"fa"}>{t("login.languageFa")}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectLanguage;
