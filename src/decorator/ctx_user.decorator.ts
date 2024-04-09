import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { UserDTO } from 'src/data/dto/auth.dto';

export const CtxUser = createParamDecorator((data: any, ctx: ExecutionContext): UserDTO => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});
