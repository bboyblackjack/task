import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UserEntity } from '../../entities/user.entity'
import { CreateUserInput } from '../../inputs/create-user.input'
import { UserService } from '../../services/user/user.service'

@Resolver()
export class UserResolver {
    constructor(private readonly _userService: UserService) {}

    @Mutation(() => UserEntity)
    async createUser(
        @Args('createUser') createUserInput: CreateUserInput,
    ): Promise<UserEntity> {
        return await this._userService.createUser(createUserInput)
    }

    @Mutation(() => Number)
    async deleteUser(@Args('id') id: number): Promise<number> {
        return await this._userService.removeUser(id)
    }

    @Query(() => UserEntity)
    async user(@Args('id') id: number): Promise<UserEntity | undefined> {
        return await this._userService.getOneUser(id)
    }

    @Query(() => [UserEntity])
    async users(): Promise<UserEntity[]> {
        return await this._userService.getAllUsers()
    }
}
