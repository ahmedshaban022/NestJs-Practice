import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    products: string[] = ['laptop', 'phone', 'tablet', 'monitor', 'keyboard', 'mouse', 'printer', "speaker", 'webcam', 'headphones', 'microphone', 'projector', 'scanner', 'external hard drive', 'USB flash drive', 'power bank', 'smartwatch', 'fitness tracker', 'VR headset', 'gaming console'];
    // get all products
    getAllProducts() {
        if (this.products.length === 0) {
            return "No products available";
        }
        return this.products;
    }
    // get a single product
    getProduct(productName: string) {
        return this.products.find(product => product === productName) || "product not found";
    }
    // add a new product
    addProduct(productName: string) {
        this.products.push(productName);
        return `Product ${productName} added`;
    }
    // update a product
    updateProduct(oldName: string, newName: string) {
        const index = this.products.findIndex(product => product === oldName);
        if (index !== -1) {
            this.products[index] = newName;
            return `Product updated to ${newName}`;
        }
        return "product not found";
    }
    // delete a product
    deleteProduct(productName: string) {
        const index = this.products.findIndex(product => product === productName);
        if (index !== -1) {
            this.products.splice(index, 1);
            return `Product ${productName} deleted`;
        }
        return "product not found";
    }
}
