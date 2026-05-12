import useApiKey from "@lib/front/hooks/useApiKey";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import type { Dispatch } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CSVUploadDialog({
  onClose,
  onDataChanged,
}: {
  onClose: Dispatch<void>;
  onDataChanged: Dispatch<void>;
}) {
  const apiKey = useApiKey().getApiKey();

  return (
    <Stack spacing={4} sx={{ padding: "2em" }}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload CSV file
        <VisuallyHiddenInput
          type="file"
          accept="*.csv,text/csv"
          onChange={(event) => {
            console.log(event.target.files);
            if (event.target.files?.length !== 1) return;

            const file = event.target.files[0];

            fetch("/api/cereals/upload", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "text/csv",
              },
              body: file,
            }).then(
              () => {
                onDataChanged();
                onClose();
              },
              (e) => {
                console.error({ e });
              },
            );
          }}
          multiple
        />
      </Button>

      <Button onClick={() => onClose()}>Cancel</Button>
    </Stack>
  );
}
