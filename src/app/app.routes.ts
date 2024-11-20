import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { 
        path:'', 
        redirectTo:'/login', 
        pathMatch:'full'
    },
    { 
        path:'login', 
        component:LoginPageComponent,
        canActivate:[authGuard]
    },
    {
        path:'signup',
        component:SignupPageComponent,
        canActivate:[authGuard]
    },
    { 
        path:'dashboard', 
        component:DashboardComponent
    },
    {
        path:'customers',
        component:CustomersComponent
    },
    {
        path:'products',
        component:ProductsComponent
    },
    {
        path:'orders',
        component:OrdersComponent
    },
    {
        path:'**',
        component:NotFoundComponent
    }
];
