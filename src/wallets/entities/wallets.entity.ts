import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { TransactionsEntity } from '../../transactions/entities/transactions.entity'
import { UserEntity } from '../../users/entities/user.entity'

@ObjectType()
@Entity('wallets')
export class WalletsEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    title: string

    @Field({ nullable: true, defaultValue: 0 })
    @Column({ nullable: true, default: 0 })
    incoming: number

    @Field({ nullable: true, defaultValue: 0 })
    @Column({ nullable: true, default: 0 })
    outgoing: number

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date

    @Field({ defaultValue: false })
    @Column({ default: false })
    isClosed: boolean

    @ManyToOne(() => UserEntity, (user) => user.wallets, { nullable: false })
    @JoinColumn({ name: 'userId' })
    userId: number

    @OneToMany(() => TransactionsEntity, (transaction) => transaction.walletId)
    transactions: TransactionsEntity[]
}
