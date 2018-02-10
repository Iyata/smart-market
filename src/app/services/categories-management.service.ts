import { Injectable } from '@angular/core';

@Injectable()
export class CategoriesManagementService {

  constructor() { }

  public list(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/products').once('value')
        .then((snapshot) => {
          resolve(snapshot.val());
        })
        .catch(error => reject(error));
    });
  }

  public store(category): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('categories').push({
        name: category.name
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public update(category): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('categories/').push({
        name: category.name
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public delete(product): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/products' + product.id).remove()
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

}
