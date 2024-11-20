import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DC_Role {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
  })
  name!: string;

}
