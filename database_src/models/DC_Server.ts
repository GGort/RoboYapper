import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DC_Server {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
    })
    name!: string;

}
