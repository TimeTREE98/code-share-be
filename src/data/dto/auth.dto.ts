import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'test_id', description: '아이디' })
  id: string;

  @ApiProperty({ example: 'test_pw', description: '비밀번호' })
  pw: string;
}
