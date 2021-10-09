import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
    RelationId,
    OneToMany,
    ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    acc: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User, { cascade: true })
    user: User;
}
