import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart'; // O .../cart
import { Product } from '../../../core/models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart implements OnInit {
  cartItems: Product[] = [];
  cartTotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Suscripción a la lista de items
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    // Suscripción al total del carrito
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }
}
