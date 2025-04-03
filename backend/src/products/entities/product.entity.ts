import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  import {
    IsString,
    IsNumber,
    IsPositive,
    IsNotEmpty,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  @Entity()
  export class Product {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Unique identifier' })
    id: number;
  
    @Column()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Laptop', description: 'Product name' })
    name: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 999.99, description: 'Product price' })
    price: number;
  
    @Column()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Electronics', description: 'Product category' })
    category: string;
  
    @Column()
    @IsString()
    @ApiProperty({ example: 'High-performance laptop', description: 'Product description' })
    description: string;
  
    @Column()
    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 50, description: 'Quantity in stock' })
    stock: number;
  }
  