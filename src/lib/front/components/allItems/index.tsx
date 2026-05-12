import type { TCerealWithID } from "@lib/shared/api/cereal";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid, type GridRowParams } from "@mui/x-data-grid";
import type { Dispatch, SetStateAction } from "react";

import columns from "./columns";
import initialVisibility from "./initialVisibility";

export default function AllItems({
  rows,
  setEditDrawerOpenFor,
}: {
  rows: readonly TCerealWithID[] | undefined;
  setEditDrawerOpenFor: Dispatch<SetStateAction<TCerealWithID | undefined>>;
}) {
  if (!rows) {
    return (
      <CircularProgress
        aria-label="Loading…"
        sx={{ marginInline: "auto", marginBlockStart: "40vh" }}
      />
    );
  }

  return (
    <DataGrid
      sx={{ marginInline: "auto", marginBlock: "2em" }}
      rows={rows}
      columns={columns}
      initialState={{
        columns: {
          columnVisibilityModel: initialVisibility,
        },
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      disableRowSelectionOnClick
      showToolbar
      onRowClick={(t, _e, _details) => {
        const { row } = t as GridRowParams<TCerealWithID>;
        setEditDrawerOpenFor(row);
      }}
    />
  );
}
