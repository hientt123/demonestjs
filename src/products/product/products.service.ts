import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schemas/product.schema';
import { Model } from 'mongoose';
import { dtoProduct } from 'src/DTO/dto.product';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<Product>) {}

  async detail(id: string) {
    const product = await this.ProductModel.findById(id);
    return product;
  }

  async getAll(): Promise<Product[]> {
    const products = await this.ProductModel.find({});
    return products;
  }

  async deleteProduct(id: string) {
    const data = await this.ProductModel.findByIdAndDelete(id);
    return data;
  }

  async createProduct(product: dtoProduct) {
    const data = await this.ProductModel.create(product);
    return data;
  }
  async updateProduct(product: dtoProduct, id: string) {
    const data = await this.ProductModel.findByIdAndUpdate(id, product);
    return data;
  }
}
