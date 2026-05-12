import AppDataSource from "@lib/back/dataSource";
import { DBCereal } from "@lib/back/db/cereal";
import type { TCerealWithID } from "@lib/shared/api/cereal";
import { isULID } from "@lib/shared/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const p = await params;

  if (!isULID(p.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const cereal = await AppDataSource.manager.findOne(DBCereal, {
    where: { id: p.id },
  });

  if (!cereal) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data: { readonly cereal: TCerealWithID } = { cereal };

  return NextResponse.json(data);
};
