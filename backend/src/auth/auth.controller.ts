import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthEntity } from './entities/auth.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error, some of the fields are not provided',
  })
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDTO) {
    return await this.authService.register(createUserDto);
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error, some of the fields are not provided',
  })
  @ApiOkResponse({ type: AuthEntity })
  @Post('/login')
  login(@Body() LoginUserDTO: LoginUserDTO) {
    return this.authService.login(LoginUserDTO);
  }
}
