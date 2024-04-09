import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/data/dto/auth.dto';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user')
  async createUser(@Body() body: CreateUserDTO) {
    return await this.authService.createUser(body);
  }
}
