import { Controller } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/Users.service';
import { Get } from '@nestjs/common';
@Controller('market')
export class MarketController {
    constructor(private readonly productsService: ProductsService, private readonly usersService: UsersService) {
    }
    @Get()
        firstFunction(){
            const products = this.productsService.getAllProducts();
            const users = this.usersService.getAllUsers();
                return {products, users};
        }
}
