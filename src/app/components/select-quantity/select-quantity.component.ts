import { Component, output, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

@Component({
  selector: 'app-select-quantity',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="p-4 flex items-center gap-4 mx-auto">
      <span class="text-lg font-semibold text-gray-500">Quantity : </span>
      <app-primary-button [class]="quantity() === 1 ? 'hidden' : ''" (btnClicked)="decrementQty()" label="-"></app-primary-button>
      <span class="p-2 rounded-lg text-center bg-white w-20">{{quantity()}}</span>
      <app-primary-button (btnClicked)="incrementQty()" label="+"></app-primary-button>
    </div>
  `,
  styles: ``
})
export class SelectQuantityComponent {
  quantity = signal<number>(1);
  emmitQty = output<number>();

  ngOnInit() {
    this.emmitQty.emit(this.quantity());
  }
  incrementQty() {
    this.quantity.update(old => ++old);
    this.emmitQty.emit(this.quantity());
  }

  decrementQty() {
    this.quantity.update(old => --old);
    this.emmitQty.emit(this.quantity());
  }
}
