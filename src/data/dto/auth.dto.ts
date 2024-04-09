import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ example: 'fde29066-bd46-452c-89bf-b1362e4ab098', description: 'idx' })
  idx: string;

  @ApiProperty({ example: 'test_id', description: '아이디' })
  id: string;
}

export class LoginUserDTO {
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
