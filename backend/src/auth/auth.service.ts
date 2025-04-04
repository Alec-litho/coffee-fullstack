import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUser: CreateUserDTO) {
    let exists = await this.prisma.user.findFirst({where:{email:createUser.email}})
    if(exists) {
      throw new HttpException(`User with the same email already exists`, HttpStatus.FOUND);
    }
    let registerUser: Prisma.UserCreateInput = {
      ...createUser
    };
    return await this.prisma.user.create({ data: registerUser });
  }

  async login(loginUserDTO: LoginUserDTO) {
    console.log( loginUserDTO)

    const user = await this.prisma.user.findFirst({ where: { email: loginUserDTO.email } });
    if (!user) throw new NotFoundException(`No user found for email: ${loginUserDTO.email}`);

    const isPasswordValid = loginUserDTO.password === user.password

    if (!isPasswordValid) throw new HttpException(`Password doesn't match`, HttpStatus.BAD_REQUEST);
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async validateJwtUser(userId: string): Promise<{ id: string }> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User not found`);
    return { id: user.id }
  }
}
