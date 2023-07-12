import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql'

import { TransactionsEntity } from '../../entities/transactions.entity'
import { CreateTransactionInput } from '../../inputs/create-transaction.input'
import { TransactionService } from '../../services/transaction/transaction.service'

@Resolver()
export class TransactionResolver {
    constructor(private readonly _transactionService: TransactionService) {}

    @Mutation(() => TransactionsEntity)
    async createTransaction(
        @Args('createTransaction')
        createTransactionInput: CreateTransactionInput,
    ): Promise<TransactionsEntity> {
        return await this._transactionService.createTransaction(
            createTransactionInput,
        )
    }

    @Query(() => TransactionsEntity)
    async transaction(
        @Args('id', {type: () => Int}) id: number,
    ): Promise<TransactionsEntity | undefined> {
        return await this._transactionService.getOneTransaction(id)
    }

    @Query(() => [TransactionsEntity])
    async transactions(
        @Args('id', { nullable: true, type: () => Int }) id?: number,
    ): Promise<TransactionsEntity[]> {
        return await this._transactionService.getAllTransactions(id)
    }
}
