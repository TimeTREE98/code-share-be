import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { WsGateway } from './ws.gateway';

const Entities = [UserEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'code_share_user', // TODO: env variable
      password: 'code_share_pw', // TODO: env variable
      database: 'code_share',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature(Entities),
  ],
  controllers: [AppController],
  providers: [WsGateway],
})
export class AppModule {}
