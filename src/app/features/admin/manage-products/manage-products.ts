// Archivo: src/app/features/admin/manage-products/manage-products.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product';
import { Modal } from '../../../shared/components/modal/modal';
import { AddProductForm } from '../components/add-product-form/add-product-form';

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

  constructor(private productService: ProductService) {}

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
      // El product.id ahora es un string, que es lo que el servicio espera
      this.productService.deleteProduct(product.id);
    }
  }
}
