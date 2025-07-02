import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
// ...
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  // 1. Añade el subject para el total
  private cartTotalSubject = new BehaviorSubject<number>(0);

  public cartItems$ = this.cartItemsSubject.asObservable();
  public cartItemCount$ = this.cartItemCountSubject.asObservable();
  // 2. Expón el total como un observable
  public cartTotal$ = this.cartTotalSubject.asObservable();

  constructor() { }

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartItemsSubject.next([...this.cartItems]);
    this.cartItemCountSubject.next(this.cartItems.length);

    // 3. Calcula y emite el nuevo total
    this.calculateTotal();
  }

  // 4. Crea un método para calcular el total
  private calculateTotal(): void {
    const total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
    this.cartTotalSubject.next(total);
  }
}
