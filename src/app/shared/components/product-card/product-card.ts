import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
})
export class ProductCard {
  @Input() imageUrl: string = '';
  @Input() productName: string = '';
  @Input() price: number = 0;
  @Input() productId: string = ''; // CAMBIADO de number a string
}
