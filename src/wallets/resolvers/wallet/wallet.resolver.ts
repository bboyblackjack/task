import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { WalletsEntity } from '../../entities/wallets.entity'
import { CreateWalletInput } from '../../inputs/create-wallet.input'
import { WalletInput } from '../../inputs/wallet.input'
import { WalletService } from '../../services/wallet/wallet.service'

@Resolver()
export class WalletResolver {
    constructor(private readonly _walletService: WalletService) {}

    @Mutation(() => WalletsEntity)
    async createWallet(
        @Args('createWallet') createWalletInput: CreateWalletInput,
    ): Promise<WalletsEntity> {
        return await this._walletService.createWallet(createWalletInput)
    }

    @Mutation(() => Number)
    async deposit(@Args('deposit') walletInput: WalletInput): Promise<number> {
        return await this._walletService.deposit(walletInput)
    }

    @Mutation(() => Number)
    async withdraw(
        @Args('withdraw') walletInput: WalletInput,
    ): Promise<number> {
        return await this._walletService.withdraw(walletInput)
    }

    @Mutation(() => Boolean)
    async close(@Args('walletId') walletId: number): Promise<boolean> {
        return await this._walletService.close(walletId)
    }

    @Query(() => [WalletsEntity])
    async wallets(): Promise<WalletsEntity[]> {
        return await this._walletService.getAllWallets()
    }

    @Query(() => WalletsEntity)
    async wallet(@Args('id') id: number): Promise<WalletsEntity | undefined> {
        return await this._walletService.getOneWallet(id)
    }
}
