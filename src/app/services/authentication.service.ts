import { Injectable } from '@angular/core';

import * as firebase from 'firebase';


@Injectable()
export class AuthenticationService {

  constructor() { }

  public login(user: { email: string, password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  public isLoggedIn(): Promise<boolean> {
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

  public getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      const userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value')
        .then((snapshot) => {
          const user = snapshot.val();
          resolve(user);
          // ...
        })
        .catch(error => reject(error));
    });
  }

  public editProfile(user): Promise<any> {
    return new Promise((resolve, reject) => {
      const userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userId).set({
        fullName: user.fullName
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  public changePassword(newPassword): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.updatePassword(newPassword)
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }

  public resetPassword(email): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }

  // public addUser(user): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     firebase2.auth().createUserWithEmailAndPassword(user.email, user.password)
  //       .then(() => {
  //         const userId = firebase.auth().currentUser.uid;
  //         return firebase.database().ref('users/' + userId).set({
  //           fullName: user.fullName,
  //           email: user.email,
  //           role: user.role
  //         });
  //       })
  //       .then(() => {
  //         firebase2.auth().signOut();
  //         resolve(true);
  //       })
  //       .catch(error => reject(error));
  //   });
  // }

  public listUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/users').once('value')
        .then((snapshot) => {
          const users = snapshot.val();
          resolve(users);
        })
        .catch(error => reject(error));
    });
  }

  public editRole(user): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('users/' + user.id).set({
        role: user.role
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  // public deleteUser(user): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().currentUser.delete()
  //       .then(() => {
  //         return firebase.database().ref('users/' + user.id).remove();
  //       })
  //       .then(() => resolve(true))
  //       .catch(error => reject(error));
  //   });
  // }

  public signOut(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

}
