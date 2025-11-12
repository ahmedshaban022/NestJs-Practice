import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    products: string[] = ['laptop', 'phone', 'tablet', 'monitor', 'keyboard', 'mouse', 'printer'];
    getAllProducts() {
        return this.products;
    }
}
