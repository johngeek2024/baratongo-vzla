import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart';
import { SeoService } from '../../../core/services/seo';
import { NotificationService } from '../../../core/services/notification';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetail implements OnInit, OnDestroy {
  product$!: Observable<Product>;
  private product: Product | null = null;

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
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product$ = this.productService.getProductById(id).pipe(
        tap(productData => {
          if (productData) {
            this.product = productData;
            this.activeImageUrl = productData.gallery ? productData.gallery[0] : productData.imageUrl;
            this.setupSeo(productData);
          }
        })
      );
    }
  }

  setupSeo(product: Product): void {
    const pageTitle = `BaratongoVzla | ${product.name}`;
    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: product.description });
    this.seoService.createProductSchema(product);
  }

  ngOnDestroy(): void {
    this.seoService.removeSchema();
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
      const productToAdd = { ...this.product, quantity: this.quantity };
      this.cartService.addToCart(productToAdd);
      this.notificationService.showSuccess(`'${this.product.name}' (x${this.quantity}) añadido al carrito`, '¡Éxito!');
    }
  }
}
