import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    products: string[] = ['laptop', 'phone', 'tablet', 'monitor', 'keyboard', 'mouse', 'printer'];
    getAllProducts() {
        return this.products;
    }
    getProduct(productName: string) {
        return this.products.find(product => product === productName) || "product not found";
    }
    updateProduct(oldName: string, newName: string) {
        const index = this.products.findIndex(product => product === oldName);
        if (index !== -1) {
            this.products[index] = newName;
            return `Product updated to ${newName}`;
        }
        return "product not found";
    }
}
