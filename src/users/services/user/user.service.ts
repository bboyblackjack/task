import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '../../entities/user.entity'
import { CreateUserInput } from '../../inputs/create-user.input'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepository: Repository<UserEntity>,
    ) {}

    async createUser(userInput: CreateUserInput): Promise<UserEntity> {
        return await this._userRepository.save({ ...userInput })
    }

    async getOneUser(id: number): Promise<UserEntity> {
        const user = await this._userRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException(`User with id ${id} does not exist`)
        }
        return user
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this._userRepository.find()
    }

    async removeUser(id: number): Promise<number> {
        const userToRemove = await this._userRepository.findOne(id)
        if (!userToRemove) {
            throw new NotFoundException(`User with id ${id} does not exist`)
        }
        await this._userRepository.softRemove({ id })
        return id
    }
}
