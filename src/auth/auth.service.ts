import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/data/entity/user.entity';
import { CreateUserDTO } from 'src/data/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(body: CreateUserDTO) {
    console.log(body);

    return await this.userRepository.find();
  }
}
