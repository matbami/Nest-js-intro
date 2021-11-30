import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const id = Math.random().toString();
    const newProduct = new Product(id, title, desc, price);
    this.products.push(newProduct);
    return this.products;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(id: string) {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      throw new NotFoundException('Product not Found');
    }
    return { ...product };
  }

  deleteProduct(id: string) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    // if (!product) {
    //   throw new NotFoundException('Product not Found');
    // }
    this.products.splice(productIndex, 1);
  }

  updateProduct(id: string, title: string, desc: string, price: number) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    let product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not Found');
    }

    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    product = { ...updatedProduct };
    return product;
  }
}
