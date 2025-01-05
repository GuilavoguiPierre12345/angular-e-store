import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

@Component({
  selector: 'app-search-area',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="flex items-center gap-2">
      <input type="text" class="w-full bg-white border border-green-400 rounded-lg text-lg p-2 focus:outline-green-200" placeholder="Search product...">
      <app-primary-button draggable="false" label="Search" />
    </div>
  `,
  styles: ``
})
export class SearchAreaComponent {

}
