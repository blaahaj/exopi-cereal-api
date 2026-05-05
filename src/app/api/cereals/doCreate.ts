import AppDataSource from "@lib/dataSource";
import type { CerealWithID, CerealWithoutID } from "@lib/schema/api/cereal";
import { Cereal } from "@lib/schema/db/cereal";
import type { ULID } from "@lib/types";
import { NextResponse } from "next/server";
import { ulid } from "ulid";

const doCreate = async (item: CerealWithoutID) => {
  const itemWithId: CerealWithID = {
    id: ulid() as ULID,
    ...item,
  };

  await AppDataSource.manager.insert(Cereal, itemWithId);

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
