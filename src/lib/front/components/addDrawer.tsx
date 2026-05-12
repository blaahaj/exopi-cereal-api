"use client";

import useApiKey from "@lib/front/hooks/useApiKey";
import { TCerealWithoutID } from "@lib/shared/api/cereal";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { isLeft } from "effect/Either";
import { decodeUnknownEither } from "effect/Schema";
import { type Dispatch, useMemo, useState } from "react";

import ErrorMessage from "./errorMessage";
import ItemFieldSet from "./itemDrawer/ItemFieldSet";

export default function AddDrawer({
  onClose,
  onDataChanged,
}: {
  onClose: Dispatch<void>;
  onDataChanged: Dispatch<void>;
}) {
  const [data, setData] = useState<Partial<TCerealWithoutID>>({});
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const r = decodeUnknownEither(TCerealWithoutID)(data);

  const apiKey = useApiKey().getApiKey();

  const onSave = useMemo(
    () => () =>
      isLeft(r)
        ? null
        : fetch(`/api/cereals`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              ContentType: "application/json",
            },
            body: JSON.stringify(r.right),
          }).then(
            (response) => {
              if (response.status >= 400 || response.status <= 500) {
                setErrorMessage(`Save failed (HTTP status ${response.status})`);
              } else {
                onClose();
                onDataChanged();
              }
            },
            (err) => {
              setErrorMessage(err.message);
              console.error(err);
            },
          ),
    [onClose, onDataChanged, r, apiKey],
  );

  return (
    <Stack sx={{ width: "40vw", padding: "2em" }}>
      <ItemFieldSet data={data} setData={setData} />

      <Container sx={{ marginBlockStart: "2em", width: "auto" }}>
        <Stack direction={"row"} spacing={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            disabled={isLeft(r) || !apiKey}
          >
            Save
          </Button>
          <Button variant="contained" color="inherit" onClick={() => onClose()}>
            Cancel
          </Button>
        </Stack>
      </Container>

      <ErrorMessage
        errorMessage={errorMessage}
        onClose={() => setErrorMessage(undefined)}
      />
    </Stack>
  );
}
