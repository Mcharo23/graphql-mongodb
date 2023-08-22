import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class SalesService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { productId, quantity, totalAmount, customer } = createSaleDto;

    const product = await this.getProductById(productId);

    if (quantity > product.productInStock) {
      throw new BadRequestException(
        `Sorry, insufficient product present. the products in stock now is ${product.productInStock}`,
      );
    }

    return 'This action adds a new sale';
  }

  findAll() {
    return `This action returns all sales`;
  }

  // async findOne(productId: string): Promise<Sale> {
  //   return await this.saleRepository.findOne({
  //     where: {
  //       productId: productId,
  //     },
  //   });
  // }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });

    this.logger.log(product);

    if (!product) {
      throw new NotFoundException('No product found');
    }

    return product;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
