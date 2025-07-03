import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideToastr } from 'ngx-toastr'; // 1. Importar

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANN-Y59qKZNCc-M0J7icKmP6gkYnNEzjU",
  authDomain: "baratongo-vzla-tienda.firebaseapp.com",
  projectId: "baratongo-vzla-tienda",
  storageBucket: "baratongo-vzla-tienda.firebasestorage.app",
  messagingSenderId: "62611906509",
  appId: "1:62611906509:web:1563b6bada81a5bdbcae84"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideToastr(), // 2. Añadir el proveedor de Toastr
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
