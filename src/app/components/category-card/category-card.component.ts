import { Component, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [],
  template: `
    <section class="">
      <h2 class="text-lg font-semibold p-2 bg-green-400 rounded">Categories</h2>
      <div class="flex flex-col gap-2 my-2 bg-slate-100">
        @for (category of categories(); track category ) {
          <span (click)="selectedCategoryFn(category)" class="text-lg p-2 cursor-pointer font-semibold hover:bg-slate-300"> {{ category }} </span>
        }
      </div>
    </section>
  `,
  styles: ``
})
export class CategoryCardComponent implements OnInit {
  categories = signal<string[]>([])
  selectedCategory = output<string>();

  async ngOnInit() {
    try {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      const data = await res.json();
      this.categories.set(['All categories',...data]);
    } catch (error) {
      console.error('Error fetching', error)
    }
    
  }

  selectedCategoryFn(category : string) {
    this.selectedCategory.emit(category);
  }
}
