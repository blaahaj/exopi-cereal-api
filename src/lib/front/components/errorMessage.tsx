import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ErrorMessage({
  errorMessage,
  onClose,
}: {
  errorMessage: string | undefined;
  onClose: () => void;
}) {
  return (
    <Snackbar
      open={!!errorMessage}
      autoHideDuration={6000}
      onClose={onClose}
      message={
        <Stack direction={"row"}>
          <ErrorIcon fontSize="small" />
          <Typography sx={{ marginInline: "1em" }}>{errorMessage}</Typography>
        </Stack>
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}
