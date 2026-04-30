import { flatMap, map, mapLeft, right, type Either } from "effect/Either";
import { decodeUnknownEither } from "effect/Schema";
import { NextResponse } from "next/server";
import { compileFilter, type Compiled } from "../../../lib/filter/compile";
import { pipe } from "effect/Function";
import { jsonParse } from "./jsonParse";
import { FilterNode } from "@lib/filter/schema";

export const getWhere = (
  spec: string | null | undefined,
): Either<Compiled | undefined, NextResponse> => {
  if (!spec) return right(undefined);

  return pipe(
    spec,
    jsonParse,
    flatMap(decodeUnknownEither(FilterNode)),
    mapLeft(() =>
      NextResponse.json({ error: "Invalid filter" }, { status: 400 }),
    ),
    map(compileFilter),
  );
};
