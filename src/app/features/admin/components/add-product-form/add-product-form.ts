import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product';
import { Product } from '../../../../core/models/product.model';
import { NotificationService } from '../../../../core/services/notification';

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

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [''] // CORREGIDO: Se elimina Validators.required
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
    }
  }

  async onSubmit(): Promise<void> {
    // Verificación adicional para el caso de un nuevo producto sin imagen
    if (this.productForm.invalid || (!this.productToEdit && !this.selectedFile)) {
      this.notificationService.showError('Por favor, completa todos los campos y selecciona una imagen.', 'Formulario Incompleto');
      return;
    }

    this.isUploading = true;
    let imageUrl = this.productToEdit ? this.productToEdit.imageUrl : '';

    if (this.selectedFile) {
      imageUrl = await this.productService.uploadImage(this.selectedFile);
    }

    this.productForm.patchValue({ imageUrl: imageUrl });

    try {
      if (this.productToEdit) {
        const updatedProduct = { ...this.productToEdit, ...this.productForm.value };
        await this.productService.updateProduct(updatedProduct);
        this.notificationService.showSuccess('Producto actualizado correctamente', '¡Guardado!');
      } else {
        await this.productService.addProduct(this.productForm.value);
        this.notificationService.showSuccess('Producto creado exitosamente', '¡Guardado!');
      }
      this.formSubmitted.emit();
    } catch (error) {
      this.notificationService.showError('Ocurrió un error al guardar.', 'Error');
    } finally {
      this.isUploading = false;
    }
  }
}
