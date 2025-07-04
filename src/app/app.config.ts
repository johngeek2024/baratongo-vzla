import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router'; // Se incluye withHashLocation
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideToastr } from 'ngx-toastr';

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
    provideRouter(routes, withHashLocation()), // Se mantiene la estrategia de Hash
    provideAnimations(),
    provideClientHydration(),
    provideToastr(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
