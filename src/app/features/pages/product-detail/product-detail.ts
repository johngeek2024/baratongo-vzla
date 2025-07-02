import { Component, OnInit, OnDestroy } from '@angular/core'; // 1. Importar OnDestroy
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart';
import { SeoService } from '../../../core/services/seo'; // 2. Importar SeoService

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetail implements OnInit, OnDestroy { // 3. Implementar OnDestroy
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private titleService: Title,
    private metaService: Meta,
    private seoService: SeoService // 4. Inyectar SeoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(productData => {
        this.product = productData;

        if (this.product) {
          const pageTitle = `BaratongoVzla | ${this.product.name}`;
          this.titleService.setTitle(pageTitle);
          this.metaService.updateTag({ name: 'description', content: this.product.description });

          // 5. Crear el schema del producto
          this.seoService.createProductSchema(this.product);
        }
      });
    }
  }

  // 6. ngOnDestroy se ejecuta cuando el usuario abandona la página
  ngOnDestroy(): void {
    // Limpiamos los datos estructurados para no dejarlos en otras páginas
    this.seoService.removeSchema();
  }

  onAddToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}
