import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/Users.Module';

@Module({
  controllers: [MarketController],
  imports: [ProductsModule,UsersModule],
})
export class MarketModule {}
