import { NextRequest, NextResponse } from "next/server";
import AppDataSource from "@lib/dataSource";
import { Cereal } from "@lib/schema/db/cereal";
import { decodeUnknownEither } from "effect/Schema";
import { CerealWithID, CerealWithoutID } from "@lib/schema/api/cereal";
import { isRight } from "effect/Either";
import doCreate from "./doCreate";
import doUpdateOrNotFound from "./doUpdateOrNotFound";
import { currentUser } from "@lib/auth";

export const GET = () =>
  AppDataSource.manager
    .find(Cereal, { order: { id: "asc" } })
    .then((cereals) => NextResponse.json({ cereals }));

export const POST = async (req: NextRequest) => {
  const user = await currentUser(req);
  if (!user)
    return NextResponse.json(
      { error: "Authorization required" },
      { status: 401 },
    );

  const body: unknown = await req.json();

  const r1 = decodeUnknownEither(CerealWithoutID)(body);
  if (isRight(r1)) return doCreate(r1.right);

  // Un-REST
  const r2 = decodeUnknownEither(CerealWithID)(body);
  if (isRight(r2)) return doUpdateOrNotFound(r2.right);

  return NextResponse.json({ error: "Bad request" }, { status: 400 });
};
