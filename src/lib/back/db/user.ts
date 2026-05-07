import type { ULID } from "@lib/shared/types";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

import { DBApiKey } from "./apiKey";

@Entity({ name: "users" })
export class DBUser {
  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  id: ULID = undefined as never;

  @Column({ nullable: false, type: String }) name: string = undefined as never;

  @OneToMany(() => DBApiKey, (them: DBApiKey) => them.user, { nullable: false })
  @JoinColumn({ name: "id", referencedColumnName: "user_id" })
  apiKeys: DBApiKey[] = undefined as never;
}
