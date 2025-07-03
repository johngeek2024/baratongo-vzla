import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private cartTotalSubject = new BehaviorSubject<number>(0);

  public cartItems$ = this.cartItemsSubject.asObservable();
  public cartItemCount$ = this.cartItemCountSubject.asObservable();
  public cartTotal$ = this.cartTotalSubject.asObservable();

  constructor() { }

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ product: product, quantity: 1 });
    }
    this.notifyChanges(currentItems);
  }

  removeFromCart(productId: string): void {
    let currentItems = this.cartItemsSubject.getValue();
    currentItems = currentItems.filter(item => item.product.id !== productId);
    this.notifyChanges(currentItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.notifyChanges(currentItems);
      }
    }
  }

  private notifyChanges(items: CartItem[]): void {
    this.cartItemsSubject.next([...items]);
    this.cartItemCountSubject.next(items.reduce((acc, item) => acc + item.quantity, 0));
    this.calculateTotal(items);
  }

  private calculateTotal(items: CartItem[]): void {
    const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    this.cartTotalSubject.next(total);
  }
}
