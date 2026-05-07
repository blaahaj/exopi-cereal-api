"use client";

import AddDrawer from "@lib/front/components/addDrawer";
import AllItems from "@lib/front/components/allItems";
import EditDrawer from "@lib/front/components/editDrawer";
import ResponsiveAppBar from "@lib/front/components/ResponsiveAppBar";
import useApiKey from "@lib/front/hooks/useApiKey";
import type { TCerealWithID } from "@lib/shared/api/cereal";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

import ClientSideOnly from "./clientSideOnly";
import CSVUploadDialog from "./csvUploadDialog";

// import styles from "./page.module.css";

function Home() {
  const [rows, setRows] = useState<TCerealWithID[] | undefined>(undefined);
  const [refresh, setRefresh] = useState(0);
  const onDataChanged = () => setRefresh((old) => old + 1);

  useEffect(() => {
    fetch("/api/cereals")
      .then((r) =>
        r.status === 200
          ? r
              .json()
              .then((v: { cereals: TCerealWithID[] }) => setRows(v.cereals))
          : Promise.reject(`Got HTTP ${r.status} not 200`),
      )
      .catch((err) => console.error(err));
  }, [setRows, refresh]);

  const [editDrawerOpenFor, setEditDrawerOpenFor] = useState<TCerealWithID>();
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
  );
}

export default function ClientHome() {
  return (
    <ClientSideOnly>
      <Home />
    </ClientSideOnly>
  );
}
