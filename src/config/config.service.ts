import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT');
  }

  get dbUser(): string {
    return this.configService.get<string>('DB_USER');
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  get dbName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  get sessionSecret(): string {
    return this.configService.get<string>('SESSION_SECRET');
  }
}
