import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from './config/config'
import { typeOrmConfig } from './config/typeorm.config'
import { TransactionsModule } from './transactions/transactions.module'
import { UsersModule } from './users/users.module'
import { WalletsModule } from './wallets/wallets.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
            playground: true,
        }),
        WalletsModule,
        TransactionsModule,
        UsersModule,
    ],
})
export class AppModule {}
