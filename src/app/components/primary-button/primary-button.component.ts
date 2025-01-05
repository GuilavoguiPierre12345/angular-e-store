import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
    <button (click)="btnClicked.emit()" class="bg-green-500 text-white font-bold w-full px-5 py-2 rounded-md shadow-md hover:opacity-90" >
      {{ label() }}
    </button>
  `,
  styles: ``
})
export class PrimaryButtonComponent {
  label = input('');
  btnClicked = output();

  
}
