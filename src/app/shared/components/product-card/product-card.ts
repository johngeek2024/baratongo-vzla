import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
})
export class ProductCard {
  @Input() product: Product | null = null;

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  addToCart(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.product) {
      this.cartService.addToCart(this.product);
      this.notificationService.showSuccess(`'${this.product.name}' fue añadido al carrito`, '¡Éxito!');
    }
  }
}
