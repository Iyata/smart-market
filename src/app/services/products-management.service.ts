import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

// import {Observable} from 'rxjs/observable';

@Injectable()
export class ProductsManagementService {

  constructor() { }


  public list(): Observable<any> {
    return new Observable(observer => {
      // Get all products from DB
      firebase.database().ref('products').once('value')
        .then(snapshot => {
          // Loop through products and extract category ID
          snapshot.forEach((childSnapshot) => {
            const productKey = childSnapshot.key;
            const product = childSnapshot.val();
            // Get Category Id
            const categoryId = product.category;
            // Get category details
            firebase.database().ref('categories/' + categoryId).once('value')
              .then(categories => {
                // Set category name
                product.category = categories.val().name;
                product.key = productKey;
                // Emit product
                observer.next(product);
              })
              .catch(err => {
                observer.error(err);
                observer.complete();
              });
          });
        })
        .catch(err => {
          observer.error(err);
          observer.complete();
        });
    });
  }
  
  public countSales(): Promise<boolean> {
    firebase.database().ref('products').once('value')
    .then(snapshot => {
      let itemCount = snapshot.val().length;
      resolve(itemCount);
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
