import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { Title, Meta } from '@angular/platform-browser';
import { OfferBanner } from '../../../shared/components/offer-banner/offer-banner';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { TrustSection } from '../../../shared/components/trust-section/trust-section';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductCard,
    OfferBanner,
    ReviewsSection,
    TrustSection
  ],
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
  public products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.products$ = this.productService.products$;
  }

  ngOnInit(): void {
    this.titleService.setTitle('BaratongoVzla - La Tecnología que Quieres');
    this.metaService.updateTag({
      name: 'description',
      content: 'La mejor tienda de electrónica y accesorios gamer en Valencia, Venezuela.'
    });
  }
}
