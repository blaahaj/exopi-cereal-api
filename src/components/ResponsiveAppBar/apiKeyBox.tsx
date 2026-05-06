import useApiKey from "@hooks/useApiKey";
import { isApiKeyString } from "@lib/ApiKeyString";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default function ApiKeyBox() {
  const apiKey = useApiKey();
  const [t, setT] = useState<string>(() => apiKey.getApiKey() ?? "");

  return (
    <Search sx={{ paddingInline: "0.5em" }}>
      <SearchIconWrapper>
        {apiKey.getApiKey() ? <LockOpenIcon /> : <LockIcon />}
      </SearchIconWrapper>
      <StyledInputBase
        type="password"
        autoCorrect="false"
        autoCapitalize="false"
        autoComplete="false"
        placeholder="Enter API key"
        inputProps={{ "aria-label": "search" }}
        value={t}
        onChange={(e) => {
          setT(e.target.value);
          const trimmed = e.target.value.trim();
          apiKey.setApiKey(isApiKeyString(trimmed) ? trimmed : null);
        }}
      />
    </Search>
  );
}
