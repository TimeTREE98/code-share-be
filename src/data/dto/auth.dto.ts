import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'test_id', description: '아이디' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'test_pw', description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  // TODO: pw regex 추가
  pw: string;
}
