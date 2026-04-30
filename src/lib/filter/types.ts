import type { BinaryOperator } from "./binaryOperators";

export type FilterNode = Predicate;

export type Predicate = And | Or | Not | LeafNode;
export type And = { readonly and: readonly Predicate[] };
export type Or = { readonly or: readonly Predicate[] };
export type Not = { readonly not: Predicate };
export type LeafNode = BinaryOperation | UnaryOperation;
export type BinaryOperation = {
  readonly b: readonly [string, BinaryOperator, string];
};
export type UnaryOperation = { readonly u: readonly [string, "isnull"] };

export const isAnd = (f: FilterNode): f is And => "and" in f;
export const isOr = (f: FilterNode): f is Or => "or" in f;
export const isNot = (f: FilterNode): f is Not => "not" in f;
export const isBinaryOperation = (f: FilterNode): f is BinaryOperation =>
  "b" in f;
export const isUnaryOperation = (f: FilterNode): f is UnaryOperation =>
  "u" in f;
