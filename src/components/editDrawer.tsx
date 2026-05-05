"use client";

import { CerealWithID, CerealWithoutID } from "@lib/schema/api/cereal";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isLeft } from "effect/Either";
import { decodeUnknownEither } from "effect/Schema";
import { type Dispatch, useCallback, useMemo, useState } from "react";

import useApiKey from "../hooks/useApiKey";
import ItemFieldSet from "./itemDrawer/ItemFieldSet";

export default function EditDrawer({
  item: x,
  onClose,
  onDataChanged,
}: {
  item: CerealWithID;
  onClose: Dispatch<void>;
  onDataChanged: Dispatch<void>;
}) {
  const [id] = useState(x.id);
  const [data, setData] = useState<Partial<CerealWithoutID>>(x);

  const r = decodeUnknownEither(CerealWithID)({ ...data, id });

  const apiKey = useApiKey().getApiKey();

  const onUpdate = useMemo(
    () => () =>
      isLeft(r)
        ? null
        : fetch(`/api/cereals/${id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              ContentType: "application/json",
            },
            body: JSON.stringify(r.right),
          }).then(
            () => {
              onClose();
              onDataChanged();
            },
            (err) => {
              // TODO show error feedback
              console.error(err);
            },
          ),
    [id, onClose, onDataChanged, r, apiKey],
  );

  const onDelete = useCallback(
    () =>
      fetch(`/api/cereals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }).then(
        () => {
          onClose();
          onDataChanged();
        },
        (err) => {
          // TODO show error feedback
          console.error(err);
        },
      ),
    [id, onClose, onDataChanged, apiKey],
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
            disabled={isLeft(r) || !apiKey}
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

      <Stack
        sx={{
          justifySelf: "center",
          marginInline: "auto",
          marginBlock: "2em",
          transform: "scale(0.75)",
        }}
      >
        <Typography variant="body2">ID: {id}</Typography>
      </Stack>
    </Stack>
  );
}
