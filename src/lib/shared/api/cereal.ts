import { CEREAL_TYPES } from "@lib/back/db/cerealType";
import { MFR_CODES } from "@lib/back/db/mfrCode";
import { isInteger, isULID } from "@lib/shared/types";
import * as s from "effect/Schema";

const BrandedInteger = s.declare(isInteger, {
  identifier: "BrandedInteger",
  description: "A branded integer type",
});

const BrandedULID = s.declare(isULID, {
  identifier: "BrandedULID",
  description: "A branded ULID type",
});

export const TCerealWithoutID = s
  .Struct({
    name: s.String,
    mfr: s.Literal(...MFR_CODES),
    type: s.Literal(...CEREAL_TYPES),
    calories: BrandedInteger,
    protein: BrandedInteger,
    fat: BrandedInteger,
    sodium: BrandedInteger,
    fiber: s.Number,
    carbo: s.Number,
    sugars: BrandedInteger,
    potass: BrandedInteger,
    vitamins: BrandedInteger,
    shelf: BrandedInteger,
    weight: s.Number,
    cups: s.Number,
    rating: s.Number,
  })
  .annotations({ parseOptions: { onExcessProperty: "error" } });
export type TCerealWithoutID = (typeof TCerealWithoutID)["Type"];

export const TCerealWithID = s.Struct({
  id: BrandedULID,
  ...TCerealWithoutID.fields,
});
export type TCerealWithID = (typeof TCerealWithID)["Type"];

export const TCerealsWithoutID = s.Array(TCerealWithoutID);
export type TCerealsWithoutID = (typeof TCerealsWithoutID)["Type"];
