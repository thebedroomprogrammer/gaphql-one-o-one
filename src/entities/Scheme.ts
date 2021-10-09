import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Scheme extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User, (user) => user.schemes)
    @JoinTable({ name: "user_scheme" })
    users: User[];
}
