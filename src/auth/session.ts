import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDTO } from 'src/data/dto/auth.dto';

@Injectable()
export class Session extends PassportSerializer {
  serializeUser(user: UserDTO, done: (err: Error, user: UserDTO) => void): void {
    done(null, user);
  }

  deserializeUser(payload: UserDTO, done: (err: Error, payload: UserDTO) => void): void {
    done(null, payload);
  }
}
