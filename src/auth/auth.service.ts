import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/data/entity/user.entity';
import { CreateUserDTO } from 'src/data/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserResponse } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(body: CreateUserDTO): Promise<CreateUserResponse> {
    const existId = await this.userRepository.exists({
      where: { id: body.id },
    });

    if (existId) {
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }

    await this.userRepository.save({
      id: body.id,
      password: await bcrypt.hash(body.pw, 10),
    });

    return { status: 'success' };
  }
}
