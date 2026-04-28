import AppDataSource from "@lib/dataSource";
import { Cereal } from "@lib/schema/db/cereal";
import { NextRequest, NextResponse } from "next/server";
import { isValid } from "ulid";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const p = await params;

  if (!isValid(p.id)) {
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
