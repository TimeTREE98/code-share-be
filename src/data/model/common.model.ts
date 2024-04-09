import { ApiProperty } from '@nestjs/swagger';

export class StatusResponse {
  @ApiProperty({ example: 'OK' })
  status: string;
}
