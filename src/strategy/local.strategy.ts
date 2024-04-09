import { AuthService } from 'src/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
      passwordField: 'pw',
    });
  }

  async validate(id: string, pw: string): Promise<any> {
    return await this.authService.validateUser(id, pw);
  }
}
