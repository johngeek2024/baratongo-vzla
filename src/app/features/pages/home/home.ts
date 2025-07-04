import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { Title, Meta } from '@angular/platform-browser';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { SkeletonCard } from '../../../shared/components/skeleton-card/skeleton-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCard, SkeletonCard],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Home implements OnInit {
  featuredProducts: Product[] = [];
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('BaratongoVzla - Buenos precios y mejor calidad');
    this.metaService.updateTag({
      name: 'description',
      content: 'Tu tienda de electrónica y accesorios gamer en Valencia. Encuentra los mejores precios en proyectores, smartwatch, audífonos y más.'
    });

    this.productService.products$.subscribe(products => {
      this.featuredProducts = products;
      this.isLoading = false;
    });
  }
}
