import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksModule } from '../stocks/stocks.module';
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
    SuitesModule,
    StocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
