import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DataModule } from 'src/data/data.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
