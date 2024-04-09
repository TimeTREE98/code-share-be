import { Body, Controller, Get, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';

import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginUserDTO, UserDTO } from 'src/data/dto/auth.dto';
import { LocalGuard } from 'src/guard/local.guard';
import { StatusResponse } from 'src/data/model/common.model';
import { IsAuthGuard } from 'src/guard/auth.guard';
import { CtxUser } from 'src/decorator/ctx_user.decorator';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user')
  @ApiOkResponse({ type: StatusResponse, description: '유저 생성 성공' })
  async createUser(@Body() body: CreateUserDTO): Promise<StatusResponse> {
    return await this.authService.createUser(body);
  }

  @UseGuards(LocalGuard)
  @Post('/login')
  @ApiOkResponse({ type: StatusResponse, description: '로그인 성공' })
  async login(@Body() _: LoginUserDTO): Promise<StatusResponse> {
    return this.authService.login();
  }

  @ApiCookieAuth()
  @UseGuards(IsAuthGuard)
  @Post('/logout')
  @ApiOkResponse({ type: StatusResponse, description: '로그아웃 성공' })
  async logout(@Req() req: any): Promise<StatusResponse> {
    const logoutError = await new Promise((resolve) => req.logout({ keepSessionInfo: false }, (error) => resolve(error)));

    if (logoutError) {
      throw new InternalServerErrorException();
    }

    return { status: 'OK' };
  }

  @ApiCookieAuth()
  @UseGuards(IsAuthGuard)
  @Get('/me')
  @ApiOkResponse({ type: UserDTO, description: '내 정보 조회 성공' })
  async me(@CtxUser() user: UserDTO): Promise<UserDTO> {
    return user;
  }
}
