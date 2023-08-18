import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/retrieve-products')
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @Get('/:id/product')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.getProductById(id);

    return product;
  }

  @Post('/add-product')
  async createProducts(
    @Body() createProductDtos: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create(createProductDtos);
  }
}
