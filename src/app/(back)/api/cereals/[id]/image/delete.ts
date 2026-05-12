import { unlink } from "node:fs/promises";

import { currentUser } from "@lib/back/auth";
import AppDataSource from "@lib/back/dataSource";
import { DBCereal } from "@lib/back/db/cereal";
import { isULID } from "@lib/shared/types";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const user = await currentUser(req);
  if (!user)
    return NextResponse.json(
      { error: "Authorization required" },
      { status: 401 },
    );

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

  const imageFile = `./var/cereal-images/${cereal.id}`;
  const _deleted = await unlink(imageFile).then(
    () => true,
    () => false,
  );

  return new NextResponse(null, { status: 204 });
};
