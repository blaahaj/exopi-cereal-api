import { currentUser } from "@lib/back/auth";
import AppDataSource from "@lib/back/dataSource";
import { DBCereal } from "@lib/back/db/cereal";
import { TCerealsWithoutID } from "@lib/shared/api/cereal";
import type { ULID } from "@lib/shared/types";
import { isLeft } from "effect/Either";
import { flatMap } from "effect/Either";
import { decodeUnknownEither } from "effect/Schema";
import { type NextRequest, NextResponse } from "next/server";
import { ulid } from "ulid";

import { parseDataFile } from "./parseDataFile";

export const POST = async (req: NextRequest) => {
  const user = await currentUser(req);
  if (!user)
    return NextResponse.json(
      { error: "Authorization required" },
      { status: 401 },
    );

  const t = await req.text();
  const r = flatMap(parseDataFile(t), decodeUnknownEither(TCerealsWithoutID));

  if (isLeft(r)) {
    return NextResponse.json(
      {
        error: r.left instanceof Error ? r.left.message : String(r.left),
      },
      { status: 400 },
    );
  }

  const toInsert: DBCereal[] = r.right.map((v) => ({
    id: ulid() as ULID,
    ...v,
  }));

  await AppDataSource.manager.transaction(async (em) => {
    em.insert(DBCereal, toInsert);
  });

  return NextResponse.json({ ids: toInsert.map((t) => t.id) });
};
