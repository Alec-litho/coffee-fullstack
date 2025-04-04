import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty({ example: 'nojo@gmail.com' })
  email: string;
  @ApiProperty({ example: '123' })
  password: string;
}
