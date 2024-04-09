import { Body, Controller, Post } from '@nestjs/common';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/data/dto/auth.dto';
import { CreateUserResponse } from './auth.model';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user')
  @ApiOkResponse({ type: CreateUserResponse, description: '유저 생성 성공' })
  async createUser(@Body() body: CreateUserDTO): Promise<CreateUserResponse> {
    return await this.authService.createUser(body);
  }
}
