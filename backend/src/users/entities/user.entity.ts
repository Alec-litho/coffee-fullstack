import { Entity, ObjectIdColumn, ObjectId, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @ObjectIdColumn()
  id: ObjectId; 

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;
}