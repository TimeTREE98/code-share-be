import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
  @ApiProperty({ example: 'success' })
  status: string;
}
