import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { ProductsModel } from '../../models/products.model';
import { ProductCardComponent } from "./product-card/product-card.component";
import { SearchAreaComponent } from "../../components/search-area/search-area.component";
import { CategoryCardComponent } from "../../components/category-card/category-card.component";
import { ProductListHeaderComponent } from "./product-list-header/product-list-header.component";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-products-list",
  imports: [
    ProductCardComponent,
    SearchAreaComponent,
    CategoryCardComponent,
    ProductListHeaderComponent,
    NgxSpinnerModule,
  ],
 
  template: `
    <ngx-spinner [type]="spinnerType">
    <span class="text-lg text-green-500"> loading...</span>
    </ngx-spinner>
    <div class="lg:flex lg:flex-wrap gap-4">
      <aside class="p-6 shadow-lg flex flex-col gap-4">
        <app-search-area></app-search-area>
        <app-category-card (selectedCategory)="getProducts($event)" ></app-category-card>
      </aside>
      <div class="flex-1 flex flex-col gap-4 p-8 h-[90vh] overflow-y-scroll">
        <app-product-list-header (sortTargetChange)="sortProducts($event)" [currentCategory]="category()" ></app-product-list-header>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
          }
        </div>
      </div>

    </div>
    
  `,
  styles: ``
})

export class ProductsListComponent implements OnInit {
  products = signal<ProductsModel[]>([]);
  baseUrl = signal<string>("https://fakestoreapi.com/products");
  category = signal<string>("All categories");
  // sortTarget = signal<string>("default");
  copyOfProduct = signal([...this.products()]);
  spinner : NgxSpinnerService = inject(NgxSpinnerService);
  spinnerType = "square-jelly-box";
  constructor() {}
  sortProducts(sortTarget: string) {
    if (sortTarget === "desc") {
      this.products.set(
        this.products().sort((prev, next) => next.price - prev.price)
      );
    }

    if (sortTarget === "asc") {
      this.products.set(
        this.products().sort((prev, next) => prev.price - next.price)
      );
    }

    if (sortTarget === "default") {
      this.getProducts();
    }
  }

  async getProducts(category?: string) {
    
    try {
      this.spinner.show(undefined, {
        type : this.spinnerType,
        bdColor: 'rgba(0,0,0,0.8)',
        color: 'green',
        size: 'default',
      });

      if (category && category !== "All categories") {
        this.baseUrl.set(
          `https://fakestoreapi.com/products/category/${category}`
        );
      } else {
        // this.category.set("All categories");
        this.baseUrl.set("https://fakestoreapi.com/products");
      }

      const res = await fetch(this.baseUrl());
      const data = await res.json();
      this.products.set(data);
    } catch (error) {
      console.error("Error fetching", error);
      this.spinner.hide();
    } finally {
      category ? this.category.set(category) : "";
      this.spinner.hide();
    } 
  }

  ngOnInit() {
    this.getProducts();
  }
}
