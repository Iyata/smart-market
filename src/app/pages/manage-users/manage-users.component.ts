import { Component, OnInit } from '@angular/core';
import { HttpHandler, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  userModel = {
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    idToken: ''
  };

  editUserModel = {
    uid: '',
    fullName: '',
    email: '',
    role: ''
  };

  users = [];

  status = {
    state: '',
    id: 0,
    message: ''
  };

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        this.userModel.idToken = idToken;
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.listUsers();
  }

  setUser(user) {
    this.editUserModel = user;
  }

  createUser() {
    if (this.userModel.idToken === '') {
      return (this.status = {
        state: 'error',
        id: 0,
        message: 'Network error, Kindly refresh the page'
      });
    }
    this.status = {
      state: 'loading',
      id: 0,
      message: ''
    };

    const headers = new HttpHeaders();
    headers.set('Authorization', `Firebase ${this.userModel.idToken}`);
    this.http
      .post(`${environment.url}/api/users`, this.userModel, {
        headers: new HttpHeaders({
          Authorization: `Firebase ${this.userModel.idToken}`
        }),
        responseType: 'text'
      })
      .subscribe(
        res => {
          console.log(res);
          this.status = {
            state: 'success',
            id: 0,
            message: res
          };
          this.listUsers();
          this.userModel = {
            fullName: '',
            email: '',
            role: '',
            password: '',
            confirmPassword: '',
            idToken: ''
          };
        },
        err => {
          console.log(err);
          this.status = {
            state: 'error',
            id: 0,
            message: err.error
          };
        }
      );

    this.userModel = {
      fullName: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
      idToken: ''
    };
  }

  listUsers() {
    this.users = [];
    this.authenticationService
      .listUsers()
      .then(users => {
        // tslint:disable-next-line:forin
        for (const user in users) {
          this.users.push(users[user]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeRole() {
    this.status = {
      state: 'loading',
      id: 1,
      message: ''
    };

    this.authenticationService
      .editRole(this.editUserModel.uid, this.editUserModel.role)
      .then(res => {
        this.status = {
          state: 'success',
          id: 1,
          message: 'Successful!'
        };
      })
      .catch(err => {
        console.log(err);
        this.status = {
          state: 'error',
          id: 1,
          message: err.error
        };
      });
  }

  deleteUser(user, i) {
    if (this.userModel.idToken === '') {
      return (this.status = {
        state: 'error',
        id: i,
        message: 'Network error, Kindly refresh the page'
      });
    }
    this.status = {
      state: 'loading',
      id: i,
      message: ''
    };

    this.http
      .delete(`${environment.url}/api/users/${user.uid}`, {
        headers: new HttpHeaders({
          Authorization: `Firebase ${this.userModel.idToken}`
        }),
        responseType: 'text'
      })
      .subscribe(
        res => {
          console.log(res);
          this.status = {
            state: 'success',
            id: i,
            message: res
          };
          this.listUsers();
        },
        err => {
          console.log(err);
          console.log(err.error);
          this.status = {
            state: 'error',
            id: i,
            message: err.error
          };
        }
      );
  }
}
