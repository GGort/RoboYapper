import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn({
        type: 'int',
    })
    id!: number;

    @Column({
        type: "varchar"
    })
    name!: string;

    @Column({
        type: "varchar",
    })
    avatar!: string;

}
