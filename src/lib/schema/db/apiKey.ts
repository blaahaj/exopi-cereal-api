import type { ULID } from "@lib/types";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import type { User } from "./user";

@Entity({ name: "api_keys" })
export class APIKey {
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

  @ManyToOne("User", (them: User) => them.apiKeys, { nullable: false })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User = undefined as never;
}
