import type { ULID } from "@lib/types";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

import type { APIKey } from "./apiKey";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  id: ULID = undefined as never;

  @Column({ nullable: false, type: String }) name: string = undefined as never;

  @OneToMany("APIKey", (them: APIKey) => them.user, { nullable: false })
  @JoinColumn({ name: "id", referencedColumnName: "user_id" })
  apiKeys: APIKey[] = undefined as never;
}
