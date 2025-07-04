import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { Title, Meta } from '@angular/platform-browser';
import { SkeletonCard } from '../../../shared/components/skeleton-card/skeleton-card';
import { OfferBanner } from '../../../shared/components/offer-banner/offer-banner';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { TrustSection } from '../../../shared/components/trust-section/trust-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductCard,
    SkeletonCard,
    OfferBanner,
    ReviewsSection,
    TrustSection
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  allProducts: Product[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('BaratongoVzla - La Tecnología que Quieres');
    this.metaService.updateTag({
      name: 'description',
      content: 'La mejor tienda de electrónica y accesorios gamer en Valencia, Venezuela. Encuentra proyectores, smartwatch y más con los mejores precios y calidad.'
    });

    this.productService.products$.subscribe(products => {
      this.allProducts = products;
      this.isLoading = false;
    });
  }
}
