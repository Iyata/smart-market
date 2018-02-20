import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  isLoading = false;
  user: any = {};

  constructor(public authentication: AuthenticationService, private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('#dataTable').DataTable();
      $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
        // tslint:disable-next-line:max-line-length
        template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
      });
      // Toggle the side navigation
      $('#sidenavToggler').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('sidenav-toggled');
        $('.navbar-sidenav .nav-link-collapse').addClass('collapsed');
        $('.navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level').removeClass('show');
      });
      // Force the toggled class to be removed when a collapsible nav link is clicked
      $('.navbar-sidenav .nav-link-collapse').click(function (e) {
        e.preventDefault();
        $('body').removeClass('sidenav-toggled');
      });
      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      // tslint:disable-next-line:max-line-length
      $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function (e) {
        const e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      });
      // Scroll to top button appear
      $(document).scroll(function () {
        const scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });
      // Configure tooltips globally
      $('[data-toggle="tooltip"]').tooltip();
      // Smooth scrolling using jQuery easing
      $(document).on('click', 'a.scroll-to-top', function (event) {
        const $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
      });
    });

    this.authentication.getProfile()
      .then(res => {
        this.user = res;
      })
      .catch(err => {
        alert(err.message);
      });
  }

  logout() {
    this.isLoading = true;
    this.authentication.signOut()
      .then(() => {
        this.router.navigateByUrl('/');
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false;
      });
  }

}
