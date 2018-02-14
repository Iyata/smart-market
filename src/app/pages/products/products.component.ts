import { Component, OnInit } from '@angular/core';
import { ProductsManagementService } from '../../services/products-management.service';
import { CategoriesManagementService } from '../../services/categories-management.service';

import * as firebase from 'firebase';

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productModel = {
    name: '',
    desc: '',
    quantity: 0,
    costPrice: 0,
    sellingPrice: 0,
    category: '',
    dateAdded: ''
  };

  products = [];

  isLoading = false;

  errMessage = '';

  modalState = 'add';

  categories = [];

  user: any = {};

  constructor(
    public productsManager: ProductsManagementService,
    public categoriesManager: CategoriesManagementService
  ) { }

  ngOnInit() {
    this.listProducts();
    this.listCategories();

    const userString = localStorage.getItem('user');
    this.user = JSON.parse(userString);

  }

  listProducts() {
    this.products = [];
    this.productsManager.list().subscribe(
      product => {
        this.products.push(product);
      },
      error => {

      }
    );
  }

  showProductDetails(product) {
    this.modalState = 'read';
    this.productModel = product;
    $('#productModal').modal('show');
  }

  listCategories() {
    this.categories = [];
    this.categoriesManager.list()
      .then(data => {
        // tslint:disable-next-line:forin
        for (const key in data) {
          data[key].key = key;
          this.categories.push(data[key]);
        }
      })
      .catch(err => {
        alert(err.message);
      });
  }

  showAddModal() {
    this.modalState = 'add';
  }

  addProduct() {
    this.errMessage = '';
    this.isLoading = true;
    this.productsManager.store(this.productModel)
      .then(status => {
        this.isLoading = false;
        this.errMessage = 'Successful!';
        this.listProducts();
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        this.errMessage = err.message;
      });
    // this.productModel = {
    //   name: '',
    //   desc: '',
    //   quantity: 0,
    //   costPrice: 0,
    //   sellingPrice: 0,
    //   category: '',
    //   dateAdded: ''
    // };
  }

  manageProduct() {
    if (this.modalState === 'add') {
      this.addProduct();
    }

    if (this.modalState === 'edit') {
      this.editProduct();
    }
  }

  showEditModal(product) {
    this.modalState = 'edit';
    this.productModel = product;
  }

  editProduct() {
    this.productsManager.update(this.productModel)
      .then(status => {
        this.isLoading = false;
        this.errMessage = 'Successful!';
        this.listProducts();
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        this.errMessage = err.message;
      });
    this.productModel = {
      name: '',
      desc: '',
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
      category: '',
      dateAdded: ''
    };
  }

  deleteProduct(product) {
    this.productsManager.delete(product)
      .then(status => {
        this.isLoading = false;
        this.errMessage = 'Successful!';
        this.listProducts();
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        this.errMessage = err.message;
      });
  }

}
