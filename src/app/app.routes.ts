import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';

export const routes: Routes = [
    {
        path : '',
        pathMatch : 'full',
        title : 'ANGULAR E-STORE | Home',
        component : ProductsListComponent
    },
    {
        path : 'cart',
        title : 'ANGULAR E-STORE | Cart',
        loadComponent : () => import('./pages/cart/cart.component').then(c => c.CartComponent)
    },
    {
        path : 'product-details/:id',
        title : 'ANGULAR E-STORE | Product Details',
        loadComponent : () => import('./pages/products-details/products-details.component').then(c => c.ProductsDetailsComponent)
    }
];
