import AppDataSource from "@lib/dataSource";
import { Cereal } from "@lib/schema/db/cereal";
import { NextResponse, type NextRequest } from "next/server";
import type { FindOptionsOrder } from "typeorm";

export const GET = async (req: NextRequest) => {
  const search = new URL(req.url).searchParams;

  const sort = (search.get("sort") ?? "").split(/,/g);
  const order: FindOptionsOrder<Cereal> = {};
  const fields = AppDataSource.entityMetadatasMap
    .get(Cereal)!
    .columns.map((c) => c.databaseNameWithoutPrefixes);

  for (const term of sort) {
    const name = term.replace(/^-/, "");
    if (fields.includes(name)) {
      order[name as keyof typeof order] = term.startsWith("-") ? "DESC" : "ASC";
    } else {
      return NextResponse.json(
        { error: "Bad sort field", term },
        { status: 400 },
      );
    }
  }

  if (!order.id) order.id = "ASC";

  return await AppDataSource.manager
    .find(Cereal, { order })
    .then((cereals) => NextResponse.json({ cereals }));
};
