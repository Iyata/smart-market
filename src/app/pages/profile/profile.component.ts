import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile = {
    fullName: '',
    email: ''
  };

  passwords = {
    password: '',
    newPassword: '',
    confirmPassword: ''
  };

  isLoading1 = false;
  isLoading2 = false;
  message1 = '';
  message2 = '';

  constructor(
    public authentication: AuthenticationService
  ) { }

  ngOnInit() {
    const profileString = localStorage.getItem('user');
    const profile = JSON.parse(profileString);
    this.profile = profile;
  }

  updateData() {
    this.isLoading1 = true;
    this.message1 = '';
    this.authentication.editProfile(this.profile)
      .then(res => {
        this.isLoading1 = false;
        this.message1 = 'Successful!';
      })
      .catch(err => {
        this.isLoading1 = false;
        this.message1 = err.message;
      });
  }

  updatePassword() {
    this.isLoading2 = true;
    this.message2 = '';
    this.authentication.changePassword(this.passwords.password, this.passwords.newPassword)
      .then(res => {
        this.isLoading2 = false;
        this.message2 = 'Successful!';
      })
      .catch(err => {
        this.isLoading2 = false;
        this.message2 = err.message;
      });
  }

}
