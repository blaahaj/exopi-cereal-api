"use client";

import AddDrawer from "@components/addDrawer";
import EditDrawer from "@components/editDrawer";
import useApiKey from "@hooks/useApiKey";
import type { CerealWithID } from "@lib/schema/api/cereal";
import type { Cereal } from "@lib/schema/db/cereal";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import AllItems from "./allItems";
import ApiKeySetting from "./ApiKeySetting";
import ClientSideOnly from "./clientSideOnly";
import CSVUploadDialog from "./csvUploadDialog";

// import styles from "./page.module.css";

function Home() {
  const [rows, setRows] = useState<CerealWithID[] | undefined>(undefined);
  const [refresh, setRefresh] = useState(0);
  const onDataChanged = () => setRefresh((old) => old + 1);

  useEffect(() => {
    fetch("/api/cereals")
      .then((r) =>
        r.status === 200
          ? r
              .json()
              .then((v: { cereals: CerealWithID[] }) => setRows(v.cereals))
          : Promise.reject(`Got HTTP ${r.status} not 200`),
      )
      .catch((err) => console.error(err));
  }, [setRows, refresh]);

  const [editDrawerOpenFor, setEditDrawerOpenFor] = useState<Cereal>();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const onAdd = () => {
    setEditDrawerOpenFor(undefined);
    setIsAddOpen(true);
    setIsUploadOpen(false);
  };

  const onUpload = () => {
    setEditDrawerOpenFor(undefined);
    setIsAddOpen(false);
    setIsUploadOpen(true);
  };

  const hasApiKey = !!useApiKey().getApiKey();

  return (
    <Stack>
      <AppBar position="static">
        <Typography variant="h4" sx={{ margin: "0.3em" }}>
          μs.ly
        </Typography>
      </AppBar>

      <ApiKeySetting />

      <Grid container>
        <ButtonGroup
          fullWidth
          sx={{ width: "15em", margin: "auto", alignSelf: "center" }}
        >
          <Button variant="text" onClick={onAdd} disabled={!hasApiKey}>
            Add...
          </Button>
          <Button variant="text" onClick={onUpload} disabled={!hasApiKey}>
            Upload...
          </Button>
        </ButtonGroup>
      </Grid>

      <Drawer
        anchor="right"
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      >
        {isAddOpen && (
          <AddDrawer
            onClose={() => setIsAddOpen(false)}
            onDataChanged={onDataChanged}
          />
        )}
      </Drawer>

      <Drawer
        anchor="right"
        open={!!editDrawerOpenFor}
        onClose={() => setEditDrawerOpenFor(undefined)}
      >
        {editDrawerOpenFor && (
          <EditDrawer
            item={editDrawerOpenFor}
            onClose={() => setEditDrawerOpenFor(undefined)}
            onDataChanged={onDataChanged}
          />
        )}
      </Drawer>

      <Drawer
        anchor="top"
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      >
        <CSVUploadDialog
          onClose={() => setIsUploadOpen(false)}
          onDataChanged={onDataChanged}
        />
      </Drawer>

      <AllItems rows={rows} setEditDrawerOpenFor={setEditDrawerOpenFor} />
    </Stack>

    // TODO: add (button, drawer, fields, save, spinner)
    // TODO: view / edit (save, spinner)
    // TODO: "upload" UI (button, drawer, choose / paste / drop file, save, spinner)
  );
}

export default function ClientHome() {
  return (
    <ClientSideOnly>
      <Home />
    </ClientSideOnly>
  );
}
