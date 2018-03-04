import { Component, OnInit } from '@angular/core';
import { ProductsManagementService } from '../../services/products-management.service';
import { ReturnsManagementService } from '../../services/returns-management.service';

declare var $: any;

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss'],
})
export class ReturnsComponent implements OnInit {
  products = [];

  returns = [];

  itemSearched: string;

  returnsData = [];

  modalState = '';

  filteredReturns = [];

  returnModel = {
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
    public returnsManager: ReturnsManagementService,
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

    this.listReturns();

    const userString = localStorage.getItem('user');
    this.user = JSON.parse(userString);
  }

  filterItems(value) {
    if (!value) {
      this.refreshReturns(); // when nothing has typed
    }

    this.filteredReturns = Object.assign([], this.returns).filter(
      item => item.dateSold.indexOf(value) > -1,
    );
  }

  refreshReturns() {
    this.filteredReturns = Object.assign([], this.returns);
  }

  manageReturns() {
    if (this.modalState === 'add') {
      this.makeReturn();
    }

    if (this.modalState === 'edit') {
      this.editReturn();
    }
  }

  showEditModal(returnedItem) {
    this.modalState = 'edit';
    this.returnsData = [];
    this.returnsData.push(returnedItem);
  }

  showAddModal() {
    this.modalState = 'add';
    this.returnsData = [];
    this.returnsData.push({
      productName: '',
      productId: '',
      quantity: 0,
      buyerName: '',
      buyerPhone: '',
      sellingPrice: '',
      dateSold: '',
    });
  }

  listReturns() {
    this.returns = [];
    this.returnsManager
      .list()
      .then(returns => {
        // tslint:disable-next-line:forin
        for (const transactionKey in returns) {
          // tslint:disable-next-line:forin
          for (const returnKey in returns[transactionKey]) {
            returns[transactionKey][returnKey].transactionKey = transactionKey;
            returns[transactionKey][returnKey].returnKey = returnKey;
            this.returns.push(returns[transactionKey][returnKey]);
          }
        }
        this.refreshReturns();
      })
      .catch(err => {
        alert(err.message);
      });
  }

  addMore() {
    const productId = $(
      'option[value="' +
        this.returnsData[this.returnsData.length - 1].productName +
        '"]',
    ).attr('id');
    this.returnsData[this.returnsData.length - 1].productId = productId;
    this.returnsData.push({
      productName: '',
      productId: '',
      quantity: 0,
      buyerName: '',
      buyerPhone: '',
      sellingPrice: '',
      dateSold: '',
    });
  }

  removeItem(i) {
    this.returnsData.splice(i, 1);
  }

  editReturn() {
    const productId = $(
      'option[value="' + this.returnsData[0].productName + '"]',
    ).attr('id');
    this.returnsData[0].productId = productId;
    this.returnsManager
      .update(this.returnsData[0])
      .then(status => {
        alert('Successful');
        this.listReturns();
      })
      .catch(err => {
        alert(err.message);
      });
  }

  makeReturn() {
    const productId = $(
      'option[value="' +
        this.returnsData[this.returnsData.length - 1].productName +
        '"]',
    ).attr('id');
    this.returnsData[this.returnsData.length - 1].productId = productId;
    console.log(this.returnsData);
    this.returnsManager
      .store(this.returnsData)
      .then(status => {
        alert('Successful');
        this.listReturns();
        this.returnsData = [];
      })
      .catch(err => {
        alert(err.message);
      });
  }
}
