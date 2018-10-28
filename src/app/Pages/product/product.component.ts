import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../app/model/product';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.css',
    '../../../../node_modules/primeng/resources/primeng.min.css',
    '../../../../node_modules/primeng/resources/themes/omega/theme.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ProductService, FormBuilder, Validators],
})
export class ProductComponent implements OnInit {
  @ViewChild('productDataTable') productDataTable: DataTable;
  public products: Product[];
  public products_error: Boolean = false;
  public product = new Product();
  public isAdd: Boolean = false;
  public isEdit: Boolean = false;
  public isLoadingData: Boolean = false;

  addProductFG: FormGroup;
  editProductFG: FormGroup;

  createUrl = ' ';
  updateUrl = ' ';
  deleteUrl = ' ';
  getAllUrl = ' ';

  addSuccess: boolean;
  editSuccess: boolean;

  displayAddDialog: Boolean = false;
  displayEditDialog: Boolean = false;

  constructor(private http: Http, private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit() {
    this.addProductFG = this.fb.group({
      'name': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });

    this.editProductFG = this.fb.group({
      'name': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });

    this.isAdd = true;
    this.isEdit = false;

    const p1: Product = new Product();
    p1.Id = 1;
    p1.Name = 'Áo thun';
    p1.Price = 150000;
    const p2: Product = new Product();
    p2.Id = 2;
    p2.Name = 'Quần Jean';
    p2.Price = 200000;
    const p3: Product = new Product();
    p3.Id = 3;
    p3.Name = 'Mũ lưỡi trai';
    p3.Price = 120000;
    const p4: Product = new Product();
    p4.Id = 4;
    p4.Name = 'Áo sơ mi';
    p4.Price = 200000;
    const p5: Product = new Product();
    p5.Id = 2;
    p5.Name = 'Quần Jean';
    p5.Price = 200000;
    const p6: Product = new Product();
    p6.Id = 2;
    p6.Name = 'Quần Jean';
    p6.Price = 200000;
    this.products = [p1, p2, p3, p4, p5, p6];
    // this.getAllProducts();
  }

  public getAllProducts() {
    this.isLoadingData = true;
    this.productService.getAll(this.getAllUrl)
      .subscribe(
        data => {
          this.products = data;
        },
        error => {
          console.log(error),
            this.isLoadingData = false;
        },
        () => {
          this.isLoadingData = false;
        });
  }

  public editProduct(_product: Product) {
    this.displayEditDialog = true;
    this.isEdit = true;
    this.isAdd = false;
    this.product = { Id: _product.Id, Name: _product.Name, Description: _product.Description, Price : _product.Price };
  }

  public updateProduct(product) {
    this.productService.update(product, this.updateUrl).subscribe(
      data => {
        this.getAllProducts();
        alert('Product Updated Successfully!');
        this.editSuccess = true;
        this.displayEditDialog = false;

        this.product = new Product();
        this.isEdit = false;
        this.isAdd = true;
        return true;
      },
      error => {
        console.error('Error saving Product!');
        this.editSuccess = false;
        alert(error);
      }
    );
  }

  public deleteProduct(_product: Product) {
    if (confirm('Bạn có chắc chắc muốn xóa Sản phẩm này?')) {
      this.productService.delete(_product.Id, this.deleteUrl).subscribe(
        data => {
          // refresh the list
          alert('Product Deleted Successfully!');
          this.getAllProducts();
          return true;
        },
        error => {
          this.isLoadingData = false;
          console.error('Error deleting Product!');
          alert(error);
        },
        () => {
          this.isLoadingData = false;
        }
      );
    }
  }

  public clearData(): void {
    this.product = new Product();
    this.isEdit = false;
    this.isAdd = true;

    this.displayAddDialog = false;
    this.displayEditDialog = false;
  }

  addProduct(product: Product) {

    this.isAdd = true;
    this.isEdit = false;

    this.productService.create(product, this.createUrl).subscribe(
      data => {
        this.getAllProducts();
        alert('Product Added Successfully!');
        this.addSuccess = true;
        this.displayAddDialog = false;

        this.product = new Product();
        return true;
      },
      error => {
        console.error('Error saving Product!');
        this.addSuccess = false;
        alert(error);
      }
    );
  }
  addProductDialog() {
    this.displayAddDialog = true;
  }

}
