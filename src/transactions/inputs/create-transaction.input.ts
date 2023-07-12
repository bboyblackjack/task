import { InputType, Field } from '@nestjs/graphql'

import { TransactionType } from '../types'

@InputType()
export class CreateTransactionInput {
    @Field()
    amount: number

    @Field()
    type: TransactionType

    @Field()
    walletId: number
}
