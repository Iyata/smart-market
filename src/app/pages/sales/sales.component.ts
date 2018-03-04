import { Component, OnInit } from '@angular/core';
import { SalesManagementService } from '../../services/sales-management.service';
import { ProductsManagementService } from '../../services/products-management.service';

declare var $: any;
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  products = [];

  sales = [];

  itemSearched: string;

  filteredSales = [];

  salesData = [];

  modalState = '';

  saleModel = {
    productId: '',
    productName: '',
    quantity: 0,
    buyerName: '',
    buyerPhone: '',
    sellingPrice: 0,
    dateSold: '',
  };

  user: any = {};

  constructor(
    public productsManager: ProductsManagementService,
    public salesManager: SalesManagementService,
  ) {}

  ngOnInit() {
    this.products = [];
    this.productsManager.list().subscribe(
      product => {
        // tslint:disable-next-line:forin
        this.products.push(product);
      },
      err => {
        alert(err.message);
      },
    );

    this.listSales();

    const userString = localStorage.getItem('user');
    this.user = JSON.parse(userString);
  }

  filterItems(value) {
    if (!value) {
      this.refreshSales(); // when nothing has typed
    }

    this.filteredSales = Object.assign([], this.sales).filter(
      item => item.dateSold.indexOf(value) > -1,
    );
  }

  refreshSales() {
    this.filteredSales = Object.assign([], this.sales);
  }

  manageSale() {
    if (this.modalState === 'add') {
      this.makeSale();
    }

    if (this.modalState === 'edit') {
      this.editSale();
    }
  }

  showEditModal(sale) {
    this.modalState = 'edit';
    this.salesData = [];
    this.salesData.push(sale);
  }

  showAddModal() {
    this.modalState = 'add';
    this.salesData = [];
    this.salesData.push({
      productName: '',
      productId: '',
      quantity: 0,
      buyerName: '',
      buyerPhone: '',
      sellingPrice: '',
      dateSold: '',
    });
    this.getSellingPrice('0');
  }

  listSales() {
    this.sales = [];
    this.salesManager
      .list()
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
        this.refreshSales();
      })
      .catch(err => {
        alert(err.message);
      });
  }

  addMore() {
    const productId = $(
      'option[value="' +
        this.salesData[this.salesData.length - 1].productName +
        '"]',
    ).attr('id');
    this.salesData[this.salesData.length - 1].productId = productId;
    this.salesData.push({
      productName: '',
      productId: '',
      quantity: 0,
      buyerName: '',
      buyerPhone: '',
      sellingPrice: '',
      dateSold: '',
    });
    this.getSellingPrice((this.salesData.length - 1).toString());
  }

  getSellingPrice(i: string) {
    setTimeout(() => {
      console.log('#productName' + i);
      $('#productName' + i).on('input', () => {
        console.log(this.salesData[i].productName);
        const opt = $('option[value="' + this.salesData[i].productName + '"]');
        if (opt.length) {
          const newProducts = this.products.filter(product => {
            return product.key === opt.attr('id');
          });
          this.salesData[i].sellingPrice = newProducts[0].sellingPrice;
        }
      });
    }, 1000);
  }

  removeItem(i) {
    this.salesData.splice(i, 1);
  }

  editSale() {
    const productId = $(
      'option[value="' + this.salesData[0].productName + '"]',
    ).attr('id');
    this.salesData[0].productId = productId;
    this.salesManager
      .update(this.salesData[0])
      .then(status => {
        alert('Successful');
        this.listSales();
      })
      .catch(err => {
        alert(err.message);
      });
  }

  makeSale() {
    const productId = $(
      'option[value="' +
        this.salesData[this.salesData.length - 1].productName +
        '"]',
    ).attr('id');
    this.salesData[this.salesData.length - 1].productId = productId;
    console.log(this.salesData);
    this.salesManager
      .store(this.salesData)
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
