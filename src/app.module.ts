import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'code_share_user',
      password: 'code_share_pw',
      database: 'code_share',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [WsGateway],
})
export class AppModule {}
