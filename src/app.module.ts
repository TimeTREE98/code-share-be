import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';

@Module({
  controllers: [AppController],
  providers: [WsGateway, AppService],
})
export class AppModule {}
