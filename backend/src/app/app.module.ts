import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypesModule } from '../product-types/product-types.module';
import { ProductsModule } from '../products/products.module';
import { SuiteCategoriesModule } from '../suite-categories/suite-categories.module';
import { SuitesModule } from '../suites/suites.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,

      autoLoadEntities: process.env.DATABASE_AUTOLOADENTITIES === 'true',
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',

      ssl: {
        rejectUnauthorized: false,
      },
    }),
    SuiteCategoriesModule,
    SuitesModule,
    ProductTypesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
