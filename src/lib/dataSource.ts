import { DataSource } from "typeorm";
import { Cereal } from "./schema/db/cereal";
import { APIKey } from "./schema/db/apiKey";
import { User } from "./schema/db/user";

const AppDataSource = await new DataSource({
  type: "sqlite",
  database: "./cereals.db",
  entities: [Cereal, APIKey, User],
}).initialize();

export default AppDataSource;
