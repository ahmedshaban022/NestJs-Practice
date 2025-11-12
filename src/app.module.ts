import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/Users.Module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
