export const MFR_CODES = ["N", "Q", "K", "R", "G", "P", "A"] as const;
export type MfrCode = (typeof MFR_CODES)[number];
