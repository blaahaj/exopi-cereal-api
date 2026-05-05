import type { Integer, ULID } from "@lib/types";
import { Column, Entity, PrimaryColumn } from "typeorm";

import type { CerealType } from "./cerealType";
import type { MfrCode } from "./mfrCode";

@Entity({ name: "cereals" })
export class Cereal {
  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  id: ULID = undefined as never;

  @Column({ nullable: false, type: String }) name: string = undefined as never;
  @Column({ nullable: false, type: String }) mfr: MfrCode = undefined as never;
  @Column({ nullable: false, type: String }) type: CerealType =
    undefined as never;

  @Column({ nullable: false, type: "int" }) calories: Integer =
    undefined as never;
  @Column({ nullable: false, type: "int" }) protein: Integer =
    undefined as never;
  @Column({ nullable: false, type: "int" }) fat: Integer = undefined as never;
  @Column({ nullable: false, type: "int" }) sodium: Integer =
    undefined as never;
  @Column({ nullable: false, type: Number }) fiber: number = undefined as never;
  @Column({ nullable: false, type: Number }) carbo: number = undefined as never;
  @Column({ nullable: false, type: "int" }) sugars: Integer =
    undefined as never;
  @Column({ nullable: false, type: "int" }) potass: Integer =
    undefined as never;
  @Column({ nullable: false, type: "int" }) vitamins: Integer =
    undefined as never;
  @Column({ nullable: false, type: "int" }) shelf: Integer = undefined as never;
  @Column({ nullable: false, type: Number }) weight: number =
    undefined as never;
  @Column({ nullable: false, type: Number }) cups: number = undefined as never;
  @Column({ nullable: false, type: Number }) rating: number =
    undefined as never;
}
