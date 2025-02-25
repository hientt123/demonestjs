import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Params } from 'src/interface/params';
import { ProductsService } from './products.service';
import { dtoProduct } from 'src/DTO/dto.product';

@Controller('products')
export class ProductsController {
  constructor(private productservice: ProductsService) {}

  @Get()
  async index(@Res() res: Response) {
    try {
      const products = await this.productservice.getAll();
      res
        .status(200)
        .json({ message: 'Lấy dữ liệu thành công!!', datas: products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  @Get('detail/:id')
  async details(@Param() params: Params, @Res() res: Response) {
    const id = String(params.id);
    try {
      const product = await this.productservice.detail(id);
      res
        .status(200)
        .json({ message: 'Lấy dữ liệu thành công!!', datas: product });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  @Delete('/delete/:id')
  async delete(@Res() res: Response, @Req() request: Request) {
    const id = request.params.id;
    try {
      const data = await this.productservice.deleteProduct(id);
      res.status(200).json({ message: 'Xoa thanh cong!!', datas: data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  @Post('create')
  async create(@Res() res: Response, @Body() body: dtoProduct) {
    try {
      const data = await this.productservice.createProduct(body);
      res.status(200).json({ message: 'Tao moi thanh cong!!', datas: data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  @Put('update/:id')
  async update(
    @Param() params: Params,
    @Res() res: Response,
    @Body() body: dtoProduct,
  ) {
    const id = String(params.id);
    try {
      const data = await this.productservice.updateProduct(body, id);
      res.status(200).json({ message: 'Update thanh cong!!', datas: data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

