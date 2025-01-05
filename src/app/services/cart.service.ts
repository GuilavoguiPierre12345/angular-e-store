import { computed, Injectable, signal } from '@angular/core';
import { ProductsModel } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<ProductsModel[]>([]);

  addToCart(newProduct : ProductsModel, quantity? : number) {
    const search = this.cart().find(product => product.id === newProduct.id);

    if (search) {
      if (quantity) { /** l'ajout s'effectue a partir de la page de details ou dans le panier meme */
        this.cart()[this.cart().indexOf(search)].qty += quantity;
      } else { /** l'ajout s'effectue a partir de la liste des produits */
        this.cart()[this.cart().indexOf(search)].qty++;
      }
    }else {
      if (quantity) {
        newProduct.qty = quantity;
      } else {
        newProduct.qty = 1;
      }
      this.cart.set([...this.cart(), newProduct]);
    }
    
  }

  removeFromCart(id : number) {
    this.cart.set(this.cart().filter(p => p.id !== id));
  }

  total =  computed( () => {
      let total = 0;
      let sousTotal = 0
      this.cart().forEach(item => {
        sousTotal = item.qty * item.price;        
        total += sousTotal;
      });
      return total;
  })

  constructor() { }
}
