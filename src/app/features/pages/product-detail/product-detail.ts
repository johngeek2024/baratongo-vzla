import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart';
import { SeoService } from '../../../core/services/seo';
import { NotificationService } from '../../../core/services/notification';
import { Observable, Subscription, map, take } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductCard } from '../../../shared/components/product-card/product-card';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCard],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetail implements OnInit, OnDestroy {
  product$!: Observable<Product | undefined>;
  relatedProducts$!: Observable<Product[]>;
  private product: Product | null = null;
  private routeSub!: Subscription;

  @ViewChild('relatedGrid') relatedGrid!: ElementRef<HTMLDivElement>;

  activeImageUrl: string = '';
  activeTab: 'description' | 'specs' | 'reviews' = 'description';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private titleService: Title,
    private metaService: Meta,
    private seoService: SeoService,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProduct(id);
        window.scrollTo(0, 0);
      }
    });
  }

  loadProduct(id: string): void {
    this.product$ = this.productService.getProductById(id).pipe(
      tap(productData => {
        if (productData) {
          this.product = productData;
          this.activeImageUrl = productData.gallery && productData.gallery.length > 0
            ? productData.gallery[0]
            : productData.imageUrl;
          this.setupSeo(productData);
          this.loadRelatedProducts(id, productData.category);
          this.cd.detectChanges();
        }
      })
    );
  }

  loadRelatedProducts(currentProductId: string, category: string): void {
    this.relatedProducts$ = this.productService.products$.pipe(
      take(1),
      map(products => products.filter(p => p.id !== currentProductId && p.category === category).slice(0, 4))
    );
  }

  setupSeo(product: Product): void {
    const pageTitle = `BaratongoVzla | ${product.name}`;
    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: product.description });
    this.seoService.createProductSchema(product);
  }

  ngOnDestroy(): void {
    this.seoService.removeSchema();
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  selectImage(imageUrl: string): void {
    this.activeImageUrl = imageUrl;
  }

  changeTab(tab: 'description' | 'specs' | 'reviews'): void {
    this.activeTab = tab;
  }

  changeQuantity(amount: number): void {
    const newQuantity = this.quantity + amount;
    if (newQuantity >= 1) {
        this.quantity = newQuantity;
    }
  }

  onAddToCart(): void {
    if (this.product) {
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(this.product);
      }
      this.notificationService.showSuccess(`'${this.product.name}' (x${this.quantity}) añadido al carrito`, '¡Éxito!');
    }
  }

  getReviewsCountByRating(rating: number): number {
    if (!this.product || !this.product.reviews) {
      return 0;
    }
    return this.product.reviews.filter(r => r.rating === rating).length;
  }

  scrollRelated(direction: 'prev' | 'next'): void {
    if (!this.relatedGrid) return;
    const grid = this.relatedGrid.nativeElement;
    const card = grid.querySelector('app-product-card');
    if (!card) return;

    const cardWidth = card.clientWidth;
    const gap = parseInt(window.getComputedStyle(grid).gap);
    const scrollAmount = direction === 'next' ? cardWidth + gap : -(cardWidth + gap);

    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}
