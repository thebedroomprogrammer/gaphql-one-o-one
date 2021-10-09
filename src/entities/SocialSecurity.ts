import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
    RelationId,
} from "typeorm";
import { User } from "./User";

@Entity()
export class SocialSecurity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    identity: number;

    @OneToOne(() => User, {
        cascade: true,
    })
    @JoinColumn()
    user: User;
}
