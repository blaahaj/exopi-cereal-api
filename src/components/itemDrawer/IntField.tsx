import NumberField from "@components/NumberField";
import { type Integer, isAbsent, isInteger, isPresent } from "@lib/types";
import Grid from "@mui/material/Grid";
import type { Dispatch } from "react";

import Item from "./item";

export default function IntField({
  label,
  value,
  units,
  onChange,
}: {
  label: string;
  value: Integer | null;
  units?: string;
  onChange: Dispatch<Integer | null>;
}) {
  return (
    <>
      <Grid size={6}>
        <Item>{label}</Item>
      </Grid>
      <Grid size={6}>
        <NumberField
          error={isAbsent(value)}
          required
          label={units}
          min={-1}
          max={10000}
          value={value ?? null}
          onValueChange={(n) =>
            onChange(isPresent(n) && isInteger(n) ? n : null)
          }
          size="small"
        />
      </Grid>
    </>
  );
}
