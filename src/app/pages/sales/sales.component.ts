import { Component, OnInit } from '@angular/core';
import { SalesManagementService } from '../../services/sales-management.service';
import { ProductsManagementService } from '../../services/products-management.service';

declare var $: any;
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  products = [];

  sales = [];

  salesData = [];

  constructor(
    public productsManager: ProductsManagementService,
    public salesManager: SalesManagementService
  ) { }

  ngOnInit() {
    this.products = [];
    this.productsManager.list()
      .then(data => {
        // tslint:disable-next-line:forin
        for (const key in data) {
          data[key].key = key;
          console.log(data[key]);
          this.products.push(data[key]);
        }
      })
      .catch(err => {
        alert(err.message);
      });

    this.salesData.push({
      productName: '',
      productId: '',
      quantity: 0,
      buyerName: '',
      buyerPhone: '',
      price: '',
      dateSold: ''
    });

    this.listSales();
  }

  listSales() {
    this.salesManager.list()
      .then(sales => {
        // tslint:disable-next-line:forin
        for (const transactionKey in sales) {
          // tslint:disable-next-line:forin
          for (const saleKey in sales[transactionKey]) {
            sales[transactionKey][saleKey].transactionKey = transactionKey;
            sales[transactionKey][saleKey].saleKey = saleKey;
            this.sales.push(sales[transactionKey][saleKey]);
          }
        }
      })
      .catch(err => {
        alert(err.message);
      });
  }

  addMore() {
    const productId = $('option[value="' + this.salesData[this.salesData.length - 1].productName + '"]').attr('id');
    this.salesData[this.salesData.length - 1].productId = productId;
    this.salesData.push({
      productName: '',
      productId: '',
      quantity: 0,
      buyerName: '',
      buyerPhone: '',
      price: '',
      dateSold: ''
    });
  }

  removeItem(i) {
    this.salesData.splice(i, 1);
  }

  makeSale() {
    const productId = $('option[value="' + this.salesData[this.salesData.length - 1].productName + '"]').attr('id');
    this.salesData[this.salesData.length - 1].productId = productId;
    console.log(this.salesData);
    this.salesManager.store(this.salesData)
      .then(status => {
        alert('Successful');
        this.listSales();
        this.salesData = [];
      })
      .catch(err => {
        alert(err.message);
      });
  }

}
