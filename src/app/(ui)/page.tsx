"use client";

import AddDrawer from "@components/addDrawer";
import EditDrawer from "@components/editDrawer";
import useApiKey from "@hooks/useApiKey";
import type { CerealWithID } from "@lib/schema/api/cereal";
import type { Cereal } from "@lib/schema/db/cereal";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import AllItems from "./allItems";
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
      <ResponsiveAppBar
        hasApiKey={hasApiKey}
        onNewProduct={onAdd}
        onUploadCSV={onUpload}
      />

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
