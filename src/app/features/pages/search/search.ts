import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product';
import { ProductCard } from '../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class Search implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];

  activeCategory: string = 'Todos';
  searchTerm: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Nos suscribimos al observable products$
    this.productService.products$.subscribe(products => {
      this.allProducts = products;
      this.applyFilters(); // Re-aplicamos los filtros cada vez que la lista de productos cambia
    });
    this.categories = this.productService.getCategories();
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    this.applyFilters();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  applyFilters(): void {
    let products = this.activeCategory === 'Todos'
      ? this.allProducts
      : this.allProducts.filter(p => p.category === this.activeCategory);

    if (this.searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProducts = products;
  }
}
