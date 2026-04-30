export const CerealTypes = ["H", "C"] as const;
export type CerealType = (typeof CerealTypes)[number];
