import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product';
import { Modal } from '../../../shared/components/modal/modal';
import { AddProductForm } from '../components/add-product-form/add-product-form';
import { NotificationService } from '../../../core/services/notification'; // 1. Importar

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, Modal, AddProductForm],
  templateUrl: './manage-products.html',
  styleUrls: ['./manage-products.scss']
})
export class ManageProducts implements OnInit {
  products: Product[] = [];
  isModalOpen = false;
  productToEdit: Product | null = null;

  // 2. Inyectar NotificationService
  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.products = products;
    });
  }

  openModal(product?: Product): void {
    this.productToEdit = product || null;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.productToEdit = null;
  }

  onDelete(product: Product): void {
    const confirmation = confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`);
    if (confirmation) {
      // 3. El método de Firebase devuelve una Promesa, la manejamos con .then() y .catch()
      this.productService.deleteProduct(product.id)
        .then(() => {
          // Si la promesa se resuelve (éxito), muestra la notificación
          this.notificationService.showSuccess(`'${product.name}' fue eliminado.`, 'Eliminado');
        })
        .catch(error => {
          // Si la promesa se rechaza (error), muestra una notificación de error
          console.error("Error al eliminar el producto:", error);
          this.notificationService.showError('No se pudo eliminar el producto.', 'Error');
        });
    }
  }
}
