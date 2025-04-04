import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'nojo@gmail.com' })
  email: string;
  @ApiProperty({ example: '123' })
  password: string;
}
