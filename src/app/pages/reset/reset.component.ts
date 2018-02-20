import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetModel = {
    email: ''
  };

  resetMsg = '';

  isLoading = false;

  constructor(public authentication: AuthenticationService) { }

  ngOnInit() {
  }

  reset() {
    this.resetMsg = '';
    this.isLoading = true;
    this.authentication.resetPassword(this.resetModel.email)
      .then(status => {
        this.isLoading = false;
        if (status) {
          this.resetMsg = 'Check your email address to complete your password reset';
        }
      })
      .catch(err => {
        this.resetMsg = err.message;
        this.isLoading = false;
      });
  }

}
