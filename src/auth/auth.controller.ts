import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { UserLogin } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() userLogin: UserLogin): Promise<User> {
    console.log(userLogin);
    return this.authService.login(userLogin);
  }

  @Post('/signup')
  async signup(@Body() createAuthDto: User): Promise<void> {
    return this.authService.signup(createAuthDto);
  }
}
