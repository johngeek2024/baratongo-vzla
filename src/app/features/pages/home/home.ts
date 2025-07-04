import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { Title, Meta } from '@angular/platform-browser';
import { SkeletonCard } from '../../../shared/components/skeleton-card/skeleton-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCard, SkeletonCard],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  // Dejaremos que el servicio nos dé la lista completa
  allProducts: Product[] = [];

  // Propiedades para el carrusel
  currentSlide = 0;

  isLoading = true;

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('BaratongoVzla - Buenos precios y mejor calidad');
    this.metaService.updateTag({
      name: 'description',
      content: 'Tu tienda de electrónica y accesorios gamer en Valencia.'
    });

    this.productService.products$.subscribe(products => {
      this.allProducts = products;
      this.isLoading = false;
    });
  }

  // Lógica simplificada y corregida para el carrusel
  nextSlide(): void {
    const maxSlides = this.allProducts.length - 1;
    if (this.currentSlide < maxSlides) {
      this.currentSlide++;
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
}
