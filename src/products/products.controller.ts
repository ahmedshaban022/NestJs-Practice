import { ProductsService } from './products.service';
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) {
    }
    @Get()
    getAllProducts() {
        return this.ProductsService.getAllProducts();
    }
}
