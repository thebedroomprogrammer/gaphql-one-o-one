import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    ManyToMany,
} from "typeorm";
import { Account } from "./Accounts";
import { Scheme } from "./Scheme";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Account, (account) => account.user)
    account: Account[];

    @ManyToMany(() => Scheme, (scheme) => scheme.users)
    schemes: Scheme[];
}
