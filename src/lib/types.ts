import { isValid } from "ulid";

export const isPresent = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const isAbsent = <T>(
  value: T | null | undefined,
): value is null | undefined => value === null || value === undefined;

export type Integer = number & { readonly tag: unique symbol };
export const isInteger = (n: unknown): n is Integer => Number.isInteger(n);

export type ULID = string & { readonly tag: unique symbol };
export const isULID = (value: unknown): value is ULID =>
  typeof value === "string" && isValid(value);
