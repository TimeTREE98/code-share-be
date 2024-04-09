import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DataModule } from 'src/data/data.module';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Session } from './session';

@Module({
  imports: [DataModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, Session],
})
export class AuthModule {}
