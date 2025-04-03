import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGO_URI'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        ssl: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
    }),
    ProductsModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}