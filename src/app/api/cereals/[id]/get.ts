import AppDataSource from "@lib/dataSource";
import { Cereal } from "@lib/schema/db/cereal";
import { isULID } from "@lib/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const p = await params;

  if (!isULID(p.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const cereal = await AppDataSource.manager.findOne(Cereal, {
    where: { id: p.id },
  });

  if (!cereal) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ cereal });
};
