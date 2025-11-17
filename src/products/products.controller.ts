import { ProductsService } from './products.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

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
    @Post()
    addProduct(@Body("productName") productName: string) {
        return this.ProductsService.addProduct(productName);
    }
    @Patch(":productName")
    updateProduct(
        @Param("productName") productName: string,
        @Body("newName") newName: string
    ) {
        return this.ProductsService.updateProduct(productName, newName);
    }
    @Delete(":productName")
    deleteProduct(@Param("productName") productName: string) {
        return this.ProductsService.deleteProduct(productName);
    }
}
