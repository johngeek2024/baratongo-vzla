import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private scriptElement: HTMLScriptElement | undefined;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  // Crea el script JSON-LD para un producto
  createProductSchema(product: Product): void {
    this.removeSchema(); // Limpia cualquier schema anterior

    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': product.name,
      'image': product.imageUrl,
      'description': product.description,
      'sku': product.id, // Usamos el ID como SKU
      'offers': {
        '@type': 'Offer',
        'url': `${this.document.location.origin}/#/producto/${product.id}`,
        'priceCurrency': 'USD',
        'price': product.price,
        'availability': 'https://schema.org/InStock', // Asumimos que hay stock
        'priceValidUntil': new Date().toISOString().split('T')[0] // Válido por hoy
      }
    };

    this.scriptElement = this.document.createElement('script');
    this.scriptElement.type = 'application/ld+json';
    this.scriptElement.textContent = JSON.stringify(schema);
    this.document.head.appendChild(this.scriptElement);
  }

  // Elimina el script para evitar duplicados al navegar entre páginas
  removeSchema(): void {
    if (this.scriptElement) {
      this.document.head.removeChild(this.scriptElement);
      this.scriptElement = undefined;
    }
  }
}
