import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

// ¡Nuevas importaciones de Firestore!
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // 1. Inyectamos Firestore para poder usarlo
  private firestore: Firestore = inject(Firestore);

  // 2. Referencia a nuestra colección de productos en la base de datos
  private productsCollection = collection(this.firestore, 'products');

  // 3. El observable ahora lee los datos directamente de la colección
  public products$: Observable<Product[]> = collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;

  constructor() { }

  // Los métodos ahora interactúan con Firestore
  getCategories(): string[] {
    // Esta lógica deberá ser más avanzada a futuro, por ahora la dejamos así
    return ['Smartwatches', 'Audio', 'Proyectores'];
  }

  getProductById(id: string): Observable<Product> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return docData(productDoc, { idField: 'id' }) as Observable<Product>;
  }

  addProduct(productData: Omit<Product, 'id'>): Promise<any> {
    return addDoc(this.productsCollection, productData);
  }

  updateProduct(product: Product): Promise<void> {
    const productDoc = doc(this.firestore, `products/${product.id}`);
    // 'id' no se puede actualizar, así que lo separamos
    const { id, ...dataToUpdate } = product;
    return updateDoc(productDoc, dataToUpdate);
  }

  deleteProduct(id: string): Promise<void> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDoc);
  }
}
