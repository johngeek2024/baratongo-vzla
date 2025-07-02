import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { Title, Meta } from '@angular/platform-browser';
// Se eliminan las importaciones de @angular/animations

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
  // Se elimina la propiedad 'animations: [...]'
})
export class Home implements OnInit {
  featuredProducts: Product[] = [];

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
    });
  }
}
