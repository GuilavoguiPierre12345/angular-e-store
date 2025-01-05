import { Component, computed, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div class="bg-slate-100 shadow-md px-3 py-4 flex justify-between items-center">
      <a [routerLink]="['/']" ><span class="text-xl border-2 rounded border-green-500 font-semibold text-green-700 p-2">Angular E-Store</span></a>
      <app-primary-button [routerLink]="['/cart']" [label]="card()+ '(' + cartLength()+ ')'"></app-primary-button>
    </div>
  `,
  styles: ``
})
export class HeaderComponent {
  card = signal('Card ')
  cartService = inject(CartService);
  cartLength = computed( () => this.cartService.cart().length);
  
}
