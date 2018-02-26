import { Component, OnInit } from '@angular/core';

declare let $: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  contactUsModel = {
    fullName: '',
    email: '',
    phone: '',
    msg: ''
  };

  isLoading = false;

  constructor() { }

  ngOnInit() {
    this.initializeUIElements();
  }

  initializeUIElements() {
    // ------------------------------------------------------- //
    // Testimonials Slider
    // ------------------------------------------------------ //
    $('.testimonials-slider').owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: true,
      smartSpeed: 700,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: false,
          dots: true
        },
        600: {
          items: 1,
          nav: true
        },
        1000: {
          items: 2,
          nav: true,
          loop: false
        }
      }
    });


    // ------------------------------------------------------- //
    // Scroll Top Button
    // ------------------------------------------------------- //
    $('#scrollTop').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    // ---------------------------------------------------------- //
    // Preventing URL update on navigation link click
    // ---------------------------------------------------------- //
    $('.link-scroll').on('click', function (e) {
      let anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 1000);
      e.preventDefault();
    });


    // ---------------------------------------------------------- //
    // Scroll Spy
    // ---------------------------------------------------------- //
    $('body').scrollspy({
      target: '#navbarSupportedContent',
      offset: 80
    });

    // ------------------------------------------------------- //
    // Navbar Toggler Button
    // ------------------------------------------------------- //
    $('.navbar .navbar-toggler').on('click', function () {
      $(this).toggleClass('active');
    });
  }

}
