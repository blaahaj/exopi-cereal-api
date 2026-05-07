import AppDataSource from "@lib/back/dataSource";
import { DBCereal } from "@lib/back/db/cereal";
import type { TCerealWithoutID } from "@lib/shared/api/cereal";
import type { ULID } from "@lib/shared/types";
import { NextResponse } from "next/server";
import { ulid } from "ulid";

const doCreate = async (item: TCerealWithoutID) => {
  const itemWithId: DBCereal = {
    id: ulid() as ULID,
    ...item,
  };

  await AppDataSource.manager.insert(DBCereal, itemWithId);

  return NextResponse.json(
    {
      id: itemWithId.id,
    },
    {
      status: 201,
      headers: [
        ["Location", `http://localhost:7835/api/cereals/${itemWithId.id}`],
      ],
    },
  );
};

export default doCreate;
