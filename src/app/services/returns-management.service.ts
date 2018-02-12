import { Injectable } from '@angular/core';

@Injectable()
export class ReturnsManagementService {

  private i = 0;
  private returnsArray = [];

  constructor() { }

  public list(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('returns').once('value')
        .then((snapshot) => {
          resolve(snapshot.val());
        })
        .catch(error => reject(error));
    });
  }

  public store(returns): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userString: any = localStorage.getItem('user');
      const user = JSON.parse(userString);
      if (user.role !== 'admin' && user.role !== 'team') {
        return reject({
          code: 403,
          message: 'You do not have permission to perform this action'
        });
      }

      this.returnsArray = returns;
      this.i = 0;

      this.recursiveReturns(returns[this.i], returns.transactionKey)
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

  private recursiveReturns(returns, transactionKey): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const productRef = firebase.database().ref('products/' + returns.productId);

      productRef.once('value')
        .then(snapshot => {
          return productRef.update({
            quantity: snapshot.val().quantity + returns.quantity
          });
        })
        .then(() => {
          return firebase.database().ref('returns/' + transactionKey).push({
            productId: returns.productId,
            productName: returns.productName,
            quantity: returns.quantity,
            dateReturned: returns.dateReturned,
            dateCreated: (new Date).getTime(),
            dateModified: (new Date).getTime()
          });
        })
        .then(() => {
          this.i++;
          if (this.i < this.returnsArray.length) {
            this.recursiveReturns(this.returnsArray[this.i], transactionKey);
          } else {
            resolve(true);
          }
        })
        .catch(error => reject(error));
    });
  }

  public update(returns): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userString: any = localStorage.getItem('user');
      const user = JSON.parse(userString);
      if (user.role !== 'admin' && user.role !== 'team') {
        return reject({
          code: 403,
          message: 'You do not have permission to perform this action'
        });
      }

      console.log(returns);

      firebase.database().ref('returns/' + returns.transactionKey + '/' + returns.returnsKey).update({
        productId: returns.productId,
        productName: returns.productName,
        quantity: returns.quantity,
        dateReturned: returns.dateReturned,
        dateModified: (new Date).getTime()
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

}
