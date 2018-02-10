import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class ProductsManagementService {

  constructor() { }


  public list(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('products').once('value')
        .then((snapshot) => {
          resolve(snapshot.val());
        })
        .catch(error => reject(error));
    });
  }

  public store(product): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('products').push({
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        costPrice: product.costPrice,
        sellingPrice: product.sellingPrice,
        category: product.category,
        dateAdded: product.dateAdded,
        dataModified: (new Date).getTime()
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public update(product): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('products/' + product.id).set({
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        costPrice: product.costPrice,
        sellingPrice: product.sellingPrice,
        category: product.category,
        dateAdded: product.dateAdded,
        dataModified: (new Date).getTime()
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  public delete(product): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('products/' + product.id).remove()
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

}
