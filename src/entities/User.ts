import { Field, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    cool: string;

    @Field()
    @Column()
    name: string;

    @OneToMany(() => Account, (account) => account.user)
    account: Account[];

    @ManyToMany(() => Scheme, (scheme) => scheme.users)
    schemes: Scheme[];
}
