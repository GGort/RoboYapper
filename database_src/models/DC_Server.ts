import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DC_Server {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  dcId!: string;

  @Column({
    type: "varchar",
  })
  name!: string;

  @Column({
    type: "boolean",
  })
  active!: boolean;

  @Column({
    type: "varchar",
    nullable: true,
  })
  icon?: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  banner?: string;
}
