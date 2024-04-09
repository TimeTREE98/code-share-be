import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [WsGateway],
})
export class AppModule {}
