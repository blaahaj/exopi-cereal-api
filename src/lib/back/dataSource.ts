import { DataSource } from "typeorm";

import { DBApiKey as DBApiKey, DBCereal, DBUser } from "./db";

const AppDataSource = await new DataSource({
  type: "sqlite",
  database: "./cereals.db",
  entities: [DBCereal, DBApiKey, DBUser],
}).initialize();

export default AppDataSource;
