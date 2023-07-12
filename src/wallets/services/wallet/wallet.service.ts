import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TransactionService } from '../../../transactions/services/transaction/transaction.service'
import { TransactionType } from '../../../transactions/types'
import { WalletsEntity } from '../../entities/wallets.entity'
import { CreateWalletInput } from '../../inputs/create-wallet.input'
import { WalletInput } from '../../inputs/wallet.input'

@Injectable()
export class WalletService {
    constructor(
        private _transactionsService: TransactionService,
        @InjectRepository(WalletsEntity)
        private readonly _walletRepository: Repository<WalletsEntity>,
    ) {}

    private async _checkWalletAccess(walletId: number): Promise<WalletsEntity> {
        const wallet = await this._walletRepository.findOne({
            where: { id: walletId },
        })

        if (!wallet) {
            throw new NotFoundException('Wallet not found')
        }

        if (wallet.isClosed) {
            throw new NotFoundException(
                'Wallet is closed. Operation unavailable!',
            )
        }

        return wallet
    }

    async getOneWallet(id: number): Promise<WalletsEntity | undefined> {
        return await this._walletRepository.findOne({ where: { id } })
    }

    async getAllWallets(): Promise<WalletsEntity[]> {
        return await this._walletRepository.find()
    }

    async createWallet(walletInput: CreateWalletInput): Promise<WalletsEntity> {
        return await this._walletRepository.save({ ...walletInput })
    }

    async deposit(walletInput: WalletInput): Promise<number> {
        await this._checkWalletAccess(walletInput.walletId)

        const transaction = await this._transactionsService.createTransaction({
            ...walletInput,
            type: TransactionType.IN,
        })

        await this._walletRepository.increment(
            {
                id: walletInput.walletId,
            },
            TransactionType.IN,
            walletInput.amount,
        )

        return transaction.id
    }

    async withdraw(walletInput: WalletInput): Promise<number> {
        const wallet = await this._checkWalletAccess(walletInput.walletId)

        const balance = wallet.incoming - wallet.outgoing

        if (balance < walletInput.amount) {
            throw new ForbiddenException(
                'The outgoing amount cannot exceed ' +
                    'the balance in the wallet',
            )
        }

        const transaction = await this._transactionsService.createTransaction({
            ...walletInput,
            type: TransactionType.OUT,
        })

        await this._walletRepository.increment(
            {
                id: walletInput.walletId,
            },
            TransactionType.OUT,
            walletInput.amount,
        )

        return transaction.id
    }

    async close(walletId: number): Promise<boolean> {
        await this._checkWalletAccess(walletId)

        const status = await this._walletRepository.update(
            { id: walletId },
            { isClosed: true },
        )

        return !!status.affected
    }
}
