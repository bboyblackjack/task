import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TransactionsEntity } from '../../entities/transactions.entity'
import { CreateTransactionInput } from '../../inputs/create-transaction.input'

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(TransactionsEntity)
        private readonly _transactionRepository: Repository<TransactionsEntity>,
    ) {}
    async getOneTransaction(
        id: number,
    ): Promise<TransactionsEntity | undefined> {
        return await this._transactionRepository.findOne({ where: { id } })
    }

    async getAllTransactions(id?: number): Promise<TransactionsEntity[]> {
        return await this._transactionRepository.find(
            id ? { where: { id } } : undefined,
        )
    }

    async createTransaction(
        transactionInput: CreateTransactionInput,
    ): Promise<TransactionsEntity> {
        return await this._transactionRepository.save({ ...transactionInput })
    }
}
