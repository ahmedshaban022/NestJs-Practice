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
        // using the find method to search for the product in the products array and return it if found, otherwise return a message indicating that the product is not found
        return this.ProductsService.getProduct(productName);
    }
    @Post()
    addProduct(@Body("productName") productName: string) {
        // using the addProduct method of the ProductsService to add a new product to the products array and return a message indicating that the product has been added successfully
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
