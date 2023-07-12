import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateWalletInput {
    @Field()
    title: string

    @Field()
    userId: number
}
