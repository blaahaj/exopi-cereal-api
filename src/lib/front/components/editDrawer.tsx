"use client";

import useApiKey from "@lib/front/hooks/useApiKey";
import { TCerealWithID, TCerealWithoutID } from "@lib/shared/api/cereal";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isLeft } from "effect/Either";
import { decodeUnknownEither } from "effect/Schema";
import { type Dispatch, useCallback, useMemo, useState } from "react";

import ErrorMessage from "./errorMessage";
import ItemFieldSet from "./itemDrawer/ItemFieldSet";

export default function EditDrawer({
  item: x,
  onClose,
  onDataChanged,
}: {
  item: TCerealWithID;
  onClose: Dispatch<void>;
  onDataChanged: Dispatch<void>;
}) {
  const [id] = useState(x.id);
  const [data, setData] = useState<Partial<TCerealWithoutID>>(x);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const decodeResult = decodeUnknownEither(TCerealWithID)({ ...data, id });

  const apiKey = useApiKey().getApiKey();

  const handleWritePromise = useMemo(
    () => (promise: Promise<Response>, failMessage: string) =>
      promise.then(
        (response) => {
          if (response.status >= 400 || response.status <= 500) {
            setErrorMessage(`${failMessage} (HTTP status ${response.status})`);
          } else {
            onClose();
            onDataChanged();
          }
        },
        (err) => {
          setErrorMessage(String(err));
          console.error(err);
        },
      ),
    [onClose, onDataChanged],
  );

  const onUpdate = useMemo(
    () => () =>
      isLeft(decodeResult)
        ? null
        : handleWritePromise(
            fetch(`/api/cereals/${id}`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                ContentType: "application/json",
              },
              body: JSON.stringify(decodeResult.right),
            }),
            "Update failed",
          ),
    [decodeResult, handleWritePromise, id, apiKey],
  );

  const onDelete = useCallback(
    () =>
      handleWritePromise(
        fetch(`/api/cereals/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }),
        "Delete failed",
      ),
    [handleWritePromise, id, apiKey],
  );

  return (
    <Stack sx={{ width: "40vw", padding: "2em" }}>
      <ItemFieldSet data={data} setData={setData} />

      <Container sx={{ marginBlockStart: "2em", width: "auto" }}>
        <Stack direction={"row"} spacing={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={onUpdate}
            disabled={isLeft(decodeResult) || !apiKey}
          >
            Update
          </Button>
          <Button variant="contained" color="inherit" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onDelete}
            disabled={!apiKey}
          >
            Delete
          </Button>
        </Stack>
      </Container>

      <ErrorMessage
        errorMessage={errorMessage}
        onClose={() => setErrorMessage(undefined)}
      />

      <Stack direction={"row"} sx={{ margin: "2em" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{ margin: "auto", display: "block" }}
          src={`/api/cereals/${id}/image`}
          alt="[product image]"
        />
      </Stack>

      <Stack
        sx={{
          justifySelf: "center",
          marginInline: "auto",
          marginBlock: "2em",
          transform: "scale(0.75)",
        }}
      >
        <Grid container sx={{ verticalAlign: "top" }} spacing={1}>
          <Typography variant="body2">ID:</Typography>
          <Typography variant="body2">{id}</Typography>
          <IconButton
            onClick={() => navigator.clipboard.writeText(id)}
            sx={{ position: "relative", top: "-0.5em" }} // ugly
          >
            <ContentCopy />
          </IconButton>
        </Grid>
      </Stack>
    </Stack>
  );
}
