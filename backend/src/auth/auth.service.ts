import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, username: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    
    const user = await this.userService.create(email, password, username);
    
    return { message: 'User created successfully', userId: user.id.toString() };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { sub: user.id.toString(), email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}