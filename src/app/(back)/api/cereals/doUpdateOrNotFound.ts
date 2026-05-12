import AppDataSource from "@lib/back/dataSource";
import { DBCereal } from "@lib/back/db/cereal";
import type { TCerealWithID } from "@lib/shared/api/cereal";
import { NextResponse } from "next/server";

const doUpdateOrNotFound = async (item: TCerealWithID) => {
  const dbItem = await AppDataSource.manager.findOne(DBCereal, {
    where: { id: item.id },
  });

  if (!dbItem) {
    return NextResponse.json({ error: "No such item" }, { status: 404 });
  }

  const updates: DBCereal = {
    ...item,
    id: dbItem.id,
  };

  await AppDataSource.manager.update(DBCereal, { id: updates.id }, updates);

  return NextResponse.json(
    { id: item.id },
    {
      status: 303,
      headers: [["Location", `http://localhost:7835/api/cereals/${item.id}`]],
    },
  );
};

export default doUpdateOrNotFound;
