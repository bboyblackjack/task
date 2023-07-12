import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { WalletsEntity } from '../../wallets/entities/wallets.entity'

@ObjectType()
@Entity('users')
export class UserEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date

    @Field()
    @Column()
    email: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    username: string

    @DeleteDateColumn()
    deletedAt?: Date

    @OneToMany(() => WalletsEntity, (wallet) => wallet.userId)
    wallets: WalletsEntity[]
}
