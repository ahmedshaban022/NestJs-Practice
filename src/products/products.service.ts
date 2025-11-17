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
    addProduct(productName: string) {
        this.products.push(productName);
        return `Product ${productName} added`;
    }
    updateProduct(oldName: string, newName: string) {
        const index = this.products.findIndex(product => product === oldName);
        if (index !== -1) {
            this.products[index] = newName;
            return `Product updated to ${newName}`;
        }
        return "product not found";
    }
    deleteProduct(productName: string) {
        const index = this.products.findIndex(product => product === productName);
        if (index !== -1) {
            this.products.splice(index, 1);
            return `Product ${productName} deleted`;
        }
        return "product not found";
    }
}
