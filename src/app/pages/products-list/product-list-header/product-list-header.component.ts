import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list-header',
  imports: [FormsModule],
  template: `
    <section class="flex flex-wrap gap-4 justify-between bg-slate-200 p-4 rounded shadow-lg">
      <h2 class="text-xl font-semibold text-green-500"> {{ currentCategory() }} </h2>
      <div class="flex items-center gap-4">
        <span class="font-semibold text-md">SORT BY : </span>
        <select [(ngModel)]="sortTarget"  name="" id="" class="p-3 bg-white rounded focus:outline-none">

          <option value="default">Default</option>
          <option value="asc">Price (Low to High)</option>
          <option value="desc">Price (High to Low)</option>
        </select>
      </div>
    </section>
  `,
  styles: ``
})
export class ProductListHeaderComponent {

  currentCategory = input('', {transform: transformString});
  sortTarget = model<string>("default")

}

function transformString(value : string):string {
  return `${value?.charAt(0).toLocaleUpperCase()}${value?.slice(1)}`;
}