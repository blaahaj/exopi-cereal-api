import { readFile } from "node:fs/promises";

import AppDataSource from "@lib/back/dataSource";
import { DBCereal } from "@lib/back/db/cereal";
import { isULID } from "@lib/shared/types";
import { NextRequest, NextResponse } from "next/server";

const inferContentType = (buffer: Buffer) => {
  const head = buffer.subarray(0, 16).toString("binary");
  if (head.includes("JFIF")) return "image/jpeg";
  if (head.includes("PNG")) return "image/png";
  return "application/octet-stream";
};

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

  const imageFile = `./var/cereal-images/${cereal.id}`;
  const buffer = await readFile(imageFile).catch(() => null);

  if (buffer === null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse<Buffer>(buffer, {
    headers: {
      "content-type": inferContentType(buffer),
    },
  });
};
