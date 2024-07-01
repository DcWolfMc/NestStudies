import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {

    @Get()
    getProducts(@Query('category') category:string){}

    @Get(":id")
    findOne(@Param('id', ParseIntPipe) id: number){
        return {}
    }

}
