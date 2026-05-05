import NumberField from "@components/NumberField";
import { isAbsent } from "@lib/types";
import Grid from "@mui/material/Grid";
import type { Dispatch } from "react";

import Item from "./item";

export default function FloatField({
  label,
  value,
  units,
  onChange,
}: {
  label: string;
  value: number | null | undefined;
  units?: string;
  onChange: Dispatch<number | null>;
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
          max={1000}
          value={value ?? null}
          onValueChange={(n) => onChange(n)}
          size="small"
        />
      </Grid>
    </>
  );
}
