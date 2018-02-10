import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public authentication: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    const url = window.location.href;
    if (url.indexOf('/login') >= 0) {
      this.authentication.isLoggedIn()
        .then((status) => {
          if (status) {
            this.router.navigateByUrl('/dashboard/products');
          }
        });
    }
  }

  ngOnInit() {

  }
}
