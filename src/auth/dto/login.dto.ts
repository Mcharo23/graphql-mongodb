import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class UserLogin extends BaseEntity {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
