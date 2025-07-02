import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

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
    provideRouter(routes), // SIN 'withHashLocation()'
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
