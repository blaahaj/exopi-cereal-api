import useApiKey from "@hooks/useApiKey";
import { isApiKeyString } from "@lib/ApiKeyString";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function ApiKeySetting() {
  const [apiKeyText, setApiKeyText] = useState("");
  const writeableApiKey = useApiKey();

  return (
    <Stack direction={"row"} sx={{ margin: "2em" }} spacing={1}>
      <Typography sx={{ verticalAlign: "baseline" }}>API Key:</Typography>
      <Input
        color={writeableApiKey.getApiKey() ? "success" : "error"}
        sx={{ width: "20em" }}
        type="password"
        placeholder="Enter API key"
        value={apiKeyText}
        onChange={(e) => {
          const v = e.target.value;
          setApiKeyText(v);
          writeableApiKey.setApiKey(isApiKeyString(v) ? v : null);
        }}
      />
    </Stack>
  );
}
