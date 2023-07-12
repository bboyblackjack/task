import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TransactionsModule } from '../transactions/transactions.module'

import { WalletsEntity } from './entities/wallets.entity'
import { WalletResolver } from './resolvers/wallet/wallet.resolver'
import { WalletService } from './services/wallet/wallet.service'

@Module({
    imports: [TypeOrmModule.forFeature([WalletsEntity]), TransactionsModule],
    providers: [WalletService, WalletResolver],
})
export class WalletsModule {}
