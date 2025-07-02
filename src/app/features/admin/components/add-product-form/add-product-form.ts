import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product';
import { Product } from '../../../../core/models/product.model'; // <-- IMPORTACIÓN AÑADIDA

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-form.html',
  styleUrls: ['./add-product-form.scss']
})
export class AddProductForm implements OnInit {
  @Input() productToEdit: Product | null = null;
  @Output() productAdded = new EventEmitter<void>();
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['https://placehold.co/400x400', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.productToEdit) {
      this.productForm.patchValue(this.productToEdit);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) { return; }

    if (this.productToEdit) {
      const updatedProduct = { ...this.productToEdit, ...this.productForm.value };
      this.productService.updateProduct(updatedProduct);
    } else {
      this.productService.addProduct(this.productForm.value);
    }

    this.productAdded.emit();
  }
}
