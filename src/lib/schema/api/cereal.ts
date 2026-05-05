import { isInteger, isULID } from "@lib/types";
import * as s from "effect/Schema";

import { CEREAL_TYPES } from "../db/cerealType";
import { MFR_CODES } from "../db/mfrCode";

const BrandedInteger = s.declare(isInteger, {
  identifier: "BrandedInteger",
  description: "A branded integer type",
});

const BrandedULID = s.declare(isULID, {
  identifier: "BrandedULID",
  description: "A branded ULID type",
});

export const CerealWithoutID = s
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
export type CerealWithoutID = (typeof CerealWithoutID)["Type"];

export const CerealWithID = s.Struct({
  id: BrandedULID,
  ...CerealWithoutID.fields,
});
export type CerealWithID = (typeof CerealWithID)["Type"];

export const CerealsWithoutID = s.Array(CerealWithoutID);
export type CerealsWithoutID = (typeof CerealsWithoutID)["Type"];
