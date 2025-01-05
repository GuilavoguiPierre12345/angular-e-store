import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button (click)="btnClicked.emit()" class="text-black font-bold w-full px-5 py-2  shadow-md hover:bg-slate-200" >
      {{ label() }}
    </button>
  `,
  styles: ``
})
export class ButtonComponent {
    label = input('');
    btnClicked = output();
}
