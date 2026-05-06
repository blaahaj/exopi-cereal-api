import type { CerealWithoutID } from "@lib/schema/api/cereal";
import { CEREAL_TYPE_NAMES, type CerealType } from "@lib/schema/db/cerealType";
import { MFR_NAMES, type MfrCode } from "@lib/schema/db/mfrCode";
import { isPresent } from "@lib/types";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import type { Dispatch } from "react";

import FloatField from "./FloatField";
import IntField from "./IntField";
import Item from "./item";
import styles from "./ItemFieldSet.module.css";

export default function ItemFieldSet({
  data,
  setData,
}: {
  data: Partial<CerealWithoutID>;
  setData: Dispatch<Partial<CerealWithoutID>>;
}) {
  return (
    <Grid className={styles.dataGrid} container spacing={2}>
      {/* <Grid size={3}>
          <Item>ID</Item>
        </Grid>
        <Grid size={9}>
          <Item>{item.id}</Item>
        </Grid> */}

      <Grid size={3}>
        <Item>Name</Item>
      </Grid>
      <Grid size={9}>
        <Input
          required
          error={(data.name ?? "") === ""}
          value={data.name ?? ""}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          fullWidth
        />
      </Grid>

      <Grid size={3}>
        <Item>Manufacturer</Item>
      </Grid>
      <Grid size={9}>
        <Select
          required
          error={!data.mfr}
          value={data.mfr ?? ""}
          onChange={(e) =>
            setData({
              ...data,
              mfr: (e.target.value as MfrCode | null) ?? undefined,
            })
          }
          size="small"
        >
          {Object.entries(MFR_NAMES).map(([k, v]) => (
            <MenuItem key={k} value={k}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid size={3}>
        <Item>Type</Item>
      </Grid>
      <Grid size={9}>
        <Select
          required
          error={!data.type}
          value={data.type ?? ""}
          onChange={(e) =>
            setData({
              ...data,
              type: (e.target.value as CerealType) ?? undefined,
            })
          }
          size="small"
        >
          {Object.entries(CEREAL_TYPE_NAMES).map(([k, v]) => (
            <MenuItem key={k} value={k}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid size={12} />

      <Grid size={6} container>
        <IntField
          value={data.calories ?? null}
          onChange={(n) => setData({ ...data, calories: n ?? undefined })}
          label="Calories"
          units="kCal"
        />
        <IntField
          value={data.protein ?? null}
          onChange={(n) => setData({ ...data, protein: n ?? undefined })}
          label="Protein"
          units="grams"
        />
        <IntField
          value={data.fat ?? null}
          onChange={(n) => setData({ ...data, fat: n ?? undefined })}
          label="Fat"
          units="grams"
        />

        <FloatField
          value={data.fiber ?? null}
          onChange={(n) => setData({ ...data, fiber: n ?? undefined })}
          label="Fibre"
          units="grams"
        />
        <FloatField
          value={data.carbo ?? null}
          onChange={(n) => setData({ ...data, carbo: n ?? undefined })}
          label="Carbs"
          units="grams"
        />
        <IntField
          value={data.sugars ?? null}
          onChange={(n) => setData({ ...data, sugars: n ?? undefined })}
          label="Sugars"
          units="grams"
        />
      </Grid>

      <Grid className={styles.secondColumn} size={6} container>
        <IntField
          value={data.sodium ?? null}
          onChange={(n) => setData({ ...data, sodium: n ?? undefined })}
          label="Sodium"
          units="milligrams"
        />
        <IntField
          value={data.potass ?? null}
          onChange={(n) => setData({ ...data, potass: n ?? undefined })}
          label="Potassium"
          units="milligrams"
        />
        <IntField
          value={data.vitamins ?? null}
          onChange={(n) => setData({ ...data, vitamins: n ?? undefined })}
          label="Vitamins"
          units="% of RDA"
        />
        <IntField
          value={data.shelf ?? null}
          onChange={(n) => setData({ ...data, shelf: n ?? undefined })}
          label="Shelf"
        />

        <FloatField
          value={data.weight ?? null}
          onChange={(n) => setData({ ...data, weight: n ?? undefined })}
          label="Weight"
          units="ounces"
        />
        <FloatField
          value={data.cups ?? null}
          onChange={(n) => setData({ ...data, cups: n ?? undefined })}
          label="Cups"
        />
      </Grid>

      <Grid size={12} />

      <Grid size={6} container>
        <FloatField
          value={data.rating ?? null}
          onChange={(n) => setData({ ...data, rating: n ?? undefined })}
          label="Rating"
        />
      </Grid>
      <Grid size={6}>
        <Rating
          value={isPresent(data.rating) ? data.rating / 20 : null}
          onChange={(_e, n) =>
            setData({ ...data, rating: isPresent(n) ? n * 20 : undefined })
          }
          max={5}
          precision={0.05}
          size="large"
        />
      </Grid>
    </Grid>
  );
}
