import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class ProductsManagementService {

  constructor() { }


  public list(): Promise<any> {
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
      const userString: any = localStorage.getItem('user');
      const user = JSON.parse(userString);
      if (user.role !== 'admin' && user.role !== 'team') {
        return reject({
          code: 403,
          message: 'You do not have permission to perform this action'
        });
      }

      product.uid = user.uid;
      product.dateCreated = (new Date).getTime();
      product.dataModified = (new Date).getTime();

      firebase.database().ref('products').push(product, (err) => {
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
      const userString: any = localStorage.getItem('user');
      const user = JSON.parse(userString);
      if (user.role !== 'admin' && user.role !== 'team') {
        return reject({
          code: 403,
          message: 'You do not have permission to perform this action'
        });
      }

      firebase.database().ref('products/' + product.key).set({
        name: product.name || '',
        description: product.desc || '',
        quantity: product.quantity || 0,
        costPrice: product.costPrice || 0,
        sellingPrice: product.sellingPrice || 0,
        category: product.category || '',
        dateAdded: product.dateAdded || '',
        uid: user.uid,
        dataModified: (new Date).getTime()
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  public delete(product): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userString: any = localStorage.getItem('user');
      const user = JSON.parse(userString);
      if (user.role !== 'admin' && user.role !== 'team') {
        return reject({
          code: 403,
          message: 'You do not have permission to perform this action'
        });
      }

      firebase.database().ref('products/' + product.key).remove()
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

}
