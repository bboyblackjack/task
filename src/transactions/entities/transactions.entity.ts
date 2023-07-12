import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { WalletsEntity } from '../../wallets/entities/wallets.entity'
import { TransactionType } from '../types'

@ObjectType()
@Entity('transactions')
export class TransactionsEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    amount: number

    @Field()
    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => WalletsEntity, (wallet) => wallet.transactions, {
        nullable: false,
    })
    @JoinColumn({ name: 'walletId' })
    walletId: number
}
