import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ReturnsComponent } from './pages/returns/returns.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthenticationService } from './services/authentication.service';
import { CategoriesManagementService } from './services/categories-management.service';
import { ProductsManagementService } from './services/products-management.service';
import { ReturnsManagementService } from './services/returns-management.service';
import { SalesManagementService } from './services/sales-management.service';
import { AuthGuard } from './guards/auth.guard';

import * as firebase from 'firebase';
import { LoadingComponent } from './components/loading/loading.component';

const config = {
  apiKey: 'AIzaSyDWjZBpKhkE0Tu1XdZbOn7vF_tUqcaA2vE',
  authDomain: 'smart-market-70906.firebaseapp.com',
  databaseURL: 'https://smart-market-70906.firebaseio.com',
  projectId: 'smart-market-70906',
  storageBucket: 'smart-market-70906.appspot.com',
  messagingSenderId: '249654525391'
};
firebase.initializeApp(config);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetComponent,
    DashboardComponent,
    ProductsComponent,
    SalesComponent,
    ReturnsComponent,
    CategoriesComponent,
    ManageUsersComponent,
    ProfileComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    CategoriesComponent,
    ProductsManagementService,
    ReturnsManagementService,
    SalesManagementService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
