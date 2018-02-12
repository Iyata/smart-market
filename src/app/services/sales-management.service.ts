import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class SalesManagementService {

  private i = 0;
  private salesArray = [];
  private transactionId = this.randomString(6);

  constructor() { }

  private randomString(length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }

  public list(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('sales').once('value')
        .then((snapshot) => {
          resolve(snapshot.val());
        })
        .catch(error => reject(error));
    });
  }

  public store(sales): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userString: any = localStorage.getItem('user');
      const user = JSON.parse(userString);
      if (user.role !== 'admin' && user.role !== 'team') {
        return reject({
          code: 403,
          message: 'You do not have permission to perform this action'
        });
      }

      this.salesArray = sales;
      this.transactionId = this.randomString(6);
      this.i = 0;

      this.recursiveSale(sales[this.i], this.transactionId)
        .then(res => {
          if (res) {
            resolve(true);
          } else {
            reject({
              code: 500,
              message: 'Transaction failed'
            });
          }
        })
        .catch(err => reject(err));
    });
  }

  private recursiveSale(sale, transactionId): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const productRef = firebase.database().ref('products/' + sale.productId);

      productRef.once('value')
        .then(snapshot => {
          return productRef.update({
            quantity: snapshot.val().quantity - sale.quantity
          });
        })
        .then(() => {
          return firebase.database().ref('sales/' + transactionId).push({
            productId: sale.productId,
            productName: sale.productName,
            quantity: sale.quantity,
            sellingPrice: sale.sellingPrice,
            buyerName: sale.buyerName,
            buyerPhone: sale.buyerPhone,
            dateSold: sale.dateSold,
            dateCreated: (new Date).getTime(),
            dateModified: (new Date).getTime()
          });
        })
        .then(() => {
          this.i++;
          if (this.i < this.salesArray.length) {
            this.recursiveSale(this.salesArray[this.i], this.transactionId);
          } else {
            resolve(true);
          }
        })
        .catch(error => reject(error));
    });
  }

  public update(sale): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userString: any = localStorage.getItem('user');
      const user = JSON.parse(userString);
      if (user.role !== 'admin' && user.role !== 'team') {
        return reject({
          code: 403,
          message: 'You do not have permission to perform this action'
        });
      }

      console.log(sale);

      firebase.database().ref('sales/' + sale.transactionKey + '/' + sale.saleKey).update({
        productId: sale.productId,
        productName: sale.productName,
        quantity: sale.quantity,
        sellingPrice: sale.sellingPrice,
        buyerName: sale.buyerName,
        buyerPhone: sale.buyerPhone,
        dateSold: sale.dateSold,
        dateModified: (new Date).getTime()
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

}
