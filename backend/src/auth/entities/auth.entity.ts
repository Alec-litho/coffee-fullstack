
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';

@Entity()
export class User {
  @Column()
  @ApiProperty()
  accessToken: string;
}