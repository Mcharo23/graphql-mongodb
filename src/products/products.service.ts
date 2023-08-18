import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    console.log('Received DTO:', createProductDto);
    const product = this.productRepository.create({
      id: uuid(),
      title: createProductDto.title,
      price: createProductDto.price,
      discount: createProductDto.discount,
      description: createProductDto.description,
      productInStock: createProductDto.productInStock,
      productUrl: createProductDto.productUrl,
    });

    console.log(await product.save());

    return product;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productRepository.find({});
    if (products.length === 0) {
      throw new NotFoundException('No products found');
    }
    console.log(products);
    return products;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });

    console.log(product);

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
