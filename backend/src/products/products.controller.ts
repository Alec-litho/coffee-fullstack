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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
    description: 'Return all products',
    type: [Product],
  })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create new product (Admin only)' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Product created', type: Product })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product (Admin only)' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsService.update(id, updateProductDto);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Delete(':id')
  // @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete product (Admin only)' })
  @ApiResponse({ status: 204, description: 'Product deleted' })
  async remove(@Param('id') id: number): Promise<void> {
    const result = await this.productsService.remove(id);
    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }
}
