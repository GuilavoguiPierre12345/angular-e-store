import { Component, inject, input } from '@angular/core';
import { ProductsModel } from '../../../models/products.model';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { NgClass } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../../../components/button/button.component";


@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, RouterLink, ButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-lg p-6 flex flex-col gap-6 relative">
      <div class="mx-auto">
        <img [src]="product().image" class="w-[200px] h-[100px] object-contain" alt="">
        <div class="flex flex-col mt-2">
          <span class="text-md fond-bold"> {{product().title}} </span>
          <span class="text-sm"> {{ 'GNF ' + product().price}} </span>
        </div>
        <app-primary-button label="Add to Card" (btnClicked)="cartService.addToCart(product())" class="mt-3"></app-primary-button>
      </div>
      
      <span class="absolute top-2 right-3 text-sm font-bold" [class]="product().stock ? 'text-green-500' : 'text-red-500'">
        @if (product().stock) {
          {{product().stock}} left
        } @else {
          Out of stock
        }
      </span>

      <app-button [routerLink]="['/product-details',product().id]" class="absolute bg-green-200 top-2 left-3 text-sm font-bold" label="details"></app-button>
      </div>
  `,
  styles: ``
})
export class ProductCardComponent {
  product = input.required<ProductsModel>()
  cartService = inject(CartService);
  
}
