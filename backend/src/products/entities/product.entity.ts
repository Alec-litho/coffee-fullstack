import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Laptop', description: 'Product name' })
  name: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 999.99, description: 'Product price' })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Electronics', description: 'Product category' })
  category: string;

  @IsString()
  @ApiProperty({
    example: 'High-performance laptop',
    description: 'Product description',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 50, description: 'Quantity in stock' })
  stock: number;
}
