import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ReturnsComponent } from './pages/returns/returns.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'account',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'categories',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CategoriesComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'manage-users',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ManageUsersComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        component: ProductsComponent,
        pathMatch: 'full'
      },
      {
        path: 'sales',
        component: SalesComponent,
        pathMatch: 'full'
      },
      {
        path: 'returns',
        component: ReturnsComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LandingComponent
  },
  {
    path: '**',
    component: LandingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
