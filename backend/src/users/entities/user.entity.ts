import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class User {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '9876545623320', description: 'User`s id' })  
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Oleg', description: 'User name' })  
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@gmail.com', description: 'User`s email' })  
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123', description: 'User`s password' })  
  password: string;
}