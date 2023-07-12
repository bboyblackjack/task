import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TransactionsEntity } from './entities/transactions.entity'
import { TransactionResolver } from './resolvers/transaction/transaction.resolver'
import { TransactionService } from './services/transaction/transaction.service'

@Module({
    imports: [TypeOrmModule.forFeature([TransactionsEntity])],
    providers: [TransactionService, TransactionResolver],
    exports: [TransactionService],
})
export class TransactionsModule {}
