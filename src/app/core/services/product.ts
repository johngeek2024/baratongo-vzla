import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);
  private productsCollection = collection(this.firestore, 'products');

  public products$: Observable<Product[]> = collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;

  constructor() { }

  // MÉTODO RESTAURADO
  getProductById(id: string): Observable<Product> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return docData(productDoc, { idField: 'id' }) as Observable<Product>;
  }

  // MÉTODO RESTAURADO (versión simple por ahora)
  getCategories(): string[] {
    // A futuro, esto debería leer las categorías desde la base de datos
    return ['Smartwatches', 'Audio', 'Proyectores', 'Gatillos'];
  }

  async uploadImage(file: File): Promise<string> {
    const filePath = `product-images/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  }

  addProduct(productData: Omit<Product, 'id'>): Promise<any> {
    return addDoc(this.productsCollection, productData);
  }

  updateProduct(product: Product): Promise<void> {
    const productDoc = doc(this.firestore, `products/${product.id}`);
    const { id, ...dataToUpdate } = product;
    return updateDoc(productDoc, dataToUpdate);
  }

  deleteProduct(id: string): Promise<void> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDoc);
  }
}
