import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
import { PaginationDto } from './dto/pagination-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService
  ) {} 

  async findAll(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    
    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.product.count(),
    ]);
    const nextPage =  page+1 <= Math.ceil(total / pageSize)? page+1 : page;
    return {
      data: products,
      pagination: {
        total,
        nextPage,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      }
    };
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.prisma.product.create({data: createProductDto});
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const product = await this.prisma.product.update({
      where: {id},
      data: updateProductDto
    });
    
    if (!product) {
      return null;
    }
    
    return product
  }

  async remove(id: string): Promise<Product> {
    return  await this.prisma.product.delete({where:{id}});
  }
}