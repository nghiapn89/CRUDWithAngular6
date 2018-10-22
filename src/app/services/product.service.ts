import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../app/model/product';

export class ProductSerializer {
  fromJson(json: any): Product {
    const product = new Product();
    product.Id = json.Id;
    product.Name = json.Name;
    return product;
  }
  toJson(product: Product): any {
    return {
      Id: product.Id,
      name: product.Name
    };
  }
}



@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericHttpService<Product> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:4500',
      'Product',
      new ProductSerializer()
    );
  }
}
