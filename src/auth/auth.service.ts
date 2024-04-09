import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/data/entity/user.entity';
import { CreateUserDTO, UserDTO } from 'src/data/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { StatusResponse } from 'src/data/model/common.model';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(body: CreateUserDTO): Promise<StatusResponse> {
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

    return { status: 'OK' };
  }

  async validateUser(id: string, pw: string): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('존재하지 않는 아이디입니다.');
    }

    const isPwMatch = await bcrypt.compare(pw, user.password);

    if (!isPwMatch) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    return { idx: user.idx, id: user.id };
  }

  login(): StatusResponse {
    return { status: 'OK' };
  }
}
