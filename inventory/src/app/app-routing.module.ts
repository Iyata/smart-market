import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ReturnsComponent } from './pages/returns/returns.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ProfileComponent } from './pages/profile/profile.component';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'account',
    component: DashboardComponent,
    canActivate: [],
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
    canActivate: [],
    children: [
      {
        path: '',
        component: CategoriesComponent
      }
    ]
  },
  {
    path: 'manage-users',
    component: DashboardComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: ManageUsersComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [],
    children: [
      {
        path: 'products',
        component: ProductsComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
