import { Component, inject, input } from '@angular/core';
import { ProductsModel } from '../../../models/products.model';
import { ButtonComponent } from "../../../components/button/button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [ButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-lg p-6 flex items-center gap-4 relative">
        <img [src]="product().image" class="w-[80px] h-[80px] object-fill" alt="">
        <div class="flex flex-col mt-2">
          <span class="text-md fond-bold"> {{product().title}} </span>
          <span class="text-sm"> {{ 'GNF ' + product().price}} </span>
        </div>
        <div class="flex-1"></div>
        <app-button label="Remove" (btnClicked)="cartService.removeFromCart(product().id)" class="mt-3"></app-button>
        <span class="absolute right-2 top-2 text-sm p-4 bg-slate-200 text-green-500 font-semibold outline outline-1 outline-green-500 rounded-full w-10 h-10 block flex items-center"> {{ product().qty }} </span>
    </div>
  `,
  styles: ``
})

export class CartItemComponent {
  cartService = inject(CartService);
  product = input.required<ProductsModel>();
}
