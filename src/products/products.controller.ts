import { ProductsService } from './products.service';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) {
    }
    @Get()
    getAllProducts() {
        return this.ProductsService.getAllProducts();
    }
    @Get(":productName")
    getProduct(@Param("productName") productName: string) {
        return this.ProductsService.getProduct(productName);
    }
    @Patch(":productName")
    updateProduct(
        @Param("productName") productName: string,
        @Body("newName") newName: string
    ) {
        return this.ProductsService.updateProduct(productName, newName);
    }
}
