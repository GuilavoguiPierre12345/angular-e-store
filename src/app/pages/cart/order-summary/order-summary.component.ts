import { Component, computed, inject, linkedSignal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-100 p-6 rounded-lg shadow-lg border">
      <h2 class="text-xl text-green-500 font-semibold">Order Summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4 mt-2">
          <span class="text-lg">Total :</span>
          <span> {{ cartService.total() }} GNF </span>
        </div>
        
        <app-primary-button label="Proceed to checkout"></app-primary-button>
      </div>
    </div>
  `,
  styles: ``
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  // total= linkedSignal( () => {
  //   let total = 0;
  //   this.cartService.cart().forEach(item => {
  //     total += item.price;
  //   });
  //   return total;
  // })

}
