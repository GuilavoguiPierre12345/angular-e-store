import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { CartItemComponent } from "./cart-item/cart-item.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-cart",
  imports: [CartItemComponent, OrderSummaryComponent, NgxSpinnerModule],
  changeDetection : ChangeDetectionStrategy.OnPush,
  template: `
    
      <div class="p-6 flex flex-col gap-4 border-2 m-2">
        <h2 class="text-2xl bg-slate-100 p-4 font-bold text-green-500">Shopping Cart</h2>
        @for (item of cartService.cart(); track item.id) {
            @defer{
              <app-cart-item [product]="item" ></app-cart-item>
            }@loading(after 100ms; minimum 1s) {
              <img src="favicon.ico" alt="loading...">
            }@placeholder {
              <p>Placeholder content</p>
            }
        } @empty {
          <p class="text-center text-xl font-bold">Cart is empty</p>
        }
        @if (cartService.cart().length) {
          <app-order-summary></app-order-summary>
        }
      </div>
      <ngx-spinner [type]="spinnerType"><span>Loading...</span></ngx-spinner>

  `,
  styles: ``
})
export class CartComponent {
  
  cartService = inject(CartService);
  spinnerType = "square-jelly-box";

  constructor(private spinner: NgxSpinnerService){}

  ngOnInit() {
    this.spinner.show(undefined, {
      type : this.spinnerType,
      bdColor: 'rgba(0,0,0,0.8)',
      color: 'green',
      size: 'default',
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

}
