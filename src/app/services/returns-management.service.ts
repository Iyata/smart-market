import { Injectable } from '@angular/core';

@Injectable()
export class ReturnsManagementService {

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
      firebase.database().ref('returnedItems').once('value')
        .then((snapshot) => {
          resolve(snapshot.val());
        })
        .catch(error => reject(error));
    });
  }

  public store(returnedItem): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('products/' + returnedItem.productId).transaction(product => {
        if (product) {
          product.quantity -= returnedItem.quantity;
          return firebase.database().ref('returnedItems/' + returnedItem.transactionId).set({
            transactionId: returnedItem.transactionId,
            name: returnedItem.productName,
            quantity: returnedItem.quantity,
            dateReturned: returnedItem.dateReturned
          });
        } else {
          resolve(false);
        }
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  // public update(returnedItem): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     firebase.database().ref('returnedItems' + returnedItem.id).set({
  //       name: returnedItem.productName,
  //           quantity: returnedItem.quantity,
  //           dateReturned: returnedItem.dateReturned
  //     })
  //       .then(() => resolve(true))
  //       .catch(error => reject(error));
  //   });
  // }

}
