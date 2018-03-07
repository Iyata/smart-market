import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AuthenticationService {
  constructor() {}

  public login(user: { email: string; password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          this.isLoggedIn();
          resolve(true);
        })
        .catch(error => reject(error));
    });
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.getProfile();
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
      firebase
        .database()
        .ref('users/' + userId)
        .once('value')
        .then(snapshot => {
          const user = snapshot.val();
          resolve(user);
          localStorage.setItem('user', JSON.stringify(user));
          // ...
        })
        .catch(error => reject(error));
    });
  }

  public editProfile(user): Promise<any> {
    return new Promise((resolve, reject) => {
      const userId = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref('users/' + userId)
        .update({
          fullName: user.fullName,
          dateModified: new Date().getTime()
        })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  public changePassword(oldPassword, newPassword): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      this.login({ email: user.email, password: oldPassword })
        .then(res => {
          return firebase.auth().currentUser.updatePassword(newPassword);
        })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  public resetPassword(email): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  public listUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('/users')
        .once('value')
        .then(snapshot => {
          const users = snapshot.val();
          resolve(users);
        })
        .catch(error => reject(error));
    });
  }

  public editRole(userId, role): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users/' + userId)
        .update({
          role: role,
          dateModified: new Date().getTime()
        })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  public signOut(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }
}
