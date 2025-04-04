import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Product } from '@prisma/client';
import { PaginationDto } from './dto/pagination-products.dto';


@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Return all products'
  })
  async findAll(
    @Query('page') page: number, @Query('pageSize') pageSize: number
  ): Promise<{
    data: Product[];
    pagination: {
      total: number;
      nextPage: number;
      pageSize: number;
      totalPages: number;
    };
  }> {
    console.log(page,pageSize, "------------------")
    return this.productsService.findAll({page:+page, pageSize:+pageSize});
  }

  @Post()
  @ApiOperation({ summary: 'Create new product' })
  @UseGuards(JwtAuthGuard) 
  @ApiResponse({ status: 201, description: 'Product created' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product ' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Product updated' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsService.update(id, updateProductDto);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 204, description: 'Product deleted' })
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.productsService.remove(id);
    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }
}
