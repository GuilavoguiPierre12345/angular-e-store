import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <!-- <app-products-list></app-products-list> -->
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-store';
}
