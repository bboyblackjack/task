import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class WalletInput {
    @Field()
    walletId: number

    @Field()
    amount: number
}
