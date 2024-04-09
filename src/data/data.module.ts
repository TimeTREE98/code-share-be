import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService } from 'src/config/config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

const Entities = [UserEntity];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        type: 'mysql',
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUser,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature(Entities),
  ],
  exports: [TypeOrmModule],
})
export class DataModule {}
