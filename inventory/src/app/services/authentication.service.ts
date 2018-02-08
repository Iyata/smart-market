import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import * as firebase2 from 'firebase';

const config = {
  apiKey: 'AIzaSyDWjZBpKhkE0Tu1XdZbOn7vF_tUqcaA2vE',
  authDomain: 'smart-market-70906.firebaseapp.com',
  databaseURL: 'https://smart-market-70906.firebaseio.com',
  projectId: 'smart-market-70906',
  storageBucket: 'smart-market-70906.appspot.com',
  messagingSenderId: '249654525391'
};
firebase2.initializeApp(config);

@Injectable()
export class AuthenticationService {

  constructor() { }

  login(user: { email: string, password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          // Handle Errors here.
          reject(error);
          // ...
        });
    });
  }

  isLoggedIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          resolve(true);
          // ...
        } else {
          // User is signed out.
          resolve(false);
        }
      });
    });
  }

  getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      const userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value')
        .then((snapshot) => {
          const user = snapshot.val();
          resolve(user);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          reject(error);
          // ...
        });
    });
  }

  addUser(user): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase2.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          const userId = firebase.auth().currentUser.uid;
          firebase.database().ref('users/' + userId).set({
            fullName: user.fullName,
            email: user.email,
            role: user.role
          }).then(() => {
            firebase2.auth().signOut();
            resolve(true);
          })
            .catch((error) => {
              // Handle Errors here.
              reject(error);
              // ...
            });
        })
        .catch((error) => {
          // Handle Errors here.
          resolve(error);
          // ...
        });
    });
  }

  editUser(user): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('users/' + user.id).set({
        role: user.role
      }).then(() => {
        firebase2.auth().signOut();
        resolve(true);
      })
        .catch((error) => {
          // Handle Errors here.
          reject(error);
          // ...
        });
    });
  }

}
