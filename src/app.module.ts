import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';

@Module({
  controllers: [AppController],
  providers: [WsGateway],
})
export class AppModule {}
