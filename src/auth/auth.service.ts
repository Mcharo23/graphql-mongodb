import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { CreateAuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserLogin } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userAuthRepository: Repository<User>,
  ) {}

  async signup(userAuth: CreateAuthDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    console.log(salt);

    const user = this.userAuthRepository.create({
      firstName: userAuth.firstName,
      middleName: userAuth.middleName,
      lastName: userAuth.lastName,
      email: userAuth.email,
      phoneNumber: userAuth.phoneNumber,
      password: await this.hashPassword(userAuth.password, salt),
      salt: salt,
    });

    try {
      await user.save();
      console.log(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(userAuth: UserLogin): Promise<User> {
    const user = await this.userAuthRepository.findOne({
      where: {
        email: userAuth.email,
      },
    });

    if (
      user &&
      user.password === (await bcrypt.hash(userAuth.password, user.salt))
    ) {
      console.log(user.password);
      console.log(await bcrypt.hash(userAuth.password, user.salt));
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
