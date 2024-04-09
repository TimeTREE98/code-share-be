import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

class StatusResponse {
  @ApiProperty({ type: 'string', example: 'OK' })
  status: string;
}

@Controller()
export class AppController {
  constructor() {}

  @Get('/status')
  @ApiTags('status')
  @ApiOkResponse({ type: StatusResponse })
  getStatus(): { status: string } {
    return { status: 'OK' };
  }
}
