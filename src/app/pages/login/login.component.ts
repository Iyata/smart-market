import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginModel = {
    email: '',
    password: '',
  };

  loginError = '';

  isLoading = false;

  constructor(
    public authentication: AuthenticationService,
    private router: Router,
  ) {
    this.authentication.isLoggedIn().then(status => {
      if (status) {
        router.navigateByUrl('/admin/dashboard/products');
      }
    });
  }

  ngOnInit() {}

  login() {
    this.loginError = '';
    this.isLoading = true;
    this.authentication
      .login(this.loginModel)
      .then(status => {
        this.isLoading = false;
        if (status) {
          this.router.navigateByUrl('/admin/dashboard/products');
        }
      })
      .catch(err => {
        this.loginError = err.message;
        this.isLoading = false;
      });
  }
}
