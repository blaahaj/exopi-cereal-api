export const BINARY_OPERATORS_TO_SQL = {
  lt: "<",
  le: "<=",
  eq: "=",
  ge: ">=",
  gt: ">",
} as const;

export type BinaryOperator = keyof typeof BINARY_OPERATORS_TO_SQL;
export const BinaryOperators = Object.keys(
  BINARY_OPERATORS_TO_SQL,
) as readonly BinaryOperator[];
