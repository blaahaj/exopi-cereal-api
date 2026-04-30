const VALID_FIELDS = [
  "id",
  "name",
  "mfr",
  "type",
  "calories",
  "protein",
  "fat",
  "sodium",
  "fiber",
  "carbo",
  "sugars",
  "potass",
  "vitamins",
  "shelf",
  "weight",
  "cups",
  "rating",
] as const;

export const checkField = (s: string) => {
  if ((VALID_FIELDS as readonly string[]).includes(s)) return s;

  throw new Error(`Invalid attribute "${s}"`);
};
