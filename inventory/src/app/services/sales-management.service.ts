import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class SalesManagementService {

  constructor() { }

  private randomString(length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }

  public list(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('sales').once('value')
        .then((snapshot) => {
          resolve(snapshot.val());
        })
        .catch(error => reject(error));
    });
  }

  public store(sale): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('products/' + sale.productId).transaction(product => {
        if (product) {
          product.quantity -= sale.quantity;
          return firebase.database().ref('sales/' + this.randomString(6)).set({
            productId: sale.productId,
            name: sale.productName,
            quantity: sale.quantity,
            sellingPrice: sale.sellingPrice,
            buyersName: sale.buyersName,
            dateSold: product.dateAdded,
            dataModified: (new Date).getTime()
          });
        } else {
          resolve(false);
        }
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  // public update(sale): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     firebase.database().ref('/sales/' + sale.id).set({
  //       name: sale.name,
  //       quantity: sale.quantity,
  //       sellingPrice: sale.sellingPrice,
  //       buyersName: sale.buyersName
  //     })
  //       .then(() => resolve(true))
  //       .catch(error => reject(error));
  //   });
  // }

}
