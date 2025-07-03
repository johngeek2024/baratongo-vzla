import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-form.html',
  styleUrls: ['./add-product-form.scss']
})
export class AddProductForm implements OnInit {
  @Input() productToEdit: Product | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  productForm: FormGroup;
  selectedFile: File | null = null;
  isUploading = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.productToEdit) {
      this.productForm.patchValue(this.productToEdit);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Opcional: mostrar una previsualización de la imagen
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) { return; }

    this.isUploading = true;
    let imageUrl = this.productToEdit ? this.productToEdit.imageUrl : '';

    // Si se seleccionó un nuevo archivo, súbelo
    if (this.selectedFile) {
      imageUrl = await this.productService.uploadImage(this.selectedFile);
    }

    this.productForm.patchValue({ imageUrl: imageUrl });

    if (this.productToEdit) {
      const updatedProduct = { ...this.productToEdit, ...this.productForm.value };
      await this.productService.updateProduct(updatedProduct);
    } else {
      await this.productService.addProduct(this.productForm.value);
    }

    this.isUploading = false;
    this.formSubmitted.emit();
  }
}
