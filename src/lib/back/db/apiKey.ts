import type { ULID } from "@lib/shared/types";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { DBUser } from "./user";

@Entity({ name: "api_keys" })
export class DBApiKey {
  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  id: ULID = undefined as never;

  @Column({ nullable: false, type: String, name: "api_key" }) api_key: string =
    undefined as never;

  @Column({ nullable: false, type: String, name: "user_id" }) user_id: ULID =
    undefined as never;

  @Column({ nullable: false, type: String }) expires: string =
    undefined as never;

  @ManyToOne(() => DBUser, (them: DBUser) => them.apiKeys, { nullable: false })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: DBUser = undefined as never;
}
