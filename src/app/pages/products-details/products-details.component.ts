import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductsModel } from '../../models/products.model';
import { ButtonComponent } from "../../components/button/button.component";
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { SelectQuantityComponent } from "../../components/select-quantity/select-quantity.component";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-products-details',
  imports: [PrimaryButtonComponent, SelectQuantityComponent, NgxSpinnerModule],
  changeDetection : ChangeDetectionStrategy.OnPush,
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  template: `
   <div class="p-6 border flex">
      <div class="flex justify-center">
        <img [src]="product()?.image" alt="Product" class="w-1/2 h-scrren object-contain">
      </div>
      <div class="bg-slate-200 flex flex-col p-4">
        <span class="text-lg "> Title : {{product()?.title }} </span>
        <span class="text-lg "> Category : {{product()?.category }} </span>
        <span class="text-lg "> Price : <i class="text-sm font-semibold">GNF{{product()?.price }}</i> </span>
        @if (product()?.stock) {
          <span class="text-md "> Stock : {{product()?.stock}} </span>
        }@else {
          <span class="text-md"> Stock : <span class="text-sm text-red-500">Out of the box</span> </span>
        }
        <app-select-quantity (emmitQty)="getQuantitySelected($event)"  ></app-select-quantity>
        <span class="text-lg text-gray-500 font-semibold">Description : </span>
        <span class="text-md text-gray-500"> {{product()?.description}} </span>
        <app-primary-button class="mt-2" label="Add to cart" (btnClicked)="cartService.addToCart(product()!, productQtySelected()!)" ></app-primary-button>
      </div>
      <ngx-spinner [type]="spinnerType"><span>Loading...</span></ngx-spinner>
   </div>
  `,
  styles: ``
})
export class ProductsDetailsComponent {
  product = signal<ProductsModel | undefined>(undefined);
  cartService = inject(CartService);
  productQtySelected = signal<number |undefined>(undefined);
  spinnerType = "square-jelly-box";
   constructor(private route : ActivatedRoute, private spinner: NgxSpinnerService) {}

   ngOnInit() {
    this.spinner.show(undefined, {
      type : this.spinnerType,
      bdColor: 'rgba(0,0,0,0.8)',
      color: 'green',
      size: 'default',
    });

    this.getSingleProduct(Number(this.route.snapshot.paramMap.get('id')));

    this.spinner.hide();
   }

   async getSingleProduct(productId : number) {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await res.json();
    this.product.set(data);
   }

   getQuantitySelected(quantity : number) {
    this.productQtySelected.set(quantity);
   }
}
