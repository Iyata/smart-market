import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class CategoriesManagementService {

  constructor() { }

  public list(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('categories').once('value')
        .then((snapshot) => {
          resolve(snapshot.val());
        })
        .catch(error => reject(error));
    });
  }

  public store(category): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('categories').push({
        name: category.name,
        dateModified: (new Date()).getTime(),
        dateCreated: (new Date()).getTime()
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
      firebase.database().ref('categories/' + category.key).update({
        name: category.name,
        dateModified: (new Date()).getTime()
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  public delete(category): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('categories/' + category.key).remove()
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

}
