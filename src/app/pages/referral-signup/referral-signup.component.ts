import { Component, OnInit } from '@angular/core';
import { HttpHandler, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-referral-signup',
  templateUrl: './referral-signup.component.html',
  styleUrls: ['./referral-signup.component.scss']
})
export class ReferralSignupComponent implements OnInit {
  userModel = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contact: '',
    password: '',
    refCode: '',
    confirmPassword: '',
    agreed: false
  };

  status = {
    state: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  signup() {
    this.status = {
      state: 'loading',
      message: ''
    };

    this.http
      .post(`${environment.url}/api/referrals/account`, this.userModel, {
        responseType: 'text'
      })
      .subscribe(
        res => {
          console.log(res);
          this.status = {
            state: 'success',
            message: res
          };
          this.userModel = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            contact: '',
            password: '',
            confirmPassword: '',
            refCode: '',
            agreed: false
          };
        },
        err => {
          console.log(err);
          this.status = {
            state: 'error',
            message: err.error
          };
        }
      );
  }
}
