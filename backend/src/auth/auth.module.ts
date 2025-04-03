import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
     JwtModule.register({
          secretOrPrivateKey: 'secret',
          signOptions: { expiresIn: '1d' },
        }),
    ConfigModule,
  ],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}